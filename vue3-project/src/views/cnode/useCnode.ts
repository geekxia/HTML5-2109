import { ref, computed, watchEffect } from 'vue'
import { useDispatch, useSelector } from '@/utils/hooks'

export default function useCnode() {
  const cate = ref('')
  const page = ref(1)

  const dispatch = useDispatch()
  watchEffect(()=>dispatch('cnode/getList', {tab: cate.value,limit:5,page:page.value}))

  const cates = useSelector(state=>state.cnode.cates)
  const newList = computed(()=>{
    let list = useSelector(state=>state.cnode.list)
    list.map((ele,idx)=>{
      // 根据当前ele.tab，去this.cates找到对应的中文
      // var re = this.cates.find(ele2=>ele2.tab = ele.tab)
      var re = cates.filter(e=>e.tab===ele.tab)
      console.log('re', re)
      list[idx]['label'] = ele.top ? "置顶" : (ele.good ? "精华": (re[0]?.label||""))
      // 当tab是“全部”时，我就手动修改后端给的tab，将其变成""
      list[idx]['tab'] = cate.value==="" ? "" : ele.tab
    })
    return list
  })

  return [cate, page, newList]
}
