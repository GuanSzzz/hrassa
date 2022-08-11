import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns promise
 */
export const getEmployessApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 *  获取员工详细列表
 * @param {*} params
 * @returns
 */
export const getEmployessInfoApi = (params) => {
  return request({
    url: '/sys/user/',
    method: 'GET',
    params
  })
}
