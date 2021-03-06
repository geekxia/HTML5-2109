const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const v = '/apix/v1'

const U = require('../controllers/element/user')
const G = require('../controllers/element/good')
const UP = require('../controllers/upload')


// RESTful API 规范（一种需要鉴权，一种不需要鉴权）
router
.get(`${v}/getGoodList`, G.getGoodList)
.get(`${v}/getAllCate`, G.getAllCate)
.post(`${v}/updateGood`, G.updateGood)
.post(`${v}/delGood`, G.delGood)
.post(`${v}/upload/img`, UP.uploadImg)
.get(`${v}/getGoodInfo`, G.getGoodInfo)
.post(`${v}/login`, U.login)
.get(`${v}/getUserInfo`, checkToken, U.getUserInfo)


module.exports = router
