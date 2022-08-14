import dayjs from 'dayjs'
// 此处的函数都是过滤器
export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
