// 封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category'
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import { onMounted, ref } from 'vue'

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => {
        getCategory()
    })

    // 目标: 路由参数变化的时候 可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        console.log('路由变化了')
        // 存在问题: 使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}