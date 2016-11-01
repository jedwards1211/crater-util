import {expect} from 'chai'
import dockerEnv from '../src/dockerEnv'
import execAsync from '../src/execAsync'
import dockerComposePort from '../src/dockerComposePort'

describe('dockerComposePort', () => {
  let options
  before(async function () {
    this.timeout(60000)
    options = {
      cwd: __dirname,
      env: {
        ...process.env,
        ...await dockerEnv(),
      },
    }
    await execAsync('docker-compose up -d', options)
  })

  it('works', async () => {
    expect(await dockerComposePort('db', 27017, {cwd: __dirname})).to.match(/[^:]+:3000/)
  })

  after(async function () {
    this.timeout(60000)
    await execAsync('docker-compose down', options)
  })
})
