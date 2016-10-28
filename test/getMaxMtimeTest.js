import {expect} from 'chai'
import getMaxMtime from '../src/getMaxMtime'
import rimraf from 'rimraf'
import path from 'path'
import promisify from 'es6-promisify'
import createTestFiles from './util/createTestFiles'

const root = path.resolve(__dirname, '..', 'testfiles', 'getMaxMtime')

describe('getMaxMtime', () => {
  before(async () => {
    await promisify(rimraf)(root)
  })

  it('works', async () => {
    await createTestFiles(root, {
      test1: {
        _mtime: 1,
        a: {
          _mtime: 10,
        },
        b: {
          _mtime: 5,
          c: {
            _mtime: 20,
          },
        },
      }
    })
    expect(await getMaxMtime(path.join(root, 'test1'))).to.equal(20000)
    expect(await getMaxMtime([path.join(root, 'test1', 'a'), path.join(root, 'test1', 'b')])).to.equal(10000)
  })

  after(async () => {
    await promisify(rimraf)(root)
  })
})
