import request from '@/utils/request'
export const getswiper = () => {
  return request({
    url: '/home/swiper',
    method: 'GET'
  })
}
