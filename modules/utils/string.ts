const toEllipsis = (text: string, initAt?: number, endAt?: number) => {
  if (!initAt && !endAt) return '...'

  if (initAt && text.length <= initAt) return `${text}...`

  if (initAt && text.length > initAt && !endAt)
    return `${text.slice(0, initAt)}...`

  return [text.slice(0, initAt), '...', text.slice(endAt)].join('')
}

const string = {
  toEllipsis
}

export default string
