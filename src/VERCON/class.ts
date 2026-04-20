import {
  __create,
  __delete,
  __merge,
  __snapshot,
} from '@sovereignbase/convergent-replicated-list'
import type {
  VerconState,
  VerconSnapshot,
  VerconDelta,
  VerconStateEntry,
} from '../.types/index.js'
import { __continue } from '../core/special/continue/index.js'
import { SignKey, VerifyKey } from '@sovereignbase/cryptosuite'
import { __assert } from '../core/special/assert/index.js'

export class Vercon {
  declare private readonly state: VerconState
  constructor(snapshot?: VerconSnapshot) {
    Object.defineProperties(this, {
      state: {
        value: __create<VerconStateEntry>(snapshot),
        enumerable: false,
        configurable: false,
        writable: false,
      },
    })
  }

  async assert(claims: unknown) {
    return __assert(claims)
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
  erase(count: number): void {
    if (typeof count !== 'number') return
    void __delete(this.state, 0, count)
  }

  merge(VerconDelta: VerconDelta) {
    void __merge(this.state, VerconDelta)
  }
  snapshot(): VerconSnapshot {
    return __snapshot(this.state)
  }

  static async verify(trustedVerifyKey: VerifyKey) {}
}
