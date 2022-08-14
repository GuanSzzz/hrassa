// 自定义指令的文件夹，全部都是自定义指令
// 自定义指令，判断图片是否有，没有自动补全
// 参数1：自定义指令的名字 这里不需要加V-，但是在使用的时候要加
// 参数2：是配置对象
export const imgError = {
  // 当被绑定的元素插入到DOM中时
  // el:被绑定的标签
  // value：结构的bind,是一个对象？
  inserted(el, { value }) {
    // 聚焦元素
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  update(el, { value }) {
    // 聚焦元素
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  }
}
