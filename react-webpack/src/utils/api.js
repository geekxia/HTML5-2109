import request from './request'

export function fetchMusicList(params) {
  return request({url: '/splcloud/fcgi-bin/gethotkey.fcg', method:'GET', params})
}

export default {
  fetchMusicList
}
