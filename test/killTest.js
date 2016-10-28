import kill from '../src/kill'
import spawn from '../src/spawn'
import {childPrinted} from 'async-child-process'
import {expect} from 'chai'

describe('kill', () => {
  it('kills a tree of processes', async function () {
    this.timeout(5000)
    const proc = spawn(process.argv[0], [require.resolve('./util/killParent')], {silent: true})
    const parentOutput = await childPrinted(proc, /parent pid: \d+/)
    const parentPid = parentOutput.substring("parent pid: ".length)
    const childOutput = await childPrinted(proc, /child pid: \d+/)
    const childPid = childOutput.substring("child pid: ".length)
    await kill(proc)
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(() => process.kill(parentPid, 0)).to.throw
    expect(() => process.kill(childPid, 0)).to.throw
  })
})
