const ua = navigator.userAgent

const device_reg = [
    /(MI(.*|\s*)PAD).*/i,
    /(Android).*/i,
    /(iPhone|iPad|iPod|iOS).*/i,
]
const platform_reg = [
    /MicroMessenger/i,
    /MiuiBrowser/ig,
    /weibo/gi
]

export const device:any= {
    /*** 判断是否是iphone或者ipod ***/
    isIPhone_Pod: device_reg[0].test(ua),

    /* 判断是否是Android */
    isAndroid: device_reg[1].test(ua),

    /* 判断是否是IOS */
    isIOS: device_reg[2].test(ua),

}


export const platform = {
    /* 判断是否是微信平台 */
    isWeixin: platform_reg[0].test(ua),

    /* 判断是否是小米浏览器 */
    isMiBrowser: platform_reg[1].test(ua),

    /* 判断是否是微博 */
    isWeibo: platform_reg[2].test(ua)

}
