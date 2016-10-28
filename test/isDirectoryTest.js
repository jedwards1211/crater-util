import {expect} from 'chai'
import isDirectory from '../src/isDirectory'
import path from 'path'

describe('isDirectory', () => {
  it('resolves to false for non-directories', async () => {
    expect(await isDirectory(__filename)).to.be.false
  })
  it('resolves to true for directories', async () => {
    expect(await isDirectory(__dirname)).to.be.true
  })
  it('resolves to false for nonexisted paths', async () => {
    expect(await isDirectory(path.join(__dirname, 'blah'))).to.be.false
  })
})
