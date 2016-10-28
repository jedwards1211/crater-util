import spawnAsync from '../src/spawnAsync'
import {expect} from 'chai'
import {join} from 'async-child-process'

const origStdout = process.stdout.write
const origStderr = process.stderr.write

describe('spawnAsync', () => {
  let stdout
  let stderr

  before(() => {
    process.stdout.on('data', data => {
      console.log(data)
      stdout += data
    })
    process.stdout.write('THIS IS A TEST')
    process.stderr.on('data', data => stderr += data)
  })


  beforeEach(() => {
    stdout = ''
    stderr = ''
  })

  after(() => {
    process.stdout.removeAllListeners()
    process.stderr.removeAllListeners()
  })

  it('pipes streams by default', async () => {
    await spawnAsync('node', ['-e', 'console.log("hello"); console.error("world")'])
  })
})
