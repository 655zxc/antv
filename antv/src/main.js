import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false


import 'ant-design-vue/dist/antd.css';
import Button from 'ant-design-vue/lib/button';
Vue.component(Button.name, Button);

import Card from 'ant-design-vue/lib/card';
Vue.component(Card.name, Card);

import Input from 'ant-design-vue/lib/input';
Vue.component(Input.name, Input);




new Vue({
  render: h => h(App),
}).$mount('#app')
