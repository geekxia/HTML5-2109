function time(val) {
  var s = Math.floor((Date.now()-Date.parse(val))/1000) // 单位：秒
  // 分钟前  小时前  天前  月前  年前
  var d = s/(60*60*24) // 单位：天
  return d>=30 ? (d/30>12 ? (Math.floor(d/(30*12))+'年前') : Math.floor(d/30)+'月前' )
  : (d<1 ? (d*24<1 ? (Math.floor(d*24*60)+'分钟前'): (Math.floor(d*24)+'小时前')) : Math.floor(d)+'天前')
}

export default {
  props: {
    list: { type: Array, default: [] }
  },
  setup(props) {
    // const { list } = props
    return ()=>(
      <div className='article-list'>
      {
        props.list.map(row=>(
          <div className='article'>
            <img src={row.author.avatar_url} />
            <div className='num'>
              <span>{row.reply_count}</span>
              <span>/</span>
              <span>{row.visit_count}</span>
            </div>
            <span className={`label ${(row.top || row.good)?"on":""}`}>
            {
              (row.top || row.good || (!["share","ask","good","job"].includes(row.tab)))
              && row.label
            }
            </span>
            <span className='title'>{row.title}</span>
            <span className='time'>{time(row.last_reply_at)}</span>
          </div>
        ))
      }
      </div>
    )
  }
}

// className='{
//   label: true,
//   on: (row.top || row.good)
// }'
