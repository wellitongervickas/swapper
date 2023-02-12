class Logger {
  static error(
    error: string,
    code: number | string,
    errorMessage?: Error,
    silent?: boolean
  ) {
    const extendedError = errorMessage?.message
      ? errorMessage.message
      : errorMessage
    console.error(extendedError)

    if (silent) return

    throw new Error(`${error}: ${extendedError}`, {
      cause: {
        code
      }
    })
  }
}

export default Logger
