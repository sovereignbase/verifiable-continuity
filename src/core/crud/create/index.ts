import { CRStruct } from '@sovereignbase/convergent-replicated-struct'
import { CRList } from '@sovereignbase/convergent-replicated-list'
import type { VerconSnapshot } from '../../../.types/index.js'
import { prototype } from '@sovereignbase/utils'

export async function __create(snapshot?: VerconSnapshot) {
  if (
    snapshot &&
    prototype(snapshot) === 'record' &&
    Object.hasOwn(snapshot, 'assertionMethod') &&
    Object.hasOwn(snapshot, 'verificationMethods')
  ) {
  }
}
