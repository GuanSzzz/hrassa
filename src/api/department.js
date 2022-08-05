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
