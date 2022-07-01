import request from '@/utils/request'

// 获取当前城市数据
export const getThisLocality = params => {
  return request({
    url: '/houses',
    method: 'GET',
    params
  })
}

// 获取房屋查询条件
export const getQueryCondition = (id) => {
  return request({
    url: '/houses/condition',
    method: 'GET',
    params: {
      id
    }
  })
}

// 获取房屋具体信息
export const getHomeSpecific = (id) => {
  return request({
    url: `/houses/${id}`,
    method: 'GET'

  })
}
