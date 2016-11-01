import {expect} from 'chai'
import getDockerIP from '../src/getDockerIP'

describe('getDockerIP', () => {
  it('resolves to a string', async () => {
    expect(await getDockerIP()).to.not.be.empty
  })
})

