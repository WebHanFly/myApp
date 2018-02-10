<template>
	<div id="shopcart">
		<div class="content">
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
				<div class="pay" :class="payclass" @click="gopay">
					{{caculpayDesc}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
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
			}
		},
		methods: {
			gopay(){
				if(this.totalPrice >= this.payDesc){
					window.alert('支付￥'+this.totalPrice+'元');
				}
			}
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
					
</style>