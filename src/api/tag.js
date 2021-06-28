import request from '@/utils/request'

export function getTagList(params) {
  return request({
    url: '/post/tag/list',
    method: 'get',
    params
  })
}

export function addTag(data) {
  return request({
    url: '/post/tag/save',
    method: 'post',
    data
  })
}

export function deleteTag(data) {
  return request({
    url: '/post/tag/delete',
    method: 'post',
    data
  })
}
