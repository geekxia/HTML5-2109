import { observable, action } from 'mobx'


export default class Counter {
  constructor() {
    console.log('counter store')
  }

  @observable
  counter = 0

  @action
  counterStore() {
    this.counter++
  }

  @action
  increment() {
    this.counter++
  }

  @action
  decrement() {
    this.counter--
  }
}
