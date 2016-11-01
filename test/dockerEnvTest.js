import {assert} from 'chai'
import dockerEnv from '../src/dockerEnv'

describe('dockerEnv', () => {
  it('returns process.env if DOCKER_HOST is included', async () => {
    process.env.DOCKER_HOST = "test"
    assert.strictEqual(await dockerEnv(), process.env)
  })
  after(() => delete process.env.DOCKER_HOST)
})
