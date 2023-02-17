class Logger {
  static error(
    error: string,
    code: number | string,
    errorMessage?: Error,
    silent?:
      | boolean
      | {
          log?: boolean
          thrower?: boolean
        }
  ) {
    const extendedError = errorMessage?.message
      ? errorMessage.message
      : errorMessage

    if (
      (typeof silent === 'boolean' && !silent) ||
      (typeof silent !== 'boolean' && !silent?.log)
    ) {
      console.error(extendedError)
    }

    if (
      (typeof silent === 'boolean' && !silent) ||
      (typeof silent !== 'boolean' && !silent?.thrower)
    ) {
      throw new Error(`${error}: ${extendedError}`, {
        cause: {
          code
        }
      })
    }
  }
}

export default Logger
