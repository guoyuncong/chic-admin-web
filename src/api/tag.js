import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/post/tag/list',
    method: 'get',
    params
  })
}
