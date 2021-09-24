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
// 编辑文章
export function editPost(data) {
  return request({
    url: '/post/edit',
    method: 'post',
    data
  })
}
// 更改文章状态
export function updateStatus(data) {
  return request({
    url: '/post/updateStatus',
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
// 删除文章
export function deletePost(data) {
  return request({
    url: '/post/delete',
    method: 'post',
    data
  })
}
