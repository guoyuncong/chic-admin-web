import request from '@/utils/request'

// 分页查询文章列表
export function pagePost(params) {
  return request({
    url: '/post/page',
    method: 'get',
    params
  })
}

// 新增文章
export function addPost(data) {
  return request({
    url: '/post/save',
    method: 'post',
    data
  })
}
// 编辑文章
export function updatePost(data) {
  return request({
    url: '/post/update',
    method: 'post',
    data
  })
}

