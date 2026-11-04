import { createHash } from 'node:crypto'
import {
  arch,
  cpus,
  endianness,
  hostname,
  machine,
  platform,
  release,
  totalmem,
  type,
  userInfo,
  version
} from 'node:os'

export interface FingerprintData {
  arch: string
  /** CPU model of each logical core. */
  cpus: string[]
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

export type FingerprintField = keyof FingerprintData

export interface FingerprintOptions {
  /**
   * Hash algorithm passed to `crypto.createHash`.
   * @default 'sha256'
   */
  algorithm?: string
  /** Fields to leave out of the hash. */
  exclude?: FingerprintField[]
}

/**
 * Collects the operating system data that the fingerprint is built from.
 */
export function generateFingerprintData(): FingerprintData {
  const user = userInfo()

  return {
    arch: arch(),
    cpus: cpus().map((cpu) => cpu.model),
    endianness: endianness(),
    hostname: hostname(),
    machine: machine(),
    platform: platform(),
    release: release(),
    totalmem: totalmem(),
    type: type(),
    // Built by hand so the key order never depends on Node's internals.
    userInfo: {
      username: user.username,
      uid: user.uid,
      gid: user.gid,
      homedir: user.homedir,
      shell: user.shell
    },
    version: version()
  }
}

/**
 * Hashes the data from `generateFingerprintData` into a hex string.
 */
export function generateFingerprint(options: FingerprintOptions = {}): string {
  const { algorithm = 'sha256', exclude = [] } = options
  const data = Object.fromEntries(
    Object.entries(generateFingerprintData()).filter(
      ([field]) => !exclude.includes(field as FingerprintField)
    )
  )

  return createHash(algorithm).update(JSON.stringify(data)).digest('hex')
}
