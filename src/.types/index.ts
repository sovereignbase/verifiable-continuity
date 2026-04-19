import type { VerifyKey } from '@sovereignbase/cryptosuite'
import type {
  CRListSnapshot,
  CRListState,
} from '@sovereignbase/convergent-replicated-list'

export type ContinuityClaim = {
  keyId: Base64URLString
  verifyKey: VerifyKey
}

export type VerifiableContinuityStateEntry = {
  claim: ContinuityClaim
  proof: Base64URLString
}

export type VerifiableContinuityState =
  CRListState<VerifiableContinuityStateEntry>

export type VerifiableContinuitySnapshot =
  CRListSnapshot<VerifiableContinuityStateEntry>
