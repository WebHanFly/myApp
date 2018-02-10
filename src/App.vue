<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">卖家</router-link>
    </div>
    
    <router-view :seller="seller"></router-view>  <!-- 加载路由文件 -->

  </div>
</template>

<script>
import header from './components/header/header'
export default {
  name: 'app',    //给组件起个名字方便调用
  data(){
    return{ seller : {},
            
     }
  },
  created(){
    this.$http.get('api/seller').then((res) => {
      res = res.data;
      if(res.errno == 1){
        this.seller = res.data;
      }
    })
  },
  methods:{
  
  },
  components:{
    'v-header':header
  }
}
</script>

<style lang="stylus">

  .tab 
    display:flex
    background:#fff
    border-bottom:1px solid rgba(7,17,27,0.1)
    .tab-item
      flex:1
      text-align:center
      font-weight:600
      line-height:40px
      height:40px
      color:#000
      font-size:14px
      &.router-link-active
        color:red
</style>
