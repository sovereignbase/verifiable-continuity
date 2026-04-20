import type { SignKey, VerifyKey } from '@sovereignbase/cryptosuite'
import type {
  CRListSnapshot,
  CRListState,
} from '@sovereignbase/convergent-replicated-list'
import type {
  CRStructSnapshot,
  CRStructState,
} from '@sovereignbase/convergent-replicated-struct'

export type VerconAssertionMethod = {
  keypairIdentifier: Base64URLString
  signKey: SignKey
}

export type VerconVerificationMethod = {
  keypairIdentifier: Base64URLString
  verifyKey: VerifyKey
  since: number
}

export type VerconVerificationMethodEntry = {
  verificationMethod: VerconVerificationMethod
  proof: Base64URLString
}

export type VerconState = {
  assertionMethod: CRStructState<VerconAssertionMethod>
  verificationMethods: CRListState<VerconVerificationMethodEntry>
}

export type VerconSnapshot = {
  assertionMethod: CRStructSnapshot<VerconAssertionMethod>
  verificationMethods: CRListSnapshot<VerconVerificationMethodEntry>
}

export type VerconDelta = Partial<VerconSnapshot>

export type VerconDataToBeSigned = {
  kind: 'vcs'
  asserts: unknown
  assertedAt: number
  keypairIdentifier: VerconAssertionMethod['keypairIdentifier']
  verificationMethods: VerconSnapshot['verificationMethods']
}

export type VerconSignature = VerconDataToBeSigned & {
  proof: Base64URLString
}
