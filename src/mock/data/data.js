const Mock = require('mockjs')
const Random = Mock.Random

export const user = [{
  'username': '某总监',
  'mobile': '17413284681',
  'code': '1234',
  'integral': 11111,
  'Grades': '总监',
  'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
}]

export const productions = []
for (let i; i < 10; i++) {
  productions.push(Mock.mock(
    {
      'id': Random.guid(),
      'title': Random.cword('Q+时焕青春抚痕精华液123456776', 6, 15),
      'summary': Random.cword('预售4月30日发货】皱纹的小熨斗 青春的防腐剂', 18, 28),
      'price|110-500': 268,
      'image': 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
    }
  ))
}

export const cartList = [
  {
    'name': '美妆',
    'selectCategory': false,
    'items': [
      {
        'checked': false,
        'id': 1,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 299,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        id: 8,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 199,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      }
    ]
  },
  {
    'name': '私护类',
    'selectCategory': false,
    'items': [
      {
        'id': 2,
        'name': '商品名商品名商品名商品名商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 99,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        'id': 3,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 29,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      }
    ]
  },
  {
    'name': 'Q+',
    'selectCategory': false,
    'items': [
      {
        'checked': false,
        'id': 4,
        'name': '商品名商品名商品名商品名商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 249,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': true,
        'id': 5,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 90,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        'id': 6,
        'name': '商品名商品名商品名商品名商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 19,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      },
      {
        'checked': false,
        'id': 7,
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 69,
        'quantity': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      }
    ]
  }
]
for (let i; i < 4; i++) {
  cartList.push({
    'name': Random.cword('美妆私护Q+', 2, 4),
    'selectCategory|1': false,
    'items|1-10': [
      {
        'checked|1': false,
        'id': Random.guid(),
        'name': '商品名商品名商品名商品名',
        'summary': '简述简述简述简述简述简述',
        'price': 299,
        'quantity|1-5': 1,
        'image': 'http://p5vssvuk7.bkt.clouddn.com/WechatIMG5.jpeg'
      }
    ]
  })
}
