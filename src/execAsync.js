// @flow

import exec from './exec'
import {customize} from 'async-child-process/lib/execAsync'

export type Result = {stdout: string, stderr: string}

export default customize(exec)


