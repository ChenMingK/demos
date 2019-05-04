// 卡片效果数据的抽象
export const flapCardList = [
  {
    r: 255,
    g: 102,
    _g: 102, // 要改动的颜色，原始值用于还原
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
    backgroundSize: '50% 50%', // 控制背景大小, 以父元素的百分比来设置图像的宽度和高度
    zIndex: 100, // 控制卡片位置
    rotateDegree: 0 // 转动角度
  },
  {
    r: 74,
    g: 171,
    _g: 171,
    b: 255,
    imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 99,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 198,
    _g: 198,
    b: 102,
    imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 98,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 97,
    rotateDegree: 0
  },
  {
    r: 59,
    g: 201,
    _g: 201,
    b: 22,
    imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 96,
    rotateDegree: 0
  }
]
