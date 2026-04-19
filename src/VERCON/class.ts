import { __create } from '@sovereignbase/convergent-replicated-list'
import type {
  VerifiableContinuityState,
  VerifiableContinuitySnapshot,
  VerifiableContinuityStateEntry,
} from '../.types/index.js'
import { __continue } from '../core/continue/index.js'
import { SignKey, VerifyKey } from '@sovereignbase/cryptosuite'

export class VERCON {
  declare private readonly state: VerifiableContinuityState
  constructor(snapshot?: VerifiableContinuitySnapshot) {
    Object.defineProperties(this, {
      state: {
        value: __create<VerifiableContinuityStateEntry>(snapshot),
        enumerable: false,
        configurable: false,
        writable: false,
      },
    })
  }
  merge() {}
  async verify(trustedVerifyKey: VerifyKey) {}
  async continue(currentSignKey: SignKey): Promise<SignKey | false> {
    return await __continue(currentSignKey, this.state)
  }
}
