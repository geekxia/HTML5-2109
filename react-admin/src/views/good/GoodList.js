import { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Input, DatePicker, Button, Table, Space, Dropdown, Menu } from 'antd'
import { RedoOutlined, ColumnHeightOutlined, SettingOutlined } from '@ant-design/icons'
import './style.scss'

import moment from 'moment'
import CateSelect from './components/CateSelect'
import { getGoodList } from '@/store/actions'

export default () => {
  const [size, setSize] = useState('middle')
  // 列表的查询入参
  const [filter, setFilter] = useState({
    name: '',
    cate: '',
    page: 1,
    size: 2
  })
  const tableList = useSelector(store=>store.good.list)
  const total = useSelector(store=>store.good.total)
  const cates = useSelector(store=>store.good.cates)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(()=>{
    dispatch(getGoodList(filter))
  }, [filter])

  const columns = useMemo(()=>(
    [
      {
        title: '商品',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (name, row) => (
          <div className='good'>
            <img src={'http://localhost:9999'+row.img} alt='qf'/>
            <div>{name}</div>
          </div>
        )
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        sorter: (a,b)=>(a.price-b.price),
        render: price=>(<div>{`￥${price.toFixed(2)}`}</div>)
      },
      {
        title: '品类',
        dataIndex: 'cate',
        key: 'cate',
        align: 'center',
        render: cate=>{
          const re = cates.find(ele=>ele.cate===cate)
          return <div>{re?re.cate_zh:''}</div>
        }
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        render: status => (status ? '正常' : '已下架')
      },
      {
        title: '时间',
        key: 'create_time',
        dataIndex: 'create_time',
        align: 'center',
        render: t => (
          <>
            <div>{moment(t).format('MM月DD日')}</div>
            <div>{moment(t).format('HH:mm')}</div>
          </>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (text, row) => (
          <Space size="middle">
            <Button danger size='small'>删除</Button>
            <Button type="primary" size='small' onClick={()=>editRow(row)}>编辑</Button>
          </Space>
        ),
      },
    ]
  ), [tableList, cates])

  // 【列表隐形bug】：如果搜索字段变化的不是page，都要把page变成1
  // 手动取“受控表单”的值
  const filterChange = (k,v) => {
    setFilter({...filter, [k]:v, page: 1})
  }
  // 手动取分页的页码和size
  const paginationChange = ({page,size}) => {
    if (page!==filter.page) {
      setFilter({...filter, page, size})
    } else {
      setFilter({...filter, page:1, size})
    }
  }

  // 跳转去编辑
  const editRow = row => {
    // 路由传参：路由传参、query传参
    history.push('/good/edit/'+row._id)
  }

  return (
    <div className="qf-goodlist">
      <div className='filter'>
        <Row align='middle'>
          <Col span={2}>
            <span>商品名称：</span>
          </Col>
          <Col span={4}>
            <Input
              placeholder="商品搜索"
              allowClear
              value={filter.name}
              onChange={e=>filterChange('name',e.target.value)}
            />
          </Col>
          <Col span={2}>
            <span>品类：</span>
          </Col>
          <Col span={4}>
            <CateSelect
              value={filter.cate}
              onChange={v=>filterChange('cate',v)}
            />
          </Col>
          <Col span={2}>
            <span>上架时间：</span>
          </Col>
          <Col span={4}>
            <DatePicker style={{width:'100%'}} />
          </Col>
          <Col span={2} offset={2}>
            <Button type="primary" onClick={()=>history.push('/good/add')}>添加商品</Button>
          </Col>
        </Row>
      </div>
      <div className='table'>
        <div className='table-title'>
          <Row>
            <Col span={2}>查询表格</Col>
            <Col span={4} offset={18} style={{textAlign:'right'}}>
              <RedoOutlined />
              <Dropdown overlay={
                <Menu>
                  <Menu.Item>
                    <span onClick={()=>setSize('default')}>默认</span>
                  </Menu.Item>
                  <Menu.Item>
                    <span onClick={()=>setSize('middle')}>中等</span>
                  </Menu.Item>
                  <Menu.Item>
                    <span onClick={()=>setSize('small')}>紧凑</span>
                  </Menu.Item>
                </Menu>
              } placement="bottomLeft" arrow>
                <ColumnHeightOutlined />
              </Dropdown>
              <SettingOutlined />
            </Col>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={tableList}
          rowKey={'_id'}
          size={size}
          rowSelection={{type:'checkbox'}}
          pagination={{
            total: total,
            showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共${total}条`,
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: filter.size,
            current: filter.page,
            pageSize: filter.size,
            onChange: (page,size)=>paginationChange({page,size}),
            pageSizeOptions: [2,5,10,15]
          }}
        />
      </div>
    </div>
  )
}
