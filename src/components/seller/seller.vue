<template>
  <div id="seller" ref="sellerWrapper">
    <div class="seller-wrapper">
    	<div class="seller-part1">
    		<h1>{{seller.name}}</h1>
    		<div class="star"><star :size="10"></star><span>({{seller.ratingCount}})</span><i>月售{{seller.sellCount}}单</i></div>
    		
    		<div class="info">
    			<div class="section1"><p>起送价</p><span>{{seller.minPrice}}</span><i>元</i></div>
    			<div class="section2"><p>商家配送</p><span>{{seller.deliveryPrice}}</span><i>元</i></div>
    			<div class="section3"><p>平均配送时间</p><span>{{seller.deliveryTime}}</span><i>分钟</i></div>
    		</div>
    		<div class="shoucan"></div>
    	</div>
    	<split></split>
    	<div class="seller-part2">
    		<h1>公告与活动</h1>
    		<p>{{seller.bulletin}}</p>
    	</div>
    	<div class="seller-part3">
    		<ul>
    			<li v-for="supports in seller.supports">
    				<i class="icon" :class="classMap[supports.type]"></i>
    				<span>{{supports.description}}</span>
    			</li>
    		</ul>
    	</div>
    	<split></split>
    	<div class="seller-part4" >
    		<h1>商家实景</h1>
    		<div class="img" ref="imgWrapper">
    			<ul>
    				<li v-for="(imgs,index) in seller.pics"><img :src="imgs" alt="" height="90" width="120"></li>
    			</ul>
    		</div>
    	</div>
    	<div class="seller-part5">
    		<h1>商家信息</h1>
    		<ul>
    			<li v-for="infos in seller.infos">{{infos}}</li>
    		</ul>
    	</div>
    </div>

  </div>
</template>

<script>
import star from "../../components/star/star";
import split from "../../components/split/split";
import BScroll from "better-scroll"

export default {
	props: {
		seller: {
			type:Object,
			default(){
				return {}
			}
		}
	},
data(){
    return{}
  },
  created(){
   this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
   this.$nextTick( ()=>{
   		this.Vscroll = new BScroll(this.$refs.sellerWrapper,{
   			click:true
   		});
   		this.Hscroll = new BScroll(this.$refs.imgWrapper,{
   			click:true
   		});
   } )
  },
  methods: {
  	getData(){

  	}
  },
  components:{
  	star,
  	split
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
#seller
	position:absolute
	top:176px
	left:0
	overflow:hidden
	width:100%
	bottom:0
	.seller-wrapper
		
		.seller-part1
			padding:18px
			position:relative
			h1
				font-size:14px
				line-height:14px
				color:rgb(7,17,27)
			.star
				margin-top:8px
				padding-bottom:18px
				border-bottom:1px solid rgba(7,17,27,0.1)
				#star
					display:inline-block
				span,i
					font-size:10px
					color:rgb(77,85,93)		
					line-height:18px
					font-style:normal
					vertical-align:middle
				i
					margin-left:12px
					margin-right:12px	
			hr
				margin:0
				padding:0
				background:rgba(7,17,27,0.1)	
				border:none
				height:1px	
			.info		
				display:flex
				margin-top:18px
				.section1,.section2,.section3
					flex:1
					color:rgb(147,153,159)
					font-size:10px
					text-align:center
					border-right:1px solid rgba(7,17,27,0.1)
					span
						display:inline-block
						color:rgb(7,17,27)
						font-size:24px
						margin-top:4px
						line-height:24px
					i
						font-style:normal
						font-size:10px	
				.section3
					border:none
		.seller-part2
			padding:18px
			h1
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
				margin-bottom:8px
			p
				padding:0 12px			
				font-size:12px
				color:rgb(240,20,20)
				line-height:24px
		.seller-part3
			padding:18px
			padding-top:0
			ul
				li
					border-top:1px solid rgba(7,17,27,0.1)
					height:48px
					line-height:48px
					font-size:0
					padding:0 12px
					.icon
						display:inline-block
						margin-right:4px
						width:16px
						height:16px
						vertical-align:middle
						background-size:16px 16px
						&.decrease
							bg-image('decrease_2')
						&.discount
							bg-image('discount_2')
						&.special
							bg-image('special_2')
						&.invoice
							bg-image('invoice_2')
						&.guarantee
							bg-image('guarantee_2')
					span
						font-size:12px
						color:rgb(7,17,27)
						vertical-align:middle
						line-height:16px
		.seller-part4,.seller-part5
			width:100%
			padding:18px
			h1
				font-size:14px
				line-height:14px
				color:rgb(7,17,27)
				
			.img
				margin-top:12px
				width:100%
				// overflow: hidden
				margin-left:0
				white-space: nowrap
				li
					display:inline-block
					height:90px
					width:120px
					margin-right:6px	
		.seller-part5
			ul
				margin-top:12px
				li
					border-top:1px solid rgba(7,17,27,0.1)						
					line-height:16px
					font-size:12px
					padding:16px 12px
					color:rgb(7,17,27)
					
					

				
							

			
</style>
