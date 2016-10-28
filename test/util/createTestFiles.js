import fs from 'fs'
import path from 'path'
import promisify from 'es6-promisify'
import mkdirp from 'mkdirp'

function getChildren(node) {
  const children = []
  for (var key in node) {
    if (!key.startsWith('_')) children.push(key)
  }
  return children
}

export default async function createTestFiles(root, files) {
  const now = Date.now() / 1000
  const children = getChildren(files)
  if (children.length) await promisify(mkdirp)(root)
  else await promisify(fs.writeFile)(root, '', 'utf8')
  const promises = children.map(child => createTestFiles(path.join(root, child), files[child]))
  await Promise.all(promises)
  await promisify(fs.utimes)(root, files._atime || files._mtime || now, files._mtime || now)
}

