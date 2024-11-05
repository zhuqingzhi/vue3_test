import api from "@/api"
import { ref } from "vue"
import { ElMessage } from 'element-plus'
import JSEncrypt from "jsencrypt"
import { aesEncrypt } from "@/utils/aes"
export default () => {
    const publicKey = ref('')
    const sessionKey = ref('')
    const key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    async function getPublicKey() {
        // 获取pubkey
        const res = await api.getPublicKey()
        if (res.code !== 0) {
            return ElMessage({
                message: '获取公钥失败',
                type: 'error'
            })
        } else {
            publicKey.value=res.data
        }
    }
    function generateSessionKey() {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(publicKey.value)
        // 加密会话key
        sessionKey.value = encrypt.encrypt(key.toString())
        console.log('加密会话key',sessionKey.value)
        return sessionKey.value
    }
    function encryptData(data) {
        if (typeof data !== 'string') {
            console.error('数据格式不为字符串')
        }
        return aesEncrypt(data,key)
    }
    getPublicKey()
    return {
        publicKey,
        sessionKey,
        generateSessionKey,
        encryptData
    }
}