import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} params
 * page	是	1	页码
 * pagesize	是	10	每页条数
 */
export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 新增角色
 * @param {*} data  {name,region}
 * @returns
 */
export const addRolesApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
