// @flow

import spawn from './spawn'
import {join} from 'async-child-process'

type Result = {stdout: string, stderr: string}

function spawnAsync(command: string, args?: Array<string> = [], options?: Object = {}): Promise<Result> {
  return join(spawn(command, args, options))
}

export default spawnAsync

