<template>
  <div id="header">
     <div class="header-wrapper">
     	<div class="img"><img :src="seller.avatar" alt="" width="64" height="64"></div>
     	<div class="content">
     		<div class="title">
     			<span class="brand"></span>
     			<h1>{{seller.name}}</h1>
     		</div>
     		<div class="description">
     			<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
     		</div>
     		<div class="supports" v-if="seller.supports">
     			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
     			<span class="text" v-text="seller.supports[0].description"></span>
     		</div>
     		<div class="supports-count" v-if="seller.supports" @click="detailShow"> 
     			<span class="count">{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i>
     		</div>
     	</div>
     	<div class="footer" @click="detailShow">
     		<span class="icon"></span><span class="bulletin">{{seller.bulletin}}</span>
     		<i class="icon-keyboard_arrow_right"></i>
     	</div>
		<div class="backguand"><img :src="seller.avatar" alt=""></div>  <!-- 整个header的背景虚化 -->
		<transition name="fade">
		<div class="detail-wrapper" v-show="isshow">
			<div class="detail">
				<div class="title-wrapper">
					<div class="title">{{seller.name}}</div>
					<div class="star">
						<star :score="seller.score"></star>
					</div>
				</div>
				<div class="supports-wrapper">
					<div class="support">
						<div class="title">
							<div class="line"></div>
							<span>优惠信息</span>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports">
							<li v-for="(support,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text" v-text="seller.supports[index].description"></span>
							</li>
						</ul>
						<div class="detail-main">
							<div class="title">
								<div class="line"></div>
								<span>商家公告</span>
								<div class="line"></div>
							</div>
							<div class="bulletin">
							    <span>{{seller.bulletin}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="button">
				<i class="icon-close" @click="closeDetail"></i>
			</div>
		</div>  <!-- 点击bulletin的全屏弹层 -->
		</transition>
  </div>
</div>
</template>

<script>
import star from '../../components/star/star';
export default {
	name: "seller",
 	props: {        //父组件传过来的数据通过props接受
 		seller: {
 			type: Object
 		}
 	},
  data(){
    return {
    	classMap:[],
    	isshow: false
    }
  },
  created(){
   this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
  	detailShow(){
  		this.isshow = true;
  	},
  	closeDetail(){
  		this.isshow = !this.isshow;
  	}
  },
  components:{
  	star
  }
}
</script>

<style coped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"


#header 
 	color:#fff
 	background:rgba(7,17,27,0.5)
 	position:relative
 	overflow:hidden
 .header-wrapper 
 		padding:24px 0px 0px 0px
 	.img
 		width:64px
 		height:64px
 		display:inline-block
 		vertical-align:top
 		margin-right:16px
 		margin-bottom:18px
 		margin-left:24px
 		img
 			border-radius:2px
 			
 	.content
 		display:inline-block
 		vertical-align:top
 		font-size:0
 		.title
 			margin:2px 0 8px 0
 			.brand
 				width:32px
 				height:18px
 				display:inline-block
 				bg-image:('brand')
 				background-size: 30px 18px
 				vertical-align:top
 				
	 		h1
	 			font-size:16px
	 			vertical-align:top
	 			display:inline-block
	 			margin-left:6px
	 			font-weight:bold
	 			line-height:18px
	 	.description
	 			span
	 				color:#fff
	 				font-size:12px
	 	.supports
	 		margin-top:10px;
	 		.icon
	 			display:inline-block
	 			width:12px
	 			height:12px;
	 			margin-right:4px
	 			vertical-align:top
	 			background-size:12px 12px
	 			&.decrease
	 				bg-image('decrease_1')
	 			&.discount
	 				bg-image('discount_1')
	 			&.special
	 				bg-image('special_1')
	 			&.invoice
	 				bg-image('invoice_1')
	 			&.guarantee
	 				bg-image('guarantee_1')			
	 		.text
	 			font-size:10px
	 			color:#fff
	 			line-height:12px
	 			vertical-align:top
	 	.supports-count
	 		height:24px	
	 		padding:0 8px
	 		line-height:24px
	 		border-radius:14px
	 		background:rgba(0,0,0,0.2)
	 		text-align:center
	 		width:45px
	 		position:absolute
	 		right:12px
	 		bottom:40px
	 		.count
	 			vertical-align:top
	 			font-size:10px
	 		.icon-keyboard_arrow_right
	 			font-size:10px
	 			line-height:24px
	 			margin-left:1px
	.footer
		position: relative
		height: 28px
		line-height: 28px
		padding: 0 22px 0 12px
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
		background: rgba(7, 17, 27, 0.2)
		.icon
			display: inline-block
			vertical-align: top
			margin-top: 8px
			width: 22px
			height: 12px
			bg-image('bulletin')
			background-size: 22px 12px
			background-repeat: no-repeat
		.bulletin
			// color:#fff
			font-size:10px
			margin:0 4px
			vertical-align: top
		.icon-keyboard_arrow_right
			font-size:10px
			line-height:28px
			color:#fff
			position:absolute
			right:12px;
	.backguand
		position:absolute
		left:0
		top:0	
		z-index:-20	
		width:100%
		img
			width:100%	
			filter:blur(10px)
	.detail-wrapper
		z-index:1
		position:fixed
		overflow:auto
		left:0
		top:0
		background:rgba(0,0,0,0.8)
		width:100%
		height:100%
		&.fade-enter,&.fade-leave-to
			opacity: 0
			background: rgba(7,17,27,0)
		&.fade-enter-active,&fade-leave-active
			background: rgba(7,17,27,0.8)
			transition: all 0.3s;
		.detail
			min-height:100%	
			height:auto
			.title-wrapper
				font-size:16px
				font-weight:700
				color:#fff
				line-height:16px
				text-align:center
				margin-top:64px
				margin-bottom:28px
				.star
					height:24px
					line-height:24px
					font-size:16px
					margin-top:16px
			.supports-wrapper
				font-size:10px
				text-align:center
				height:100%
				padding:0 36px
				.support
					overflow: auto
					padding-bottom:64px
					.title
						display:flex
						margin-bottom:24px
						.line
							border-bottom:1px solid rgba(255,255,255,0.4)
							flex:1
							position:relative
							bottom:6px
						span
							padding:0 12px
							font-size:14px
							font-weight:700	
					ul
						padding-left:12px
						padding-bottom:24px
						text-align:left
						li
							height:16px
							margin-top:12px
							.icon
								display:inline-block
								width:12px
								height:12px;
								margin-right:4px
								vertical-align:top
								background-size:12px 12px
								&.decrease
									bg-image('decrease_1')
								&.discount
									bg-image('discount_1')
								&.special
									bg-image('special_1')
								&.invoice
									bg-image('invoice_1')
								&.guarantee
									bg-image('guarantee_1')
							.text
								font-size:12px
								color:#fff
								line-height:12px
								display:inline-block
								vertical-align:top
					.detail-main
						text-align:left
						.bulletin
							line-height:24px
							font-size:12px
							padding:0 12px			
				    
		.button
 	    	text-align:center
 	    	margin:-64px auto
 	    	clear:both
 	    	position:relative
 	    	width:32px
 	    	height:32px  
 	    	overflow:hidden 
 	    	.icon-close
 	    		font-size:32px	 		
</style>
