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
// 设置文章
export function setPost(data) {
  return request({
    url: '/post/set',
    method: 'post',
    data
  })
}
// 文章详情
export function detailPost(params) {
  return request({
    url: '/post/detail',
    method: 'get',
    params
  })
}
