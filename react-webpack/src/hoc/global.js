import React from 'react'

import api from '@/utils/api'
import tip from '@/utils/tip'

export default type => {
  let global = {}
  switch (type) {
    case 'api':
      global = api
      break
    case 'tip':
      global = tip
      break
    default:
  }
  return W=>props=>(<W {...props} {...global} />)
}
