<template>
  <div id="ratings" ref="ratingsWrapper">
    <div class="ratingsWrapper">
      <div class="ratings-header">
      	<div class="score">
      		<h1>{{seller.score}}</h1>
      		<p>综合评分</p>
      		<p class="gao">高于周边商家{{seller.rankRate}}%</p>
      	</div>
      	<div class="star">
      		<div class="fuwu"><span>服务态度</span><star :score="seller.score" :size="10"></star><span class="fenshu">{{seller.score}}</span></div>
      		<div class="shangping"><span>商品评分</span><star :score="seller.serviceScore" :size="10"></star><span class="fenshu">{{seller.serviceScore}}</span></div>
      		<p class="time">送达时间<span>{{seller.deliveryTime}}分钟</span></p>
      	</div>
      </div>
      <split></split>
  	<div class="ratings-footer">
  		<ratingSelect :ratings="ratings" v-on:increment="changeselectType" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
      <hr/>
      <ul >
        <li v-show="needShow(rating.rateType,rating.text)" class="ratings-list" v-for="rating in ratings">
          <div class="rating-wrapper">
              <div class="img"><img :src="rating.avatar" alt="" width="28" height="28"></div>
              <div class="title">
                <h1>{{rating.username}}</h1>
                <p><star :size="10"></star><span>{{rating.deliveryTime}}分钟送达</span></p>
                <h2>{{rating.text}}</h2>
                <div class="recommend">
                  <ul>
                  <i :class="{'icon-thumb_up':rating.rateType == 0,'icon-thumb_down':rating.rateType == 1}" class="icon"></i>
                  
                    <li v-for="recommend in rating.recommend">
                      <span>{{recommend}}</span>
                    </li>
                  </ul>
                </div>
                <div class="time">{{rating.rateTime | filtertime}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
  	
  </div>
  <!-- <shopcart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :payDesc="seller.minPrice"></shopcart> -->
  </div>
</template>

<script>
import star from "../../components/star/star";
import split from "../../components/split/split";
import ratingSelect from "../../components/ratingSelect/ratingSelect";
import BScroll from "better-scroll";
import shopcart from "../../components/shopcart/shopcart";
import Vue from 'vue';

const ALL = 2;
// var Event = new Vue();
export default {
 	name: "ratings",
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  	data(){
   	 return{
   	 	ratings:[],
      selectType: ALL,
      onlyContent: false,
      // selectFoods: [],
      // goods:[]
   	 }
  	},
  	created(){
   		this.getData_r();
      
      this.$nextTick( ()=>{
        
      } )
  },
  mounted() {
        
  },
  methods: {
  	getData_r(){
  		this.$http.get('api/ratings').then( (res)=>{
   			res = res.data;
   			if(res.errno == 0){
   				this.ratings = res.data;
          this.$nextTick( ()=>{
            this.scroll = new BScroll(this.$refs.ratingsWrapper,{
              click:true
            });
          } )
   			}
   		} )
  	},
    changeselectType(val){
      if(typeof val == 'number'){
        this.selectType = val;
      }else{
        this.onlyContent = val
      }
    },
    needShow(type,text){
      if(this.onlyContent && !text){
        return false
      }
      if(this.selectType == ALL){
        return true;
      }else{
        return this.selectType == type;
      }
    }
  },
  computed: {
    
  },
  filters: {
    filtertime(val){
      return new Date(parseInt(val)).toLocaleString();
    }
  },
  components: {
    star,
    split,
    ratingSelect,
    shopcart
  }
}
</script>

<style>
#ratings {position: absolute;top: 178px;left: 0;background: #fff;overflow: hidden;bottom:  0px;width: 100%;}
.ratings-header {display: flex;padding: 18px 0}
.ratings-header .score {flex: 0 0 137px;text-align: center;border-right: 1px solid rgba(7,17,27,0.1);width: 137px;padding: 6px 0;}
.ratings-header .score h1 {font-size: 24px;color: rgb(255,153,0);margin-bottom: 6px;}
.ratings-header .score > p {font-size: 12px;line-height: 24px; }
.ratings-header .score .gao {color: rgba(7,17,27,0.6);}
.ratings-header .star {flex: 1;margin-left: 24px;padding-top: 6px;}
.ratings-header .star .fuwu,.shangping,.time {font-size: 12px;color: rgb(7,17,27);line-height: 18px;margin-bottom: 10px;}
.ratings-header .star #star {display: inline-block;vertical-align: top;margin-left: 12px;}
/*.ratings-header .star p {}*/
.ratings-header .star p span {margin-left: 12px;color: rgb(147,153,159);}
.ratings-header .star .fenshu {color: rgb(255,153,0);}
.ratings-footer .ratingSelect-wrapper {padding: 0 18px ;}
.ratings-footer .ratingSelect-wrapper .title {margin-left: 0}
.ratings-footer hr{padding: 0;margin: 0;background-color:rgba(7,17,27,0.1);height:1px;border:none;}
.ratings-footer .ratings-list {margin: 18px;border-bottom: 1px solid rgba(7,17,27,0.1)}
.ratings-footer .rating-wrapper {display: flex;}
.ratings-footer .img {margin: 0;padding: 0;height: 28px;width: 28px;flex: 0 0 28px; }
.ratings-footer .img img {border-radius: 50%;}
.ratings-footer .title {flex: 1;margin-left:12px;position: relative;}
.ratings-footer .title h1 {font-size: 10px;font-weight: normal;margin-bottom: 4px;}
.ratings-footer .title p #star {display: inline-block;}
.ratings-footer .title p #star span {margin-right: 4px;}
.ratings-footer .title p span {font-size: 10px;color: rgb(147,153,159);}
.ratings-footer .title h2 {font-size: 12px;font-weight: normal;margin-top: 6px;line-height: 18px;color: rgb(7,17,27);}
.ratings-footer .title .recommend .icon-thumb_up{color: rgb(0,160,220);font-size: 10px}
.ratings-footer .title .recommend .icon-thumb_down {color: rgb(147,153,159);font-size: 10px}
.ratings-footer .title .recommend ul {display: inline-block;margin-bottom: 18px;}
.ratings-footer .title .recommend li {border: 1px solid rgba(7,17,27,0.1);display: inline-block;padding: 0 6px;margin-right: 8px;border-radius: 2px;margin-top: 8px;}
.ratings-footer .title .recommend li span {font-size: 10px;color: rgb(147,153,159);line-height: 16px;}
.ratings-footer .title .time {position: absolute;right: 0;top: 0;font-size: 10px;color: rgb(147,153,159)}
</style>
