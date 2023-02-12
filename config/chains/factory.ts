import { merge } from '@/modules/utils/objects'
import { ChainOptions, ChainHub } from './types'

export class Chain {
  #options: ChainOptions
  #hubs: ChainHub = {}

  constructor(options: ChainOptions) {
    this.#options = options
  }

  get id() {
    return this.#options.id
  }

  get scanURL() {
    return this.#options.scanURL
  }

  get title() {
    return this.#options.title
  }

  addHub(hub: ChainHub) {
    this.#hubs = merge(this.#hubs, hub)
  }

  get hubs() {
    return this.#hubs
  }

  getHub(id: keyof ChainHub) {
    return this.#hubs[id]
  }
}
