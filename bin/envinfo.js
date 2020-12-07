#!/usr/bin/env node
const {spawnSync} = require('child_process')

const options = {
  npmPackages: `{${[
    '@testing-library/*',
    // important transitive dependencies
    'aria-query',
    'dom-accessibility-api',
    // Libraries tested by @testing-library/*
    'react',
    'react-dom',
    // testing environment
    'jsdom',
    // test runner
    'jest',
  ]}}`,
  Binaries: ['Node', 'Yarn', 'npm'],
  System: ['OS'],
}

const args = []
if (process.argv.indexOf('--json') !== -1) {
  args.push('--json')
}
const {status} = spawnSync(
  'npx',
  [
    'envinfo',
    '--raw',
    `${JSON.stringify(options)}`,
    '--duplicates',
    '--fullTree',
    '--showNotFound',
    ...args,
  ],
  {
    stdio: 'inherit',
  },
)

if (status !== null) {
  // The error is piped to stderr
  // eslint-disable-next-line no-process-exit
  process.exit(status)
}
