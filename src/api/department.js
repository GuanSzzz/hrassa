import request from '@/utils/request'

/**
 * 查询企业的部门列表
 * @returns
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除部门
 * @param {*} id  部门id
 * @returns
 */
export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @param {*} data
 * code	 部门编码，同级部门不可重复
 *introduce	介绍
 *manager	负责人名称
 *name部门名称
 *pid	父级部门ID
 * @returns
 */
export const addDeptApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 根据ID查询部门详情
 * @param {*} id
 * @returns
 */
export const getDeptByIdApi = (id) => {
  return request({
    url: '/company/department/' + id
  })
}

/**
 * 修改部门详情
 * @param {*} id
 * @returns
 */
export const getEditDeptApi = (data) => {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}
