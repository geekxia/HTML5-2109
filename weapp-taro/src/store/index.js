import Counter from './modules/counter'

class Store {
  constructor() {
    this.counter = new Counter()
  }
}

export default new Store()
