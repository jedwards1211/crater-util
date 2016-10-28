import kill from '../src/kill'
import spawn from '../src/spawn'
import {childPrinted} from 'async-child-process'
import {expect} from 'chai'

describe('kill', () => {
  it('kills a tree of processes', async function () {
    this.timeout(60000)
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
  it('works when child exits early', async function () {
    this.timeout(60000)
    const proc = spawn(process.argv[0], [require.resolve('./util/killParent2')], {silent: true})
    const parentOutput = await childPrinted(proc, /parent pid: \d+/)
    const parentPid = parentOutput.substring("parent pid: ".length)
    const childOutput = await childPrinted(proc, /child pid: \d+/)
    const childPid = childOutput.substring("child pid: ".length)
    // give child some time to exit
    await new Promise(resolve => setTimeout(resolve, 500))
    await kill(proc)
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(() => process.kill(parentPid, 0)).to.throw
    expect(() => process.kill(childPid, 0)).to.throw
  })
  it('rejects when killing a nonexistent process', async function () {
    this.timeout(60000)
    let pid = 9000
    function pidExists() {
      try {
        process.kill(pid, 0)
        return true
      } catch (err) {
        return false
      }
    }
    while (pidExists()) pid++
    let error
    await kill({pid}).catch(err => error = err)
    expect(error).to.be.defined
  })
})
