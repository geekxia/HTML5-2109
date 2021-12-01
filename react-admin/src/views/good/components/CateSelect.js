import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Select } from 'antd'

import { getAllCate } from '@/store/actions'
const { Option } = Select

export default ({value,onChange}) => {
  const cates = useSelector(store=>store.good.cates)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllCate())
  }, [])
  return (
    <div className="qf-cate-select">
      <Select
        allowClear
        value={value}
        onChange={val=>onChange(val)}
        style={{width:'100%'}}
      >
        <Option value=''>全部</Option>
        {
          cates.map(ele=>(
            <Option
              key={ele._id}
              value={ele.cate}
            >
              {ele.cate_zh}
            </Option>
          ))
        }
      </Select>
    </div>
  )
}
