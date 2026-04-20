import { Cryptographic, type SignKey } from '@sovereignbase/cryptosuite'
import { Bytes, fromString } from '@sovereignbase/bytecodec'
import {
  __read,
  __update,
  type CRListState,
} from '@sovereignbase/convergent-replicated-list'
import type { VerconState, VerconStateEntry } from '../../../.types/index.js'
import { canonicalize } from 'json-canonicalize'

export async function __continue(
  currentSignKey: SignKey,
  verconReplica: VerconState
): Promise<SignKey | false> {
  if (!verconReplica.cursor) return false
  while (verconReplica.cursor.next) {
    verconReplica.cursor = verconReplica.cursor.next
  }
  const currentVerifyKey = verconReplica.cursor.value.state.verifyKey

  const newKeypair = await Cryptographic.digitalSignature.generateKeypair()

  const newVerifyKeyBytes = Bytes.fromString(canonicalize(newKeypair.verifyKey))

  const keyId = await Cryptographic.identifier.derive(newVerifyKeyBytes)

  const state: VERCONStateEntry['state'] = {
    keyId,
    verifyKey: newKeypair.verifyKey,
    since: Math.floor(Date.now() / 1000),
  }

  const stateBytes = Bytes.fromString(canonicalize(state))

  const proofBytes = await Cryptographic.digitalSignature.sign(
    currentSignKey,
    stateBytes
  )

  const continues = await Cryptographic.digitalSignature.verify(
    currentVerifyKey,
    stateBytes,
    proofBytes
  )

  if (!continues) return false

  const proof = Bytes.toBase64UrlString(proofBytes)

  void __update(verconReplica.size, [{ state, proof }], verconReplica, 'after')

  return newKeypair.signKey
}
