
const baseURL = 'http://10.36.132.232:9999'

function fetch(url,method,data={}) {
  data.userId = 'SZ202109087'
  return new Promise(function(resolve, reject){
    $.ajax({
      url: baseURL+url,
      data,
      method,
      success(res) {
        console.log('成功')
        if(res.err===0) {
          resolve(res.data)
        }
      },
      fail(err){
        reject(err)
      }
    })
  })
}
