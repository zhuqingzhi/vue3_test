import request from '@/utils/request'

export default {
    login(data) {
        return request({
            url: '/local/login',
            method: 'post',
            data
        })
    },
    // 获取公钥
    getPublicKey() {
        return request({
            url: '/local/rsa',
            method: 'get',
        })
    },
    // 发送会话密钥给服务端
    sendSessionKey(data) {
        return request({
            url: '/local/rsa',
            method: 'post',
            data
        })
    }
}