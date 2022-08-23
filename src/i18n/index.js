import Vue from 'vue'
import en from './message/en'
import zh from './message/zh'
import Cookie from 'js-cookie'

// 引入语言环境
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 准备翻译的语言环境信息
export const messages = {
  en,
  zh
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: Cookie.get('lang') || 'zh', // 设置地区
  messages // 设置地区信息
})
export default i18n
