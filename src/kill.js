import psTree from 'ps-tree'
import type {ChildProcess} from 'child_process'
import promisify from 'es6-promisify'

export default async function kill(child: ChildProcess, signal?: string = 'SIGTERM'): Promise<void> {
  const children = await promisify(psTree)(child.pid)
  children.forEach(child => {
    try {
      process.kill(parseInt(child.PID), signal)
    } catch (err) {
      // ignore
    }
  })
  process.kill(child.pid, signal)

  async function waitUntilKilled(): Promise<void> {
    while (true) { // eslint-disable-line no-constant-condition
      try {
        process.kill(child.pid, 0)
        children.forEach(child => process.kill(parseInt(child.PID), signal))
        break
      } catch (error) {
        // keep looping
      }
    }
  }

  await waitUntilKilled()
}

