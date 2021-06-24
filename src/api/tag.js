import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/post/tag/list',
    method: 'get',
    params
  })
}

export function deleteTag(data) {
  return request({
    url: '/post/tag/delete',
    method: 'post',
    data
  })
}
