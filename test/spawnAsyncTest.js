import spawnAsync from '../src/spawnAsync'
import {expect} from 'chai'

describe('spawnAsync', () => {
  afterEach(() => {
    process.stdout.removeAllListeners()
    process.stderr.removeAllListeners()
  })

  it("doesn't pipe streams by default", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await spawnAsync('node', ['-e', ''])
    expect(stdoutPiped).to.be.false
    expect(stderrPiped).to.be.false
  })
  it("pipes streams when stdio is pipe", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await spawnAsync('node', ['-e', ''], {stdio: 'pipe'})
    expect(stdoutPiped).to.be.true
    expect(stderrPiped).to.be.true
  })
  it("doesn't pipe streams when stdio is pipe but silent is true", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await spawnAsync('node', ['-e', ''], {stdio: 'pipe', silent: true})
    expect(stdoutPiped).to.be.false
    expect(stderrPiped).to.be.false
  })
  it("doesn't pipe streams when stdio is inherit but silent is true", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await spawnAsync('node', ['-e', ''], {stdio: 'inherit', silent: true})
    expect(stdoutPiped).to.be.false
    expect(stderrPiped).to.be.false
  })
})

