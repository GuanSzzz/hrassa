import request from '@/utils/request'

/**
 * 登录
 * @param {Object} data password mobile
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户基本资料
 * @returns  promise
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取员工基本信息
 * @param {*} id userID
 * @returns
 */
export const getUserImg = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
