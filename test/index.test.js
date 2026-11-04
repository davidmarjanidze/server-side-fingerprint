import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { generateFingerprint, generateFingerprintData } from '../dist/index.js'

test('returns the same fingerprint on every call', () => {
  assert.equal(generateFingerprint(), generateFingerprint())
})

test('uses sha256 by default', () => {
  assert.match(generateFingerprint(), /^[0-9a-f]{64}$/)
})

test('supports other hash algorithms', () => {
  assert.match(generateFingerprint({ algorithm: 'md5' }), /^[0-9a-f]{32}$/)
})

test('throws on an unknown algorithm', () => {
  assert.throws(() => generateFingerprint({ algorithm: 'nope' }))
})

test('excluded fields change the fingerprint', () => {
  assert.notEqual(
    generateFingerprint(),
    generateFingerprint({ exclude: ['hostname'] })
  )
})

test('data has the documented fields', () => {
  assert.deepEqual(Object.keys(generateFingerprintData()), [
    'arch',
    'cpus',
    'endianness',
    'hostname',
    'machine',
    'platform',
    'release',
    'totalmem',
    'type',
    'userInfo',
    'version'
  ])
})

test('CommonJS build gives the same result', () => {
  const cjs = createRequire(import.meta.url)('../dist/index.cjs')
  assert.equal(cjs.generateFingerprint(), generateFingerprint())
})
