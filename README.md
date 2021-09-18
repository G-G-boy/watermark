# watermark

给你的页面添加水印

# Install

```sh
npm install --save gavin-watermark // or yarn add -S gavin-watermark
```

# Usage

```ts
import watermark from 'gavin-watermark';

watermark(
  {
    content: 'hi, gavin',
  },
  //如果想要将水印插入到某个div，默认是body
  document.getElementById('someId'),
);
```

# Options

| option     |                       | 默认值                                         |
| ---------- | --------------------- | ---------------------------------------------- |
| content    | 水印字样              | ""                                             |
| width      | 水印宽度              | 160                                            |
| height     | 水印长度              | 90                                             |
| x          | 水印起始位置 x 轴坐标 | 20                                             |
| y          | 水印起始位置 Y 轴坐标 | 20                                             |
| rows       | 水印行数              | 10                                             |
| cols       | 水印列数              | 10                                             |
| colSpace   | 水印 x 轴间隔         | 0                                              |
| rowSpace   | 水印 y 轴间隔         | 50                                             |
| color      | 水印字体颜色          | rgba(207.0/255.0, 207.0/255.0, 207.0/255.0, 1) |
| opacity    | 水印透明度            | 0.2                                            |
| fontSize   | 水印字体大小          | 16px                                           |
| fontFamily | 水印字体              | ''                                             |
| rotate     | 水印倾斜度数          | 20                                             |
