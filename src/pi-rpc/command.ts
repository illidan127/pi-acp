import { platform } from 'node:os'

export function defaultPiCommand(): string {
  return platform() === 'win32' ? 'pi.cmd' : 'pi'
}

export function getPiCommand(override?: string): string {
  return override ?? defaultPiCommand()
}

export function shouldUseShellForPiCommand(cmd: string): boolean {
  if (platform() !== 'win32') return false

  const normalized = cmd.trim().toLowerCase()
  return normalized.endsWith('.cmd') || normalized.endsWith('.bat')
}

/**
 * Split the adapter's own CLI argv from args meant for `pi`.
 * Everything after the first `--` is forwarded verbatim to every `pi` subprocess.
 */
export function splitPiArgs(argv: readonly string[]): { own: string[]; pi: string[] } {
  const separatorIndex = argv.indexOf('--')
  if (separatorIndex < 0) return { own: [...argv], pi: [] }
  return { own: argv.slice(0, separatorIndex), pi: argv.slice(separatorIndex + 1) }
}
