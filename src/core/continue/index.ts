import { Cryptographic, type SignKey } from '@sovereignbase/cryptosuite'
import { Bytes, fromString } from '@sovereignbase/bytecodec'
import {
  __read,
  __update,
  type CRListState,
} from '@sovereignbase/convergent-replicated-list'
import type {
  VerifiableContinuityState,
  VerifiableContinuityStateEntry,
} from '../../.types/index.js'
import { canonicalize } from 'json-canonicalize'

export async function __continue(
  currentSignKey: SignKey,
  verconReplica: VerifiableContinuityState
): Promise<SignKey | false> {
  if (!verconReplica.cursor) return false
  while (verconReplica.cursor.next) {
    verconReplica.cursor = verconReplica.cursor.next
  }
  const currentVerifyKey = verconReplica.cursor.value.claim.verifyKey

  const newKeypair = await Cryptographic.digitalSignature.generateKeypair()

  const newVerifyKeyBytes = Bytes.fromString(canonicalize(newKeypair.verifyKey))

  const keyId = await Cryptographic.identifier.derive(newVerifyKeyBytes)

  const claim: VerifiableContinuityStateEntry['claim'] = {
    keyId,
    verifyKey: newKeypair.verifyKey,
  }

  const claimBytes = Bytes.fromString(canonicalize(claim))

  const proofBytes = await Cryptographic.digitalSignature.sign(
    currentSignKey,
    claimBytes
  )

  const continues = await Cryptographic.digitalSignature.verify(
    currentVerifyKey,
    claimBytes,
    proofBytes
  )

  if (!continues) return false

  const proof = Bytes.toBase64UrlString(proofBytes)

  void __update(verconReplica.size, [{ claim, proof }], verconReplica, 'after')

  return newKeypair.signKey
}
