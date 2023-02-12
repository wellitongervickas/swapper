class Logger {
  static error(
    error: string,
    code: number | string,
    errorMessage?: Error,
    silent?: boolean
  ) {
    if (silent) return

    const extendedError = errorMessage?.message
      ? errorMessage.message
      : errorMessage

    throw new Error(`${error}: ${extendedError}`, {
      cause: {
        code
      }
    })
  }
}

export default Logger
