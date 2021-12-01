import { useSelector } from '@/utils/hooks'

export default {
  props: {
    value: { type: String, default: '' },
    onChange: { type: Function }
  },
  setup(props) {
    const cates = useSelector(state=>state.cnode.cates)
    return ()=>(
      <div className='cates'>
      {
        cates.map(ele=>(
          <span
            className={ele.tab === props.value ? "on" : ""}
            onClick={()=>props.onChange&&props.onChange(ele.tab)}
          >
          {ele.label}
          </span>
        ))
      }
      </div>
    )
  }
}
