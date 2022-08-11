import request from '@/utils/request'

export const getCompanyApi=(id) => {
    return request({
        url: `/company/${id}`,

    })
}