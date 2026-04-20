import type { VerifyKey } from '@sovereignbase/cryptosuite'
import type {
  CRListSnapshot,
  CRListState,
  CRListDelta,
} from '@sovereignbase/convergent-replicated-list'

export type ContinuityState = {
  keyId: Base64URLString
  verifyKey: VerifyKey
  since: number
}

export type VERCONStateEntry = {
  state: ContinuityState
  proof: Base64URLString
}

export type VERCONState = CRListState<VERCONStateEntry>

export type VERCONSnapshot = CRListSnapshot<VERCONStateEntry>

export type VERCONDelta = CRListDelta<VERCONStateEntry>

export type VERCONDataToBeSinged = {
  kind: 'vcs'
  asserts: unknown
  assertedAt: number
  verificationMethod: VERCONSnapshot
}

export type VERCONSignature = {
  kind: 'vcs'
  asserts: unknown
  assertedAt: number
  verificationMethod: VERCONSnapshot
  proof: Base64URLString
}
