<template>
	<div id="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'hignlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'hignlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'hignlight':totalPrice>0}">
					￥{{totalPrice}}
				</div>
				<div class="desc">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payclass" @click.stop="gopay">
					{{caculpayDesc}}
				</div>
			</div>
		</div>
		<transition name="fold">
		<div class="shopcart-list"  v-show="listShow">
			<div class="head">
				<h1>购物车</h1>
				<span class="empty" @click="clearList">清空</span>
			</div>
			<div class="list-content" ref="shopcartList">
				<ul>
					<li class="cartfood" v-for="food in selectFoods" >
						<span class="name">{{food.name}}</span>
						<span class="price">￥{{food.price}}</span>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
		</transition>
		<transition name="fade">
			<div class="bg" v-show="listShow" @click="hideList"></div>
		</transition>
		
	</div>
</template>
<script>
import cartcontrol from "../../components/cartcontrol/cartcontrol";
import BScroll from "better-scroll";
	export default{
		name:"shopcart",
		props: {
			deliveryPrice: {
				type:Number,
			},
			payDesc: {
				type:Number,
				default:0
			},
			selectFoods: {
				type:Array,
				default() {
					return []
				} 
			}
		},
		data(){
			return {
				fold:true
			}
		},
		computed: {
			totalPrice(){
				let total = 0
				this.selectFoods.forEach((foods)=>{
					total += foods.count*foods.price
				});
				return total;
			},
		    totalCount(){
		    	let count = 0;
		    	this.selectFoods.forEach((foods)=>{
		    		count += foods.count;
		    	})
		    	return count;
		    },

			caculpayDesc(){
				if(this.totalPrice == 0){
					return "￥"+this.payDesc+"元起送"
				}else if(this.totalPrice < this.payDesc){
					 let diff = this.payDesc-this.totalPrice;
					return "还差￥"+ diff +"元起送";
				}else{
					return "去结算";
				}
			},
			payclass(){
				if(this.totalPrice >= this.payDesc){
					return "enough";
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold = true;
				}
				let show = !this.fold;
				this.$nextTick( ()=>{
					if(!this.bscroll){
						if(show){
							this.bscroll = new BScroll(this.$refs.shopcartList,{
								click:true
							})
						}
					}else{
						this.bscroll.refresh();
					}
					
				} )
				
				return show;
			},
		},
		methods: {
			gopay(){
				if(this.totalPrice >= this.payDesc){
					window.alert('支付￥'+this.totalPrice+'元');
				}
			},
			
			toggleList(){
				// console.log(this.fold);
				this.fold = !this.fold;
			},
			hideList(){
					this.fold = !this.fold;
			},
			clearList(){
				this.selectFoods.forEach( (food)=>{
					food.count = 0;
				} )
			}
		},
		components: {
			cartcontrol
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	#shopcart
		position:fixed
		bottom:0
		left:0
		width:100%
		height:48px
		z-index:50
		background:#141d27
		.content
			display:flex
			.content-left
				flex:1
				background:#141d27
				.logo-wrapper
					width:56px
					height:56px
					border-radius:50%;
					position:relative
					top:-12px
					background:#141d27
					margin:0 12px
					box-sizing:border-box
					padding:6px
					display:inline-block
					.logo
						width:100%
						height:100%
						background:#2b343c
						border-radius:50%
						text-align:center
						&.hignlight
							background:rgb(0,160,220)
						.icon-shopping_cart
							font-size:24px
							color:#80858a
							line-height:44px
							&.hignlight
								color:#fff
					.num
						color:#fff
						position:absolute
						width:24px
						height:16px
						line-height:16px
						font-size:9px
						border-radius:16px
						background:red	
						text-align:center
						top:0
						left:30px		
				.price,.desc
					font-size:12px;
					color:rgba(255,255,255,0.4)	
					display:inline-block
					line-height:24px
					vertical-align:top
					margin-top:12px
					box-sizing:border-box
					border-right: 1px solid  rgba(255, 255, 255, 0.1)
					padding-right:12px
					font-weight:700
					&.hignlight
						color:#fff
				.desc
					border:none
					color:rgba(255,255,255,0.4)		
					margin-left:12px
					font-weight:200
			.content-right
				flex:0 0 105px
				height:60px		
				background:#2b333b
				text-align:center
				.pay
					line-height:60px
					font-size:12px
					font-weight:700
					color:rgba(250,250,250,0.4)
					line-height:24px
					vertical-align:top
					padding-top:12px
					&.enough
						background: #00b43c
						color:#fff
						height:60px
		.shopcart-list
			position:absolute
			left:0
			transform:translate(0,-100%)
			z-index:-1
			width:100%
			margin-top:-60px
			&.fold-enter,&.fold-leave-to
				transform:translate(0,0)
			&.fold-enter-active,&.fold-leave-active
				transition:all 0.3s	
			.head
				height:40px
				line-height:40px
				padding:0 18px
				background:#f3f5f7
				border-bottom:1px solid rgba(7,17,27,0.1)
				box-sizing:border-box
				width:100%
				h1
					font-weight:normal
					font-size:14px
					float:left	
					color:rgb(7,17,27)
				.empty
					font-size:14px
					float:right	
					color:rgb(0,160,220)
			.list-content
				background:#fff
				max-height: 242px
				overflow:hidden
				padding: 0 18px
				ul
					.cartfood
						position:relative
						padding: 12px 0
						border-bottom:1px solid rgba(7,17,27,0.1)
						box-sizing: border-box
						.name
							font-size:14px
							line-height:24px
							color:rgb(7,17,27)
						.price
							color:red
							font-weight:bold
							position:absolute
							right:96px
							bottom:12px
							font-size:10px	
							line-height: 24px
						.cartcontrol-wrapper
							position:absolute
							right:0
							bottom:10px
		.bg
			width:100%
			height:100%			
			background:rgba(0,0,0,0.5)
			position:fixed
			left:0
			top:0
			z-index:-2
			&.fade-enter,&.fade-leave-to
				opacity:0
			&.fade-enter-active,&.fade-leave-active
				transition:all 0.3s
					
</style>