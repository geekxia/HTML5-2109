Vue.component('qf-list', {
  template: `
  <div class='article-list'>
    <div class='article' v-for='item in data'>
      <img
        :src='item.author.avatar_url'
        :title='item.author.loginname'
      />
      <div class='num'>
        <span v-text='item.reply_count'></span>
        <span>/</span>
        <span v-text='item.visit_count'>200</span>
      </div>
      <span
        :class='{
          "label": true,
          "on": (item.top || item.good)
        }'
        v-text='item.label'
        v-if='(item.top || item.good || item.first)'
      >
      </span>
      <span class='title' v-text='item.title'></span>
      <span class='time' v-cloak>{{item.last_reply_at|time}}</span>
    </div>
  </div>
  `,
  props: {
    data: { type: Array, required: false, default: [] }
  },
  updated() { console.log('处理后文章列表', this.data) },
  filters: {
    // 用过滤器处理时间字符串
    time (val) {
      const s = (Date.now() - Date.parse(val)) / 1000  // 单位：秒
      return (s<60)
          ? `${s}秒前`
          : (s/60<60)
              ? `${Math.floor(s/60)} 分钟前`
              : (s/60/60)<24
                ? `${Math.floor(s/60/60)} 小时`
                : (s/60/60/24)<30
                  ? `${Math.floor(s/60/60/24)} 天前`
                  : (s/60/60/24/30)<12
                    ? `${Math.floor(s/60/60/24/30)} 月前`
                    : `${Math.floor(s/60/60/24/30/12)} 年前`
    }
  }
})
