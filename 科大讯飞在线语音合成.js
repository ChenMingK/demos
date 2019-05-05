// 处理在线语音合成API
const express = require('express')         // express库
const Base64 = require('js-base64').Base64 // Base64库用来加密 cnpm i -S js-base64
const md5 = require('js-md5')              // 也是加密库 cnpm i -S js-md5
const qs = require('qs')                   // 对字符串进行处理，让其变为POST请求中可以识别的键值对形式 cnpm i -S qs
const http = require('http')               // http库 cnpm i -S http 发送HTTP请求
const resUrl = require('./const').resUrl
const fs = require('fs')                   // fs库，文件操作,内置库

const app = express()
// 监听的端口号，回调函数
const server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('server is listening at http://%s:%s', host, port)
})
const mp3FilePath = 'D:/software/servicetools/nginx-1.14.2/resource/mp3' // 这个是本地路径,本地存储文件
// voice
app.get('/voice', (req, res) => {
  createVoice(req, res)
})
function createVoice(req, res) {
  // const text = req.query.text // 文本
  const lang = 'cn' // 语言 --- 科大讯飞中文朗读比较好英文不太好
  const text = '测试科大讯飞在线语音合成api的功能,比如说，我们输入一段话,科大讯飞api会在线生成语音返回给客户端' // 不超过1000字
  let engineType = 'intp65' // s引擎类型
  /* if (lang.toLowerCase() === 'en') {
    engineType = 'intp65_en'
  } */
  let speed = '30' // 朗读速度，可调节
  // 参数具体参考开发文档
  const voiceParam = {
    auf: 'audio/L16;rate=16000',  // 音频采样率
    aue: 'lame',                  // 音频编码 lame:mp3格式
    voice_name: 'xiaoyan',        // 发音人
    speed,                        // 语速
    volume: '50',                 // 音量
    pitch: '50',                  // 音高
    engine_type: engineType,      // 引擎类型
    text_type: 'text'             // 文本类型
  }
  // 认证部分
  console.log(new Date().getTime() / 1000)
  const currentTime = Math.floor(new Date().getTime() / 1000) // /1000转化为UTC时间戳, floor转化为整型
  const appId = '5ca896ce'
  const apiKey = 'dd3f9e9e19ac54c31b82b58fd3a23ecc' // 看自己的API Key
  // X-Param头Base64加密 使用Base64的encode方法
  const xParam = Base64.encode(JSON.stringify(voiceParam))
  // X-CheckSum令牌，计算方法：MD5(apiKey + curTime + param)，
  // 三个值拼接的字符串，进行MD5哈希计算（32位小写）
  const checkSum = md5(apiKey + currentTime + xParam)
  const headers = {}
  // 接口统一为 UTF-8 编码,请求方式为POST
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  headers['X-Param'] = xParam
  headers['X-Appid'] = appId
  headers['X-CurTime'] = currentTime
  headers['X-CheckSum'] = checkSum
  headers['X-Real-Ip'] = '127.0.0.1'  // IP地址

  // qs库处理文本
  const data = qs.stringify({
    text: text
  })

  // POST http[s]://api.xfyun.cn/v1/service/v1/tts HTTP/1.1
  // Content-Type:application/x-www-form-urlencoded; charset=utf-8
  // 请求的参数
  const options = {
    host: 'api.xfyun.cn',
    path: '/v1/service/v1/tts',
    method: 'POST',
    headers
  }
  // 发送HTTP请求
  const request = http.request(options, response => {
    // console.log(response)
    let mp3 = ''
    const contentLength = response.headers['content-length']
    response.setEncoding('binary') // 将编码格式定为二进制文件
    response.on('data', data => {
      // console.log(data) // Buffer
      mp3 += data
      const process = data.length / contentLength * 100
      const percent = parseInt(process.toFixed(2))
      console.log(percent)
    })
    // end回调
    response.on('end', () => {
      // console.log(mp3) // 如果返回的数据有illegal client_ip的话把这个ip添加到IP白名单中
      // 有可能返回一个text-html而不是audio，404?

      const fileName = new Date().getTime() // 以时间戳作为文件名保证不重复
      const filePath = `${mp3FilePath}/${fileName}.mp3` // 路径+文件名 注意路径是本地路径,最后是文件格式
      const downloadUrl = `${resUrl}/mp3/${fileName}.mp3` // 下载路径，返回给前端，前端可通过该路径下载
      // 路径，数据，文件类型
      fs.writeFile(filePath, mp3, 'binary', err => {
        if (err) {
          res.json({
            error: 1,
            msg: '下载失败'
          })
        } else {
          res.json({
            error: 0,
            msg: '下载成功',
            path: downloadUrl
          })
        }
      })
      // console.log(filePath, downloadUrl)
    })
  })
  request.write(data)
  request.end()
}