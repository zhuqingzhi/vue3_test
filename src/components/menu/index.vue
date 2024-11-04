<template>
<!-- project description is here-->
  <div class="menu">
    <section>测试</section>
    <div class="content1 font1">
        &#x0073;&#x0073;&#x0072;&#x6e32;&#x67d3;&#x5185;&#x5bb9;
    </div>
    <div class="content1 font2">
        &#x0073;&#x0073;&#x0072;&#x6e32;&#x67d3;&#x5185;&#x5bb9;
    </div>
    <hr>
    <h2>基准字体</h2>
    <div class="font1" v-html="ssrContent[nowType]">
    </div>
    <h2>font20 
    <el-button type="primary" @click="requestSsr(20)">请求服务端渲染</el-button>
    </h2>
    <div class="font20" v-html="ssrContent[20]">
    </div>
    <h2>font30<el-button type="primary" @click="requestSsr(30)">请求服务端渲染</el-button></h2>
    <div class="font30" v-html="ssrContent[30]">
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive,  onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'
const router = useRouter()
const activeTab = ref(0)
const nowType=ref('20')
const ssrContent = ref({
    20: '',
    30:''
})
const requestSsr = (type) => {
    axios.get('/local/ssr/document?type='+type).then(res => {
        ssrContent.value[type]=res.data
    })
    nowType.value=type   
}

onMounted(() => {

})

</script>
<style scoped lang='scss'>
.menu{
    width: 100%;
    height: 100vh;
    padding:10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    .nav{
        a{
            padding:3px 6px;
            text-decoration: none;
            ;&:hover{
                text-decoration: underline;
            }
            ;&.active{
                background: lightblue;
                color:#fff;
            }
        }
    }
    .content{
        flex:1;
        padding-top: 20px;
    }
}
</style>