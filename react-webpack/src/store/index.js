import UserStore from './modules/user'
import MusicStore from './modules/music'

class Store {
  constructor() {
    // 用于合并子store
    this.user = new UserStore()
    this.music = new MusicStore()
  }
}
const store = new Store()
export default store
