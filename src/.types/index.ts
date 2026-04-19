import type { VerifyKey } from '@sovereignbase/cryptosuite'
import type {
  CRListSnapshot,
  CRListState,
  CRListDelta,
} from '@sovereignbase/convergent-replicated-list'

export type ContinuityClaim = {
  keyId: Base64URLString
  verifyKey: VerifyKey
  notBefore: number
}

export type VerifiableContinuityStateEntry = {
  claim: ContinuityClaim
  proof: Base64URLString
}

export type VerifiableContinuityState =
  CRListState<VerifiableContinuityStateEntry>

export type VerifiableContinuitySnapshot =
  CRListSnapshot<VerifiableContinuityStateEntry>

export type VerifiableContinuityDelta =
  CRListDelta<VerifiableContinuityStateEntry>
