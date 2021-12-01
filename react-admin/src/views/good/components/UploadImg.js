import { Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
)

// value,onChange 是 Form.Item 给的
export default ({value,onChange}) => {

  // 上传前的检测
  const checkImg = (e) => {
    // console.log('上传前的检测', e)
    if (e.size <= 1024*1024*2) {
      return true
    } else {
      message.error('图片过大')
      return false
    }
  }

  const imgSuccess = e => {
    console.log('e', e)
    if (e.file && e.file.response && e.file.response.err===0) {
      // 把后端返回的图片路径回传给Form.Item
      onChange(e.file.response.data.img)
    } else if (e.file && e.file.response) {
      // 上传失败
      message.error(e.file.response.msg)
    }
  }

  return (
    <div className='qf-upload'>
      { /*action是图片上传的url路径，name是后端取图片所用的名字*/ }
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        name="good"
        action="http://localhost:9090/apix/v1/upload/img"
        onChange={imgSuccess}
        beforeUpload={checkImg}
      >
        {
          value
          ? <img src={'http://localhost:9999'+value} alt="avatar" style={{ width: '100%' }} />
          : uploadButton
        }
      </Upload>
    </div>
  )
}
