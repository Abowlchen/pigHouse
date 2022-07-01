import request from '@/utils/request'

export const userLogin = data => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export const userInfo = (authorization) => {
  return request({
    url: '/user',
    method: 'GET',
    data: {
      authorization
    }
  })
}
