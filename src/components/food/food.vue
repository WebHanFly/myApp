<template>
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
					<div class="button">加入购物车</div>
					<div class="cartcontrol" v-if="food.count"><cartcontrol></cartcontrol></div>
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
				<ratingSelect :desc="desc" v-on:increment="changeselectType" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
				<div class="line"></div>
				<ul v-show="food.ratings && food.ratings.length">
					<li v-show="needShow(ratings.rateType,ratings.text)" class="ratings" v-for="ratings in ratingSelectType">
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
			</div>
		</div>  <!-- food-wrapper    end -->
	</div>
</template>
<script>
import cartcontrol from "../../components/cartcontrol/cartcontrol";
import split from "../../components/split/split";
import ratingSelect from "../../components/ratingSelect/ratingSelect";
import BScroll from "better-scroll";
const ALL = 2;
	export default{
		name:"food",
		props: {
			food:{
				type:Object,
				default(){
					return {}
				}
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
				this.onlyContent = true;
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
			needShow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			},
			dayin(){
				var _this = this;
				setTimeout(function(){console.log(111);},100)
			},
			detailShow(){
				// console.log("111");
				this.isshow = false;
			},
			changeselectType(val){
				if(typeof(val) == "number"){
					this.selectType = val;
				}else{
					this.onlyContent = val;
				}
				
			}
		},
		computed:{
			ratingSelectType(){
				var type = [];
				if(this.selectType === 1){   //吐槽
					this.food.ratings.forEach( (item,index) => {
						 if(item.rateType === 1){
							type.push(this.food.ratings[index]);
							if(this.onlyContent){
								type.forEach((item,index)=>{
									if(item.text == ''){
									type.splice(index,1)
										
									}
								})
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
								type.forEach((item,index)=>{
									if(item.text == ''){
									type.splice(index,1)

									}
								})
							}
						}
					});
				} else if(this.selectType === 2){
					var _this = this;
					setTimeout(function(){
						type = _this.food.ratings;
						console.log(type);
						 _this.food.ratings.forEach( (item,index)=>{
						 	if(_this.onlyContent){
									type.forEach((item,index)=>{
										if(item.text == ''){
										type.splice(index,1)

										}
									})
								}
						 } )
					},100);
					 
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
				
</style>