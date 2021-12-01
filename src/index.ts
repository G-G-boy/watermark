export type Options = {
    /**
     * 水印字样
     */
    content: string;
    /**
     * 水印宽度
     */
    width: number;
    /**
     * 水印长度
     */
    height: number;
    /**
     * 水印起始位置x轴坐标
     */
    x: number;
    /**
     * 水印起始位置Y轴坐标
     */
    y: number;
    /**
     * 水印行数
     */
    rows: number;
    /**
     * 水印列数
     */
    cols: number;
    /**
     * 水印x轴间隔
     */
    colSpace: number;
    /**
     * 水印y轴间隔
     */
    rowSpace: number;
    /**
     * 水印字体颜色
     */
    color: string;
    /**
     * 水印透明度
     */
    opacity: number;
    /**
     * 水印字体大小
     */
    fontSize: string;
    /**
     * 水印字体
     */
    fontFamily: string;
    /**
     * 水印倾斜度数
     */
    rotate: number;
    /**
     * 页面宽度
     */
    pageWidth?: number;
    /**
     * 页面高度
     */
    pageHeight?: number;
};

const defaultOptions: Options = {
    content: '',
    x: 20,
    y: 20,
    rows: 10,
    cols: 10,
    colSpace: 0,
    rowSpace: 50,
    color: 'rgba(207.0/255.0, 207.0/255.0, 207.0/255.0, 1)',
    opacity: 0.2,
    fontSize: '16px',
    fontFamily: '',
    width: 160,
    height: 90,
    rotate: 20,
};

const watermark = (options: Partial<Options>, container: Element = document.body) => {
    const megerOptions = {...defaultOptions, ...options};

    const fragment = document.createDocumentFragment();

    //获取页面最大宽度
    const page_width =
        megerOptions.pageWidth ||
        window.innerWidth - 20 ||
        document.documentElement.clientWidth - 20 ||
        document.body.clientWidth - 20;
    //获取页面最大长度
    const page_height =
        megerOptions.pageWidth ||
        window.innerHeight - 20 ||
        document.documentElement.clientHeight - 20 ||
        document.body.clientHeight - 20;
    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (
        megerOptions.cols === 0 ||
        megerOptions.x +
            megerOptions.width * megerOptions.cols +
            megerOptions.colSpace * (megerOptions.cols - 1) >
            page_width
    ) {
        megerOptions.cols =
            (page_width - megerOptions.x + megerOptions.colSpace) /
            (megerOptions.width + megerOptions.colSpace);
        megerOptions.colSpace =
            (page_width - megerOptions.x - megerOptions.width * megerOptions.cols) /
            (megerOptions.cols - 1);
    }
    //  //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (
        megerOptions.rows == 0 ||
        megerOptions.y +
            megerOptions.height * megerOptions.rows +
            megerOptions.rowSpace * (megerOptions.rows - 1) >
            page_height
    ) {
        megerOptions.rows =
            (page_height - megerOptions.y + megerOptions.rowSpace) /
            (megerOptions.height + megerOptions.rowSpace);
        megerOptions.rowSpace =
            (page_height - megerOptions.y - megerOptions.height * megerOptions.rows) /
            (megerOptions.rows - 1);
    }

    let x;
    let y;
    for (let i = 0; i < megerOptions.rows; i++) {
        y = megerOptions.y + (megerOptions.rowSpace + megerOptions.height) * i;
        for (let j = 0; j < megerOptions.cols; j++) {
            x = megerOptions.x + (megerOptions.width + megerOptions.colSpace) * j;

            const mask_div = document.createElement('div');
            mask_div.id = 'mask_div' + i + j;
            mask_div.appendChild(document.createTextNode(megerOptions.content));
            //@ts-ignore
            mask_div.style.webkitTransform = 'rotate(-' + megerOptions.rotate + 'deg)';
            //@ts-ignore
            mask_div.style.MozTransform = 'rotate(-' + megerOptions.rotate + 'deg)';
            //@ts-ignore
            mask_div.style.msTransform = 'rotate(-' + megerOptions.rotate + 'deg)';
            //@ts-ignore
            mask_div.style.OTransform = 'rotate(-' + megerOptions.rotate + 'deg)';
            //@ts-ignore
            mask_div.style.transform = 'rotate(-' + megerOptions.rotate + 'deg)';
            mask_div.style.visibility = '';
            mask_div.style.position = 'fixed';
            mask_div.style.left = x + 'px';
            mask_div.style.top = y + 'px';
            mask_div.style.overflow = 'hidden';
            mask_div.style.zIndex = '9999';
            //@ts-ignore
            mask_div.style.opacity = megerOptions.opacity;
            mask_div.style.fontSize = megerOptions.fontSize;
            mask_div.style.fontFamily = megerOptions.fontFamily;
            mask_div.style.color = megerOptions.color;
            mask_div.style.textAlign = 'center';
            mask_div.style.width = megerOptions.width + 'px';
            mask_div.style.height = megerOptions.height + 'px';
            mask_div.style.display = 'block';
            // 增加div点击穿透属性
            mask_div.style.pointerEvents = 'none';
            fragment.appendChild(mask_div);
        }
    }
    container.appendChild(fragment);

    return function removeWatermark() {
        container.innerHTML = '';
    };
};

export default watermark;
