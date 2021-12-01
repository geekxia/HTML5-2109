
const baseURL = 'https://cnodejs.org'

function fetch(url,method,data={}) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: baseURL+url,
      data,
      method,
      success(res) {
        if(res.success) resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}
