// @flow

import {parse} from 'dotenv'
import execAsync from './execAsync'

async function dockerEnv(): Promise<Object> {
  try {
    return parse((await execAsync('docker-machine env', {silent: true})).stdout.replace(/^#.*$|^export /mg, ''))
  } catch (error) {
    return {}
  }
}

export default dockerEnv

