const {execFileSync} = require('child_process')
const fs = require('fs')
const path = require('path')

test('logs info about the environment', () => {
  const packageJsonPath = path.resolve(__dirname, '../../package.json')
  const packageJson = fs.readFileSync(packageJsonPath)
  const manifest = JSON.parse(packageJson)
  const envinfoPath = path.resolve(
    path.dirname(packageJsonPath),
    manifest.bin.envinfo,
  )

  const envinfoJSON = execFileSync(envinfoPath, ['--json'], {encoding: 'utf-8'})

  const envinfo = JSON.parse(envinfoJSON)
  expect(envinfo).toEqual({
    Binaries: {
      Node: {
        path: expect.any(String),
        version: expect.any(String),
      },
      Yarn: {
        path: expect.any(String),
        version: expect.any(String),
      },
      npm: {
        path: expect.any(String),
        version: expect.any(String),
      },
    },
    System: {
      OS: expect.any(String),
    },
    npmPackages: {
      '@testing-library/dom': {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
      '@testing-library/jest-dom': {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
      'aria-query': {
        installed: expect.any(String),
      },
      'dom-accessibility-api': {
        installed: expect.any(String),
      },
      jest: {
        installed: expect.any(String),
      },
      jsdom: {
        installed: expect.any(String),
      },
      react: {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
      'react-dom': {
        installed: expect.any(String),
        wanted: expect.any(String),
      },
    },
  })
})
