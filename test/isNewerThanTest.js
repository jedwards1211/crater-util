import {expect} from 'chai'
import isNewerThan from '../src/isNewerThan'
import rimraf from 'rimraf'
import path from 'path'
import promisify from 'es6-promisify'
import createTestFiles from './util/createTestFiles'

const root = path.resolve(__dirname, '..', 'testfiles', 'isNewerThan')

describe('isNewerThan', () => {
  before(async () => {
    await promisify(rimraf)(root)
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
        d: {
          _mtime: 2,
          e: {
            _mtime: 30
          }
        }
      }
    })
  })

  it('works for existing comparisons', async () => {
    expect(await isNewerThan(path.join(root, 'test1', 'a'), path.join(root, 'test1', 'b'))).to.be.false
    expect(await isNewerThan(path.join(root, 'test1', 'd'), path.join(root, 'test1', 'b'))).to.be.true
  })

  it('returns true when comparing with nonexistent path', async () => {
    expect(await isNewerThan(path.join(root, 'test1', 'd'), path.join(root, 'test1', 'g'))).to.be.true
  })

  after(async () => {
    await promisify(rimraf)(root)
  })
})
