import request from '@/utils/request'

// axios调接口，如果是GET请求，使用params入参；如果是POST请求，使用data入参。
// 调接口一般只用关心三件事：url是多少，method是否有错，入参是否有错（检查必填参数、数据类型）
// 接口调试工具：postman，devtools、network、console数据流。

export function fetchMusicList(params) {
  return request({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}
