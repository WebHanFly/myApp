<template>
	<div id="star" :class="startype">
		<span v-for="star in starFloor" class="starFull"></span>
		<span v-show="halfStar" class="starHalf"></span>
		<span v-for="starN in starNull" class="starNull"></span>
	</div>
</template>
<script>
	export default {
		props: {
			score: {
				type: Number,
				default:3.7
			},
			size: {
				type: Number,
				default: 20
			}
		},
		data(){
			return {
				msg: "hello",
				// score: this.score
			}
		},
		computed:{
			startype(){
				return "star-"+this.size;
			},
			starFloor(){
				return Math.floor(this.score);
			},
			starCeil(){
				return Math.ceil(this.score);
			},
			starNull(){
				let starFloor = Math.floor(this.score);
				let starRound = Math.round(this.score);
				let starCeil = Math.ceil(this.score);
				let half = starCeil - starRound;
				if(half == 0){
					return 5-starCeil;
				}else{
					return 5-starFloor;
				}
			},
			halfStar(){
				let starFloor = Math.floor(this.score);
				let starRound = Math.round(this.score);
				let starCeil = Math.ceil(this.score);
				let isInt = starCeil - starFloor  //判断是否为整数。
				let half = starCeil - starRound;
				if(half == 0 && isInt != 0){
					return true;
				}else{
					return false
				}
			}
		}
	}
</script>
<style coped lang="stylus" rel="stylesheet/stylus"> 
@import "../../common/stylus/mixin"	
.star-20
	.starFull
		width:20px
		height:20px
		display:inline-block
		margin-right:20px
		bg-image:('star48_on')
		background-size:20px 20px
	.starHalf
		width:20px
		height:20px
		margin-right:20px
		display:inline-block
		bg-image:('star48_half')
		background-size:20px 20px
	.starNull
		width:20px
		height:20px
		margin-right:20px
		display:inline-block
		bg-image:('star48_off')
		background-size:20px 20px
.star-10
	.starFull
		width:10px
		height:10px
		display:inline-block
		margin-right:10px
		bg-image:('star24_on')
		background-size:10px 10px
	.starHalf
		width:10px
		height:10px
		display:inline-block
		margin-right:10px
		bg-image:('star24_half')
		background-size:10px 10px
	.starNull
		width:10px
		height:10px
		display:inline-block
		margin-right:10px
		bg-image:('star24_off')
		background-size:10px 10px
</style>
