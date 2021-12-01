```
.app {
  width: 750px;
  margin: 0 auto;
}
[v-cloak] {
  display: none;
}
.head {
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

/* 加载中 */
.loading {
  text-align: center;
  padding-top: 30px;
}
.loading img {
  display: inline-block;
  width: 150px;
  height: 150px;
}


/* 文章列表项 */
.article-list {
  margin: 25px 0;
}
.article {
  height: 50px;
  line-height: 50px;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  font-size: 14px;
  border-bottom: 1px solid rgba(245,245,245,1);
  cursor: pointer;
}
.article:hover {
  background: rgba(245,245,245,1);
}
.article>img {
  float: left;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
}
.article>span {
  float: left;
}
.article div.num {
  color: #666666;
  float: left;
  width: 90px;
  text-align:left;
  margin-left: 10px;
}
.article span.label {
  height: 20px;
  padding: 0 2px;
  color: black;
  background: #ccc;
  line-height: 20px;
  margin: 15px 10px;
}
.article span.label.on {
  background: #80bd01;
  color: white;
}
.article span.title {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 480px;
}
.article span.time {
  float: right;
  font-size: 12px;
}


/* 分页 */
.pages {
  line-height: 50px;
  text-align: right;
}
.pages>span {
  cursor: pointer;
  /* padding-left: 10px; */
  display: inline-block;
  width: 34px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  border: 1px solid #ccc;
  margin: 0;
}
.pages>span.on {
  background: rgb(128, 189, 1);
  color: white;
}


/* 分类筛选 */
.cates {
  padding: 5px 20px;
  background-color: rgb(246, 246, 246);
}
.cates span {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  margin-right: 25px;
  color: rgb(128, 189, 1);
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
}
.cates span.on {
  background-color: rgb(128, 189, 1);
  color: white;
  border-radius: 3px;
}
```

```
<div class='cates'>
    <span>
    </span>
  </div>
```

```
<div class='pages'>
    <span>
      <<
    </span>

    <span>...</span>

    <span></span>

    <span>...</span>
    <span>>></span>
  </div>
```

```
<div class='article-list'>
    <div class='article'>
      <img />
      <div class='num'>
        <span></span>
        <span>/</span>
        <span></span>
      </div>
      <span></span>
      <span class='title'></span>
      <span class='time'></span>
    </div>
  </div>
```