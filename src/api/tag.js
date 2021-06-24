import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/post/tag/list',
    method: 'get',
    params
  })
}
