import {customize} from 'async-child-process/lib/kill'
import terminate from 'terminate'

const kill = customize(child => terminate(child.pid))
export default kill

