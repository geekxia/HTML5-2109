import { computed } from 'vue'

export default {
  props: {
    value: { type: Number, required: false, default: 1 },
    onChange: { type: Function }
  },
  setup(props) {
    const arr = computed(()=>{
      const v = props.value
      return v>3 ? [v-2,v-1,v,v+1,v+2] : [1,2,3,4,5]
    })
    const prev = ()=>{
      if(props.value===1) return alert('已经是第一页的')
      props.onChange(props.value-1)
    }
    return ()=>(
      <div className='pages'>
        <span
          onClick={prev}
          style={{cursor: props.value===1 ? "default": "pointer"}}
        >{'<<'}</span>
        {
          props.value>3
          && <span>...</span>
        }
        {
          arr.value.map(i=>(

            <span
              className={i===props.value?"on":""}
              onClick={()=>props.onChange&&props.onChange(i)}
            >{i}</span>)
          )
        }
        <span>...</span>
        <span onClick={()=>props.onChange&&props.onChange(props.value+1)}>{'>>'}</span>
      </div>
    )
  }
}
