<template>
	<div class="cartcontrol">
		<i class="icon-remove_circle_outline" v-show="food.count" @click.stop="decreseCart"></i>
		<span v-show="food.count">{{food.count}}</span>
		<i class="icon-add_circle" @click.stop="addCart"></i>
	</div>
</template>
<script>
import Vue from 'vue';
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
	span
		font-size:12px
		padding:0 6px
		vertical-align:middle
</style>