import { createStore } from 'vuex'

import todo from './modules/todo'
import cnode from './modules/cnode'

export default createStore({
  modules: {
    todo,
    cnode
  }
})
