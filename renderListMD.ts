import { identity } from 'lodash-es'
import { Mapper } from '../generic/models/Mapper'

export function renderListMD<T>(array: T[], renderer: Mapper<T, string> = identity) {
  return array.map(el => `* ${renderer(el)}`).join('\n')
}

export function renderListWithLabelsMD<T>(array: [string, T][], renderer: Mapper<T, string> = identity) {
  return array.map(([label, el]) => `* ${label}: ${renderer(el)}`).join('\n')
}

export function renderLineMD<T>(array: T[], renderer: Mapper<T, string> = identity) {
  return array.map(renderer).join(', ')
}
