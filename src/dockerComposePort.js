// @flow

import execAsync from './execAsync'
import getDockerIP from './getDockerIP'
import dockerEnv from './dockerEnv'

async function dockerComposePort(service: string, privatePort: string | number, options?: Object = {}): Promise<string> {
  const host = (await execAsync(`docker-compose port ${service} ${privatePort}`, {
    silent: true,
    ...options,
    env: {
      ...await dockerEnv(),
      ...options.env || {},
    }
  })).stdout.trim()
  return host.replace(/^[^:]+/, await getDockerIP())
}

export default dockerComposePort

