import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'

// Dùng control DX
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box';
import DxTagBox from 'devextreme-vue/tag-box';

// Dùng router vue
import { createRouter, createWebHistory } from 'vue-router'
import TheUserDetail from "./views/TheUserDetail.vue"
import TheRole from "./views/TheRole.vue"
import TheMultipleUser from "./views/TheMultipleUser.vue"
import TheShareLink from "./views/TheShareLink.vue"

const routes = [
    { path: '/user', component: TheUserDetail },
    { path: '/permission', component: TheRole },
    { path: '/user-group', component: TheMultipleUser },
    { path: '/connect', component: TheShareLink },
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const app = createApp(App);

//Dùng control DX
app.component("DxSelectBox", DxSelectBox);
app.component("DxCheckBox", DxCheckBox);
app.component("DxTagBox", DxTagBox);

app.use(router); // router
app.mount('#app');