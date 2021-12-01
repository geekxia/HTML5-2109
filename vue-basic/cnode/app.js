
const app = new Vue({
  el: '#app',
  data: {
    cates: [
      { id: 1, label: '全部', tab: '' },
      { id: 2, label: '精华', tab: 'good' },
      { id: 3, label: '分享', tab: 'share' },
      { id: 4, label: '问答', tab: 'ask' },
      { id: 5, label: '招聘', tab: 'job' }
    ],
    tab: '',
    page: 1,
    articles: []
  },
  created() {
    this.init()
  },
  watch: {
    tab() {
      // 当文章类别发生变化时，要把page重置为1
      this.page=1
      this.init()
    },
    page() { this.init() }
  },
  computed: {
    artList () {
      const newList = this.articles.map(ele=>{
        // 去cates数据找到ele.tab字段所对应的中文
        const re = this.cates.find(ele2=>ele2.tab==ele.tab)
        // 添加一个自定义属性label，表示tab的中文名
        // 结论：如果top=true显示“置顶”，如果top=false&good=true显示“精华”
        ele['label'] = ele.top ? '置顶' : (ele.good ? '精华' : re.label)
        // 添加一个自定义字段，表示当前访问的是不是“全部”
        ele['first'] = this.tab==='' ? true : false
        return ele
      })
      console.log('newList', newList)
      return newList
    }
  },
  methods: {
    init() {
      const data = {
        mdrender: false,
        tab: this.tab,
        limit: 5,
        page: this.page
      }
      fetch('/api/v1/topics', 'GET', data).then(list=>{
        console.log('文章列表', list)
        //
        this.articles = list
      })
    }
  }
})
