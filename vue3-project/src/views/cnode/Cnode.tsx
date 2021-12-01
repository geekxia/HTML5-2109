import CnodeFilter from './components/CnodeFilter'
import CnodeList from './components/CnodeList'
import CnodePage from './components/CnodePage'

import useCnode from './useCnode'
import './style.scss'

export default {
  setup() {
    const [cate,page,list] = useCnode()
    return ()=>(
      <div class='app'>
        <CnodeFilter value={cate.value} onChange={e=>{cate.value=e;page.value=1;}}  />
        <CnodeList list={list.value} />
        <CnodePage value={page.value} onChange={e=>page.value=e} />
      </div>
    )
  }
}
