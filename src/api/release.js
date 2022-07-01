import request from '@/utils/request'

// 发布房源
export const setHomeResource = data => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}

// 小区关键词查询  需要城市名称与id
export const getAreaCommunity = params => {
  return request({
    url: '/area/community',
    method: 'GET',
    params
  })
}

// 发布房屋所需条件
export const getHousesParams = () => {
  return request({
    url: '/houses/params',
    method: 'GET'
  })
}

// 发布房屋所需条件
export const setUserHouses = data => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}

// 上传房屋图像
export const upLodingImg = data => {
  return request({
    url: '/houses/image',
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data'
    },
    data
  })
}
