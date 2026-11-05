# server-side-fingerprint

[![npm version](https://img.shields.io/npm/v/server-side-fingerprint.svg)](https://www.npmjs.com/package/server-side-fingerprint)
[![license](https://img.shields.io/npm/l/server-side-fingerprint.svg)](https://www.npmjs.com/package/server-side-fingerprint)

Generates a fingerprint hash of the machine your Node.js code runs on, using
data from the `node:os` module. The same machine and user give the same hash.

Works with both `import` and `require`. Requires Node.js 18 or newer.

## Installation

```console
npm i server-side-fingerprint
```

## Usage

```ts
import { generateFingerprint } from 'server-side-fingerprint'

generateFingerprint()
// 'a8dcbd41d881bd32d26956c0f87de53b51aa4cf3dbc613931e248c641144acf7'

generateFingerprint({ algorithm: 'md5' })
// 'dd92f2efbef99710a3aad4c148fe4581'

// Keep the same fingerprint after OS updates
generateFingerprint({ exclude: ['release', 'version'] })
```

## What goes into the hash

`generateFingerprintData()` returns the data that gets hashed. On a Mac it
looks like this:

```json
{
  "arch": "arm64",
  "cpus": ["Apple M4", "Apple M4", "Apple M4", "Apple M4"],
  "endianness": "LE",
  "hostname": "my-laptop.local",
  "machine": "arm64",
  "platform": "darwin",
  "release": "25.5.0",
  "totalmem": 17179869184,
  "type": "Darwin",
  "userInfo": {
    "username": "john",
    "uid": 501,
    "gid": 20,
    "homedir": "/Users/john",
    "shell": "/bin/bash"
  },
  "version": "Darwin Kernel Version 25.5.0: ..."
}
```

The fingerprint changes when any of these change. For example, when the
hostname is renamed, the OS is updated, or the code runs as a different
user. Use the `exclude` option to leave out the fields you don't care about.

## API

### generateFingerprint(options?)

- `options.algorithm` - any hash algorithm supported by `crypto.createHash`.
  Default: `'sha256'`.
- `options.exclude` - list of fields from `FingerprintData` to leave out of the
  hash. Default: `[]`.
- Returns: `string` (hex)

Throws if the algorithm isn't supported.

### generateFingerprintData()

- Returns: `FingerprintData`

### Types

```ts
interface FingerprintData {
  arch: string
  cpus: string[] // CPU model of each logical core
  endianness: 'BE' | 'LE'
  hostname: string
  machine: string
  platform: NodeJS.Platform
  release: string
  totalmem: number
  type: string
  userInfo: {
    username: string
    uid: number
    gid: number
    homedir: string
    shell: string | null
  }
  version: string
}

type FingerprintField = keyof FingerprintData

interface FingerprintOptions {
  algorithm?: string
  exclude?: FingerprintField[]
}
```

## License

ISC
