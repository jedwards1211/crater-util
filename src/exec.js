// @flow

import child_process from 'child_process'
import killOnExit from './killOnExit'
import type {ChildProcess} from 'child_process'

export default function exec(
  command: string,
  options?: Object = {},
  callback?: (err: ?Error, stdout?: string | Buffer, stderr?: string | Buffer) => *
): ChildProcess {
  const {silent, ...otherOptions} = options
  const child = child_process.exec(command, otherOptions, callback)
  if (child.stdin) process.stdin.pipe(child.stdin)
  if (!silent) {
    if (child.stdout) child.stdout.pipe(process.stdout)
    if (child.stderr) child.stderr.pipe(process.stderr)
  }
  killOnExit(child)
  return child
}

