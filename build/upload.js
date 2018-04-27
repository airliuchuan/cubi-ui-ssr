const qiniu = require('qiniu')
const path = require('path')
const fs = require('fs')

const cdnConfig = require('../app.config').cdn

const {ak, sk, bucket} = cdnConfig

const mac = new qiniu.auth.digest.Mac(ak, sk);
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

const doUpload = (key, file) => {
  const options = {
    scope: bucket + ":" + key
  }
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken=putPolicy.uploadToken(mac);
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        console.log(err)
        return reject(err, 'doUploadErr-------------')
      }
      if (info.statusCode === 200) {
        resolve(body, 'dosuccess---------')
      } else {
        reject(body, 'bodyErr------------')
      }
    })
  })
}

const staticPath = path.join(__dirname, '../dist')

const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  // console.log(files)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    // console.log(key)
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    console.log(filePath)
    doUpload(key, filePath)
      .then(data => {
        console.log(data, 'succes----------')
      })
      .catch(err => {
        console.log(err, '---------------err')
      })
  })
}

uploadAll(staticPath)
