<template>
  <div id="goods">
     <div class="menu-wrapper" ref="menuwrapper">
     	<ul>
     		<li v-for="(item,index) in goods" :class="{'active':currentIndex === index}" @click="selectMenu(index,$event)" >
     			<span class="line">
     				<i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i><i class="text"></i>{{item.name}}
     			</span>
     		</li>
     	</ul>
     </div>
     <div class="foods-wrapper" ref="foodswrapper">
     	<ul>
     		<li v-for="(item,index) in goods" class="foodsmenu food-list-hook" >
     			<h1>{{item.name}}</h1>
     			<ul>
     				<li v-for="(food,index) in item.foods" class="mainfoods" @click="showfoods(food,$event)">
     					<div class="icon"><img :src="food.icon" alt="" width="57" height="57"></div>
     					<div class="title">
     						<h2>{{food.name}}</h2>
     						<p class="description">{{food.description}}</p>
     						<div class="count">
     							<span>月售{{food.sellCount}}份</span>&nbsp&nbsp<span>好评率{{food.rating}}%</span>
     						</div>
     						<div class="price">
     							<span>￥{{food.price}}</span><span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
     						</div>
     						<div class="shopping">
     							<cartcontrol :food="food"></cartcontrol>
     						</div>
     					</div>
     				</li>
     			</ul>
     		</li>
     	</ul>
     </div>
     <shopcart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :payDesc="seller.minPrice"></shopcart>
     <food :food="selectedFood" ref="food"></food>
  </div>
  
</template>

<script>
import shopcart from "../../components/shopcart/shopcart"
import cartcontrol from "../../components/cartcontrol/cartcontrol"
import food from "../../components/food/food"
import BScroll from "better-scroll"
import Vue from 'vue';


var Event = new Vue();
export default {
 props: {
 	seller: {
 		type: Object
 	}
 },
  data(){
    return {
    	goods:[],
    	classMap:[],
    	listHeight:[],
    	scrollY:0,
    	selectedFood: {}
    }
  },
  created(){
  	this.getData();
   	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  computed:{
  	currentIndex(){
  		for(let i=0;i<this.listHeight.length;i++){
  			let height1 = this.listHeight[i];
  			let height2 = this.listHeight[i+1];
  			if(this.scrollY<height2 && this.scrollY>=height1 || !height2){
  				return i
  			}
  		}
  		return 0;
  	},
  	selectFoods(){
  		let foods = [];
  		this.goods.forEach((good)=>{
  			good.foods.forEach((food)=>{
  				if(food.count >0){
  					foods.push(food);    //有购买数量的food的所有属性的集合push到一个数组中，传入到shopcart。
  				}
  			})
  		});
  		return foods;
  	}
  },
  methods:{
  	getData(){
  		this.$http.get('api/goods').then((res)=>{
  			res = res.data;
  			if(res.errno == 0){
  				this.goods = res.data;
  				this.$nextTick(()=>{
  					this._initScroll();
   					this._caculateHeight();
  				})
   				
  			}
  		})
  	},
    send(){
      console.log(22);
      Event.$emit("a-msg", this.selectedFood);
    },
  	_initScroll(){
  		this.foodScroll = new BScroll(this.$refs.foodswrapper,{
  			probeType: 3,
  			click:true
  		});
  		this.menuScroll = new BScroll(this.$refs.menuwrapper,{
  			click:true
  		});
  		this.foodScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));   //7-7节
				});
  	},
  	_caculateHeight(){
  		let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
  		let height = 0;
  		this.listHeight.push(height);
  		for(let i=0; i < foodList.length; i++){
  			let item = foodList[i];
  			height += item.clientHeight;
  			this.listHeight.push(height);
  		}
  	},

  	selectMenu(index,$event){
  		if(!event._constructed){
  			return;
  		};
  		let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
  		let el = foodList[index];
  		this.foodScroll.scrollToElement(el,300);    //betterscroll内置方法
  	},
  	showfoods(food,$event){
  		if(!$event._constructed){
					return false;
				}
		this.selectedFood = food;
				// console.log(this.$refs.food);
		this.$refs.food.show();
  	}
  },
  components:{
  	shopcart,
  	cartcontrol,
  	food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
#goods
	display: flex
	position:absolute
	z-index:0
	overflow:hidden
	top:175px
	bottom:46px
	width:100%
	.menu-wrapper
		flex:0,0,80px
		width:80px
		background:#f3f5f7
		ul
			width:100%
			li
				height:54px
				width:56px
				display: table
				margin:0 auto
				line-height:14px
				border-bottom:1px solid rgba(7,17,27,0.1)
				&:last-child
					border:none
				&.active
					background:#fff
					margin-top:-1px
					font-weight:bold
					padding:0 12px
					border:none
				.line
					width:56px
					display:table-cell
					vertical-align: middle
					font-size:12px
					color:#000
					&:last-child
						// border:none
					.icon
						width:12px
						height:12px
						display:inline-block
						vertical-align:-2px
						margin-right:2px
						background-size:12px 12px
						&.decrease
							bg-image('decrease_3')
						&.discount
							bg-image('discount_3')
						&.guarantee
							bg-image('guarantee_3')
						&.invoice
							bg-image('invoice_3')
						&.special
							bg-image('special_3')
					.text
						display:inline-block
						vertical-align:top
	.foods-wrapper
		flex:1
		.foodsmenu
			h1
				height:26px
				background:#f3f5f7
				border-left:2px solid #d9dde1
				color:rgb(147,153,159)
				font-size:12px
				padding-left:13px
				line-height:26px
			.mainfoods
				display:flex
				padding-bottom:18px
				margin-right:18px
				margin-left:18px	
				border-bottom:1px solid rgba(7,17,27,0.1)
				&:last-child
					border:none
				.icon				
					margin:18px 10px 0 0px
				.title
					margin-top:20px
					position:relative
					width:100%
					h2
						font-size:14px
						line-height:14px
						color:rgb(7,17,27)	
					.description,.count
						font-size:10px
						// line-height:12px
						color:rgb(147,153,159)
					.description
						margin:8px 0
					.price
						font-size:10
						line-height:24px
						color:rgb(240,20,20)	
						font-weight:700
						margin-top:8px
						.oldPrice
							font-size:10px
							color:rgb(147,153,159)	
							line-height:24px
							text-decoration:line-through
							margin-left:8px
					.shopping
						position:absolute
						bottom:-2px
						right:-6px		
</style>
