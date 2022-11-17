import { identity } from 'lodash-es'
import { Mapper } from 'zenbox-util/lodash'

export function renderListMD<T>(array: T[], renderer: Mapper<T, string> = identity) {
  return array.map(el => `* ${renderer(el)}`).join('\n')
}

export function renderLineMD<T>(array: T[], renderer: Mapper<T, string> = identity) {
  return array.map(renderer).join(', ')
}
