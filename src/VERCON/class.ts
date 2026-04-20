import {
  __create,
  __delete,
  __merge,
  __snapshot,
} from '@sovereignbase/convergent-replicated-list'
import type {
  VERCONState,
  VERCONSnapshot,
  VERCONDelta,
  VERCONStateEntry,
} from '../.types/index.js'
import { __continue } from '../core/continue/index.js'
import { SignKey, VerifyKey } from '@sovereignbase/cryptosuite'

export class VERCON {
  declare private readonly state: VERCONState
  constructor(snapshot?: VERCONSnapshot) {
    Object.defineProperties(this, {
      state: {
        value: __create<VERCONStateEntry>(snapshot),
        enumerable: false,
        configurable: false,
        writable: false,
      },
    })
  }

  async sign() {}

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
  erase(count: number): void {
    if (typeof count !== 'number') return
    void __delete(this.state, 0, count)
  }

  merge(verconDelta: VERCONDelta) {
    void __merge(this.state, verconDelta)
  }
  snapshot(): VERCONSnapshot {
    return __snapshot(this.state)
  }

  static async verify(trustedVerifyKey: VerifyKey) {}
}
