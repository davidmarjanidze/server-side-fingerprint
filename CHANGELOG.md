# 2.0.1 (2026-11-05)

- Update the author name
- Clean up the README

# 2.0.0 (2026-11-04)

Breaking: fingerprints from 1.x won't match fingerprints from 2.0.

- The default hash algorithm is now SHA-256. Pass `{ algorithm: 'md5' }`
  to get MD5 hashes.
- Add the `exclude` option to `generateFingerprint`.
- Remove CPU speed from the data. On Linux it reports the current clock
  speed, so the fingerprint changed depending on CPU load. `cpuInfo` is
  replaced by `cpus`, a list of CPU model names.
- Remove `homedir` and `tmpdir`. Both depend on environment variables.
  `userInfo.homedir` is still included.
- Remove `availableParallelism`. It depends on CPU affinity and container
  limits.
- Remove `EOL` and `devNull`. They're the same for every machine on the
  same platform.
- Remove the `CpuPartialInfo` type and add `FingerprintField` and
  `FingerprintOptions`.
- Add an `exports` map with separate ESM and CommonJS builds and types.
- Build with esbuild instead of Rollup.
- Require Node.js 18 or newer.

# 1.6.0 (2023-06-10)

Remove the downloads tag from `README.md`.

# 1.5.0 (2023-05-27)

Increasing fingerprint stability by making sure that the user
properties are in the same order every time because the properties'
order might change for some unexpected reason, and the fingerprint will
break.

# 1.4.0 (2023-05-27)

Add function descriptions in the source files.

# 1.3.0 (2023-05-27)

Add API functions' descriptions.

# 1.2.0 (2023-05-27)

Add types in the documentation.

# 1.1.0 (2023-05-27)

Refactor the library.

# 1.0.5 (2023-05-26)

Remove `networkInterfaces` data from the fingerprint, it's unstable.
