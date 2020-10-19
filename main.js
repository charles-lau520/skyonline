import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.serverURL = "https://www.imovietrailer.com/superhero"; //生产环境的全局变量
//const serverURL = "https://www.imovietrailer-dev.com/superhero"; //开发环境的全局变量

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
