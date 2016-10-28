import execAsync from '../src/execAsync'
import {expect} from 'chai'

describe('execAsync', () => {
  afterEach(() => {
    process.stdout.removeAllListeners()
    process.stderr.removeAllListeners()
  })

  it("pipes streams by default", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await execAsync('node -e ""')
    expect(stdoutPiped).to.be.true
    expect(stderrPiped).to.be.true
  })
  it("pipes streams when stdio is pipe", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await execAsync('node -e ""', {stdio: 'pipe'})
    expect(stdoutPiped).to.be.true
    expect(stderrPiped).to.be.true
  })
  it("doesn't pipe streams when stdio is pipe but silent is true", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await execAsync('node -e ""', {stdio: 'pipe', silent: true})
    expect(stdoutPiped).to.be.false
    expect(stderrPiped).to.be.false
  })
  it("doesn't pipe streams when stdio is inherit but silent is true", async () => {
    let stdoutPiped = false
    let stderrPiped = false
    process.stdout.on('pipe', () => stdoutPiped = true)
    process.stderr.on('pipe', () => stderrPiped = true)
    await execAsync('node -e ""', {stdio: 'inherit', silent: true})
    expect(stdoutPiped).to.be.false
    expect(stderrPiped).to.be.false
  })
})

