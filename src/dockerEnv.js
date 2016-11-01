// @flow

import {parse} from 'dotenv'
import execAsync from './execAsync'

async function dockerEnv(): Promise<Object> {
  if (process.env.DOCKER_HOST) return process.env
  try {
    return {
      ...process.env,
      ...parse((await execAsync('docker-machine env', {silent: true})).stdout.replace(/^#.*$|^export /mg, '')),
    }
  } catch (error) {
    return process.env
  }
}

export default dockerEnv

