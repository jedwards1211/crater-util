import psTree from 'ps-tree'
import execAsync from './execAsync'
import type {ChildProcess} from 'child_process'
import promisify from 'es6-promisify'
import createDebug from 'debug'

const debug = createDebug('crater-util:kill')
const psDebug = createDebug('crater-util:kill:ps')
const runPs = process.env.DEBUG && process.env.DEBUG.split(/\s*,\s*/).indexOf('crater-util:kill:ps') >= 0

export default async function kill(child: ChildProcess, signal?: string = 'SIGTERM'): Promise<void> {
  if (runPs) psDebug('\n' + (await execAsync('ps -o pid,ppid,command | sort', {silent: true})).stdout)

  debug(`kill(${child.pid}, ${signal}):`)
  const children = await promisify(psTree)(child.pid)
  const pids = children.map(child => parseInt(child.PID))
  debug(`  child pids: ${pids.join(', ')}`)
  pids.forEach(pid => {
    try {
      process.kill(pid, signal)
      debug(`  process.kill(${pid}, ${signal}): OK`)
    } catch (err) {
      debug(`  process.kill(${pid}, ${signal}): (ignoring) ${err}`)
    }
  })
  // if killing child throws, the function should reject
  try {
    process.kill(child.pid, signal)
    debug(`  process.kill(${child.pid}, ${signal}): OK`)
  } catch (err) {
    debug(`  process.kill(${child.pid}, ${signal}): ${err}`)
    throw err
  }

  pids.push(child.pid)

  const anyAlive = (): boolean => pids.find(pid => {
    try {
      process.kill(pid, 0)
      // success means it's still alive
      debug(`  ${pid} is still alive`)
      return true
    } catch (error) {
      // error means it's dead
      debug(`  ${pid} is dead`)
      return false
    }
  })

  while (anyAlive()) await new Promise(resolve => setTimeout(resolve, 500))
  debug('  done')

  if (runPs) psDebug('\n' + (await execAsync('ps -o pid,ppid,command | sort', {silent: true})).stdout)
}

