import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '@/components/common/Toast'
import MyDialog from '@/components/common/Dialog'
import Popup from '@/components/common/Popup'

// 插件注入
Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.createAPI(MyDialog, true)
