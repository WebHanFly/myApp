<template>
	<div class="ratingSelect-wrapper">
		<div class="ratingSelect">
			<p @click="selected(2)" :class="{active:selectType === 2}">{{desc.name1}}<span>1</span></p>
			<p @click="selected(0)" :class="{active:selectType === 0}">{{desc.name2}}<span>2</span></p>
			<p @click="selected(1)" :class="{active:selectType === 1}">{{desc.name3}}<span>3</span></p>
		</div>
		<div class="switch" @click="toggleContent">
			<span class="icon-check_circle" :class="{active:onlyContent}"></span>
			<span class="title">只看内容评价</span>
		</div>
	</div>
</template>
<script>
const ALL = 2;
	export default{
		name:"ratingSelect",
		props:{
			desc:{
				type:Object,
				default(){
					return  {
						name1:"全部",
						name2:"满意",
						name3:"不满意"
					}
				}
			},
			selectType:{
				type: Number,
				default(){
					return ALL
				}
			},
			onlyContent:{
				type:Boolean,
				dafault(){
					return false
				}
			}
		},
		data(){
			return {
				myonlyContent:this.onlyContent
			}
		},
		methods: {
			selected(type){
				this.$emit('increment',type);
			},
			toggleContent(){
				this.myonlyContent = !this.myonlyContent;
				this.$emit('increment',this.myonlyContent)
			}
		}

	}
</script>
<style>
	.ratingSelect {margin: 18px 0 0 0px;border-bottom: 1px solid rgba(7,17,27,0.1);padding-bottom: 18px;}
	.ratingSelect p {display: inline-block;margin-left: 8px;padding: 8px 12px;line-height: 16px;font-size: 12px;color: #000;background-color: rgba(0,160,220,0.2)}
	.ratingSelect p:first-child {margin-left: 0}
	.ratingSelect p.active {background-color: rgb(0,160,220);color: #fff}
	.ratingSelect p:last-child{background-color: rgba(77,85,93,0.2);}
	.ratingSelect p:last-child.active {background-color: rgb(77,85,93);color: #fff}
	.ratingSelect p span {margin-left: 6px;font-size: 8px;}
	.switch {margin:12px 0 12px 0px;}
	.switch span:first-child{color: rgba(77,85,93,0.4);font-size: 16px;}
	.switch span:first-child.active {color:rgb(0,160,220);}
	.switch span:last-child {font-size: 12px;vertical-align: 2px;}
</style>