import request from '@/utils/request'

// 分页查询分类列表
export function pagePost(params) {
  return request({
    url: '/post/page',
    method: 'get',
    params
  })
}

