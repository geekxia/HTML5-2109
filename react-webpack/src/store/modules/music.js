import { makeAutoObservable} from 'mobx'
import { fetchMusicList } from '@/utils/api'

export default class MusicStore {
  constructor() {
    makeAutoObservable(this)
  }
  list = []
  getList(params) {
    fetchMusicList(params).then(res=>{
      console.log('音乐列表', res)
      this.list = res.hotkey
    })
  }
}
