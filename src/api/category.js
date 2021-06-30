import request from '@/utils/request'

// 分页查询分类列表
export function pageCategory(params) {
  return request({
    url: '/post/category/page',
    method: 'get',
    params
  })
}
// 树结构
export function treeCategory(params) {
  return request({
    url: '/post/category/tree',
    method: 'get',
    params
  })
}
// 新增分类
export function addCategory(params) {
  return request({
    url: '/post/category/save',
    method: 'post',
    params
  })
}
// 更新分类
export function updateCategory(params) {
  return request({
    url: '/post/category/update',
    method: 'post',
    params
  })
}
// 删除分类
export function deleteCategory(params) {
  return request({
    url: '/post/category/delete',
    method: 'post',
    params
  })
}

