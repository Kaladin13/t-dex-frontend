import { Buffer } from 'buffer'

declare global {
  interface Window {
    Buffer: typeof Buffer
    process: {
      env: Record<string, string | undefined>
    }
  }
}

window.Buffer = Buffer

export {}
