import request from '@/utils/request'

// 分页查询附件列表
export function pageAttachment(params) {
  return request({
    url: '/system/attachment/page',
    method: 'get',
    params
  })
}

// 附件详情
export function detailAttachment(params) {
  return request({
    url: '/system/attachment/detail',
    method: 'get',
    params
  })
}

// 删除附件
export function deleteAttachment(data) {
  return request({
    url: '/system/attachment/delete',
    method: 'post',
    data
  })
}

