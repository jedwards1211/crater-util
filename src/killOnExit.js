// @flow

import kill from './kill'

import type {ChildProcess} from 'child_process'

export default function killOnExit(child: ChildProcess) {
  function hook() {
    kill(child)
  }
  child.on('exit', (): any => {
    process.removeListener('exit', hook)
    process.removeListener('SIGINT', hook)
    process.removeListener('SIGTERM', hook)
  })
  process.on('exit', hook)
  process.on('SIGINT', hook)
  process.on('SIGTERM', hook)
}

