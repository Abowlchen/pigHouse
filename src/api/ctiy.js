import request from '@/utils/request'

export const getAllCity = (level) => {
  return request({
    url: '/area/city',
    methods: 'GET',
    params: {
      level
    }
  })
}

export const getHotCity = () => {
  return request({
    url: '/area/hot',
    method: 'GET'
  })
}

export const getHomeGroups = (area) => {
  return request({
    url: '/home/groups',
    method: 'GET',
    params: {
      area
    }
  })
}
