// @flow

import execAsync from './execAsync'
import dockerEnv from './dockerEnv'

async function getDockerIP(): Promise<string> {
  try {
    await execAsync('which docker-machine', {silent: true})
    return (await execAsync('docker-machine ip', {
      silent: true,
      env: await dockerEnv(),
    })).stdout.trim()
  } catch (error) {
    return 'localhost'
  }
}

export default getDockerIP

