<template>
	<div class="cartcontrol">
		<transition name="fade">
			<i class="icon-remove_circle_outline first" v-show="food.count" @click.stop="decreseCart"></i>
		</transition>
		<span v-show="food.count">{{food.count}}</span>
		<i class="icon-add_circle" @click.stop="addCart"></i>
	</div>
</template>
<script>
import Vue from 'vue';
var Event = new Vue();
	export default {
		name: "cartcontrol",
		props: {
			food:{
				type:Object
			}
		},
		methods: {
			addCart(){
				if(!this.food.count){
					Vue.set(this.food,'count',1);
					 Event.$emit("a-msg", this.food);
				}else{
					this.food.count++;
				}

			},
			decreseCart(){
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
	font-size:0
	i
		font-size:16px
		color:rgb(0,160,220)
		padding:6px
		vertical-align:middle
		display:inline-block
	.first
		transform: translate(0,0) rotate(-180deg) 
		&.fade-enter,&.fade-leave-to
			opacity:0
			transform:translate(20px,0) rotate(0deg) 
		&.fade-enter-active,&.fade-leave-active
			transition:all 0.3s	
	span
		font-size:12px
		padding:0 6px
		vertical-align:middle
</style>