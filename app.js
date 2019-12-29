// 引入express
const express = require('express')
// 创建服务器
const app = express()
/*************************/
// 引入并解构
const {Wechat} = require('wechat-jssdk')
// 微型方案 填写微信的公众平台测试账号信息
const wechatConfig = {
    "appId": "wxbdfbccec04e2b92a",
    "appSecret": "85f4beb693313a5f3f4f4b8ca8ae941a"
}
// 创建Wechat实例
const wx = new Wechat(wechatConfig)

// 1. 配置模版引擎
app.set('view engine','xtpl')
// 2. 配置模版所在目录，类似vue中的@
app.set('views','./views')
// 配置静态资源，遇到静态资源自动去public找对应资源
app.use(express.static('./public'))

//  处理get请求
app.get('/',(req,res)=> {
    wx.jssdk.getSignature('http://localhost:3000/').then(signatureData => {
        // signatureData是对象形式的数据
        res.render('index',signatureData)
      });
    // 3.使用render渲染指定页面
    //使用render必须配置模版引擎,因为上面配置了模版目录，所以自动会去views下找index.xtpl
    // res.render('index')
})

// 监听3000端口
app.listen(3000,()=>{
    console.log('启动成功')
})