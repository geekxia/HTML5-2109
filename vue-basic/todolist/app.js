const app = new Vue({
  data: {
    task: '',
    list1: [],
    list2: [],
    count: 0
  },
  el: '#app',
  created() {
    this.load()
  },
  watch: {
    count() {
      this.load()
    }
  },
  methods: {
    load() {
      fetch('/todo/getMyTodos', 'GET').then(res=>{
        console.log('调接口成功===', res)
        this.list1 = res.undone
        this.list2 = res.done
      })
    },
    addTodo() {
      if(this.task) {
        // this.list1.push({id:Date.now(),task:this.task})
        // this.task = ''
        fetch('/todo/addTodo', 'POST', {task: this.task}).then(()=>{
          console.log('添加任务成功')
          this.task = ''
          this.count++
        })
      }
    },
    moveList(item, flag) {
      // if (flag) {
      //   const arr = this.list2.splice(idx, 1)
      //   this.list1 = [...this.list1, ...arr]
      // } else {
      //   const arr = this.list1.splice(idx, 1)
      //   this.list2 = [...this.list2, ...arr]
      // }
      fetch('/todo/changeTodoStatus', 'GET', {id:item._id,status:flag?0:1}).then(()=>this.count++)
    },
    removeItem(item, flag) {
      // if(flag) {
      //   this.list2.splice(idx,1)
      // }else{
      //   this.list1.splice(idx, 1)
      // }
      fetch('/todo/deleteTodo','GET',{id:item._id}).then(()=>this.count++)
    },
    editItem(item) {
      fetch('/todo/editTodo', 'POST', {id:item._id, task:item.task}).then(()=>this.count++)
    }
  }
})
