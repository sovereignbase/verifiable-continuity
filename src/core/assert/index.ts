import { Cryptographic, type SignKey } from '@sovereignbase/cryptosuite'
import type { VERCONDataToBeSinged, VERCONState } from '../../.types/index.js'
import { canonicalize } from 'json-canonicalize'
import { __snapshot } from '@sovereignbase/convergent-replicated-list'
import { Bytes } from '@sovereignbase/bytecodec'

export async function sign(
  claims: unknown,
  keyId: Base64URLString,
  signKey: SignKey,
  verconReplica: VERCONState
) {
  const continuity = __snapshot(verconReplica)
  const dataToBeSinged: VERCONDataToBeSinged = {
    kind: 'vct',
    asserts: claims,
    assertedAt: Math.floor(Date.now() / 100),
    verificationMethod: {
      keyId,
      continuity,
    },
  }
  const canonicalizedBytes = Bytes.fromString(canonicalize(dataToBeSinged))

  const signature = await Cryptographic.digitalSignature.sign(
    signKey,
    canonicalizedBytes
  )
}
