Vue.component('qf-page', {
  template: `
  <div class='pages'>
    <span
      :style='{"cursor":value===1?"default":"pointer"}'
      @click='$emit("input", 1)'
    ><<</span>
    <span v-if='value>3'>...</span>
    
    <span
      v-for='p in pages'
      v-text='p'
      :class='{"on": value===p}'
      @click='$emit("input", p)'
    >1</span>

    <span>...</span>
    <span @click='$emit("input", value+1)'>>></span>
  </div>
  `,
  props: {
    value: { type: Number, required: false, default: 1 }
  },
  computed: {
    // 关于页码生成的推导：
    // page=1  << 1 2 3 4 5 ... >>
    // page=2  << 1 2 3 4 5 ... >>
    // page=3  << 1 2 3 4 5 ... >>
    // page=4  << ... 2 3 4 5 6 ... >>
    // page=n  << ... n-2 n-1 n n+1 n+2 ... >>
    pages() {
      const p = this.value
      return p>3 ? [p-2,p-1,p,p+1,p+2] : [1,2,3,4,5]
    }
  }
})
