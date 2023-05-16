import { get } from './get'

describe('get', () => {
  expect(get({ hi: { hey: true } }, 'hi.hey')).toEqual(true)
})
