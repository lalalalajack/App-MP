/*
 * @Author: cwj
 * @Date: 2022-12-20 22:45:54
 * @LastEditors: cwj
 * @LastEditTime: 2022-12-21 03:21:22
 * @Introduce: 工具方法文件
 */
export function sliderEvent(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

export function getElementOffset(el:HTMLElement):{top:number;left:number}{
    //getClientRects获得el数组，如果数组长度为0，那么dom是有问题的，直接返回
    if(!el.getClientRects().length){
        return {
            top:0,
            left:0,
        };
    }

    //getBoundingClientRect获得dom矩形的位置，会返回el的位置信息和尺寸信息
    const rect = el.getBoundingClientRect();
    //el的所属document对象，defaultView属性会获得doc对象对应的Window对象
    //有些浏览器可能不支持defaultView对象，因此要加入非空断言
    const win = el.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        //非空断言
        //top:rect.top+win!.pageYOffset,
        left: rect.left + win.pageXOffset
    }
}