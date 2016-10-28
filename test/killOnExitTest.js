import spawn from '../src/spawn'
import {childPrinted} from 'async-child-process'
import {expect} from 'chai'

describe('killOnExit', () => {
  it('kills child when parent process exits', async function () {
    this.timeout(60000)
    const proc = spawn('babel-node', [require.resolve('./util/killOnExitParent')], {silent: true})
    const parentOutput = await childPrinted(proc, /parent pid: \d+/)
    const parentPid = parentOutput.substring("parent pid: ".length)
    const childOutput = await childPrinted(proc, /child pid: \d+/)
    const childPid = childOutput.substring("child pid: ".length)
    // wait for parent to exit
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(() => process.kill(parentPid, 0)).to.throw
    expect(() => process.kill(childPid, 0)).to.throw
  })
  it('kills child when parent process is killed with SIGINT', async function () {
    this.timeout(60000)
    const proc = spawn('babel-node', [require.resolve('./util/killOnExitParent')], {silent: true})
    const parentOutput = await childPrinted(proc, /parent pid: \d+/)
    const parentPid = parentOutput.substring("parent pid: ".length)
    const childOutput = await childPrinted(proc, /child pid: \d+/)
    const childPid = childOutput.substring("child pid: ".length)
    proc.kill('SIGINT')
    expect(() => process.kill(parentPid, 0)).to.throw
    expect(() => process.kill(childPid, 0)).to.throw
  })
  it('kills child when parent process is killed with SIGTERM', async function () {
    this.timeout(60000)
    const proc = spawn('babel-node', [require.resolve('./util/killOnExitParent')], {silent: true})
    const parentOutput = await childPrinted(proc, /parent pid: \d+/)
    const parentPid = parentOutput.substring("parent pid: ".length)
    const childOutput = await childPrinted(proc, /child pid: \d+/)
    const childPid = childOutput.substring("child pid: ".length)
    proc.kill('SIGTERM')
    expect(() => process.kill(parentPid, 0)).to.throw
    expect(() => process.kill(childPid, 0)).to.throw
  })
  it('works when child process exits by itself', async function () {
    this.timeout(60000)
    const proc = spawn('babel-node', [require.resolve('./util/killOnExitParent2')], {silent: true})
    const parentOutput = await childPrinted(proc, /parent pid: \d+/)
    const parentPid = parentOutput.substring("parent pid: ".length)
    const childOutput = await childPrinted(proc, /child pid: \d+/)
    const childPid = childOutput.substring("child pid: ".length)
    // wait for parent to exit
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(() => process.kill(parentPid, 0)).to.throw
    expect(() => process.kill(childPid, 0)).to.throw
  })
})
