<template>
	<transition name="fade">
	<div class="food" v-show="isshow" ref="food">
		<div class="food-wrapper">
			<div class="food-top">
				<div class="img"><img :src="food.image" alt=""></div>
				<div class="title">
					<h1>{{food.name}}</h1>
					<div class="count">
						<span>月售{{food.sellCount}}份</span>&nbsp&nbsp<span>好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span>￥{{food.price}}</span>&nbsp&nbsp<span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper"><cartcontrol :food="food"></cartcontrol></div>
					<transition name="fader">
						<div class="button" v-show="!food.count" @click="addCart">加入购物车</div>
					</transition>
				</div>
				<div class="back" @click="detailShow" >
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<split v-if="food.info"></split>
			<div class="food-middle" v-if="food.info">
				<h2>商品介绍</h2>
				<p>{{food.info}}</p>
			</div>
			<split></split>
			<div class="food-bottom">
				<h1>商品评价</h1>
				<ratingSelect :ratings="food.ratings" :desc="desc" v-on:increment="changeselectType" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
				<div class="line"></div>
				<ul v-if="food.ratings && food.ratings.length">
					<li v-show="needShow(ratings.rateType,ratings.text)" class="ratings" v-for="ratings in food.ratings">
						<div class="time">
							<span class="timing">{{ratings.rateTime | formatDate}}</span>
							<span class="ren">
								<i>{{ratings.username}}</i>
								<img :src="ratings.avatar" alt="">
							</span>
						</div>
						<div class="text">
							<i :class="{'icon-thumb_up':ratings.rateType === 0,'icon-thumb_down':ratings.rateType === 1}"></i>
							<span>{{ratings.text}}</span>
						</div>
					</li>
				</ul>
				<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
			</div>
		</div>  <!-- food-wrapper    end -->
	</div>
	</transition>
</template>
<script>
import Vue from 'vue';
import cartcontrol from "../../components/cartcontrol/cartcontrol";
import split from "../../components/split/split";
import ratingSelect from "../../components/ratingSelect/ratingSelect";
import BScroll from "better-scroll";
const ALL = 2;
	export default{
		name:"food",
		props: {
			food:{
				type:Object
			}
		},
		data(){
			return {
				isshow:false,
				desc: {
					name1:"全部",
					name2:"推荐",
					name3:"吐槽"
				},
				selectType:ALL,
				onlyContent:false
			}
		},
		created(){
			// console.log(this.food.ratings);

		},
		methods: {
			show(){
				this.isshow = true;
				// this.onlyContent = true;
				this.selectType = ALL;
				this.$nextTick(() => {
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.food,{
							click:true
							});
						}else{
							this.scroll.refresh();
						}
					});

			},
			needShow(type, text) {
			        if (this.onlyContent && !text) {
			          return false;
			        }
			        if (this.selectType === ALL) {
			          return true;
			        } else {
			          return type === this.selectType;
			        }
			      
			},
			// dayin(){
			// 	var _this = this;
			// 	setTimeout(function(){console.log(111);},100)
			// },
			addCart(){
				
				Vue.set(this.food,'count',1);
			},
			spliced(type){         //------作废函数。

				type.forEach((item,index)=>{
									if(item.text == ''){
									type.splice(index,1)
									}
								})
			},
			detailShow(){
				// console.log("111");
				this.isshow = false;
			},
			changeselectType(val){
				if(typeof(val) == "number"){
					this.selectType = val;
					this.$nextTick(() => {
						this.scroll.refresh();
					});
				}else{
					this.onlyContent = val;
					this.$nextTick(() => {
						this.scroll.refresh();
					})
				}
				
			}
		},
		computed:{
			ratingSelectType(){     //--------------很多余没必要这么写，写个needShow（）就可以了
				var type = [];
				if(this.selectType === 1){   //吐槽
					this.food.ratings.forEach( (item,index) => {
						 if(item.rateType === 1){
							type.push(this.food.ratings[index]);
							if(this.onlyContent){
								// this.spliced(type);
							}
						}
					});
					// this.food.ratings.forEach(function(item, index) {
     //      				if (item.rateType === 1) {
     //        			type.push(_this.food.ratings[index]);
     //     						}
     //   				 });
				}else if(this.selectType === 0){   //推荐
					this.food.ratings.forEach( (item,index) => {
						 if(item.rateType === 0){
							type.push(this.food.ratings[index]);
							if(this.onlyContent){
								// this.spliced(type);
							}
						}
					});
				} else{
					// console.log(this.onlyContent);
					var _this = this;
						type = _this.food.ratings;
						 _this.food.ratings.forEach( (item,index)=>{
						 	if(_this.onlyContent){
									type.forEach((item,index)=>{
										if(item.text == ''){
										type.splice(index,1)

										}
									})
								}
						 } )
				}
				return type;
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.scroll = new BScroll(this.$refs.food,{
							click:true
							});
				// console.log(this.scroll);
			})
		},
		filters:{
			formatDate(val){
				return new Date(parseInt(val)).toLocaleString().replace(/:\d{1,2}$/,' ');  //过滤时间戳。
			},
		},
		components: {
			cartcontrol,
			split,
			ratingSelect
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.food
	position: fixed
	left: 0
	top: 0
	bottom: 48px
	z-index: 30
	width: 100%
	background: #fff
	transform:translate(0,0)
	&.fade-enter,&.fade-leave-to
		transform:translate(100%,0)
	&.fade-enter-active,&.fade-leave-active
		transition:all 0.3s
	.food-top
		.img
			margin:0
			width:100%
			position:relative
			height:0
			padding-top:100%
			img
				width:100%
				height:100%
				border-radius:0
				position:absolute
				top:0
				left:0
		.title
			margin:18px
			position:relative
			h1
				font-size:14px	
				line-height:14px
				margin-bottom:8px
			.count
				font-size:10px
				color:rgb(147,153,159)	
				margin-bottom:18px
			.price
				font-size:14px
				line-height:24px
				color:rgb(240,20,20)
				font-weight:700
				.oldPrice
					font-size:10px
					line-height:24px
					color:rgb(147,153,159)
					font-weight:700
					text-decoration:line-through
			.cartcontrol-wrapper
				position:absolute
				bottom:3px
				right:0		
			.button 
				width:74px
				height:24px
				border-radius:12px
				background:#00a0dc
				text-align:center
				font-size:10px
				line-height:24px
				color:#fff
				position:absolute
				right:0px	
				bottom:0px
				&.fader-enter,&.fader-leave-to
					opacity:0
				&.fader-enter-active,&.fader-leave-active
					transition:all 0.3s
		.back
			position:absolute
			top:20px
			left:20px
			font-size:18px
			color:#fff
			width:30px
			height:30px
	.food-middle
		padding:18px
		h2	
			margin-bottom:6px
			font-size:12px
		p
			padding:0 8px
			font-size:12px
			line-height:24px
			color:rgb(77,85,93)
	.food-bottom
		padding:18px 18px 0 18px
		font-size:12px
		.line
			height:2px 
			width:200%	
			background-color:rgba(77,85,93,0.1);
			margin:0 0px 0 -18px
		.ratings
			margin:16px 0px
			border-bottom:1px solid rgba(147,153,159,0.3)
			.time
				display:flex
				.timing
					flex:1	
					font-size:10px
					color:rgb(147,153,159)
					line-height:12px
				.ren
					flex:1
					text-align:right
					font-size:10px
					color:rgb(147,153,159)
					line-height:12px
					img
						width:12px
						height:12px
						border-radius:50%
						margin-left:6px
						vertical-align:top
			.text
				margin-top:6px
				margin-bottom:16px
				i 
					display:inline-block
					width:12px
					height:12px	
					&.icon-thumb_up
						color:	rgb(0,160,220)
					&.icon-thumb_down
						color: rgb(147,153,159)
				span
					vertical-align:top		
		.no-ratings
			font-size:10px
			height:40px	
			line-height:40px
			margin-left:10px		
				
</style>