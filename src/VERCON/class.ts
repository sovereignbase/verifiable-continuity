import {
  __create,
  __delete,
  __merge,
} from '@sovereignbase/convergent-replicated-list'
import type {
  VerifiableContinuityState,
  VerifiableContinuitySnapshot,
  VerifiableContinuityDelta,
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

  /**
   * Continues the protection of the current signing key in to the new signing key
   * @param currentSignKey
   * @returns
   */
  async continue(currentSignKey: SignKey): Promise<SignKey | false> {
    return await __continue(currentSignKey, this.state)
  }

  /**
   * Drops the specified amount verify keys and proofs from root.
   * !! CLAIMS SINGED WITH THE DROPPED KEYS BECOME UNVERIFIABLE AS WELL AS VERIFIERS WITH TRUSTING AN DROPPED KEY CANT VERIFY CONTINUITY!!
   * @param count
   */
  drop(count: number): void {
    if (typeof count !== 'number') return
    void __delete(this.state, 0, count)
  }

  merge(verconDelta: VerifiableContinuityDelta) {
    void __merge(this.state, verconDelta)
  }

  static async verify(trustedVerifyKey: VerifyKey) {}
}
