import type { VerconSnapshot, VerconState } from '../../../.types/index.js'
import { __snapshot as CRStrucSnapshot } from '@sovereignbase/convergent-replicated-struct'
import { __snapshot as CRListSnapshot } from '@sovereignbase/convergent-replicated-list'

export function __snapshot(verconReplica: VerconState): VerconSnapshot {
  return {
    assertionMethod: CRStrucSnapshot(verconReplica.assertionMethod),
    verificationMethods: CRListSnapshot(verconReplica.verificationMethods),
  }
}
