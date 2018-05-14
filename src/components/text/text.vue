<template>
	<div style="position: absolute; top: 0;">
	  <ul @click="logIn">
	    <li v-for="item,index in StockArr.data">{{item.stock_name}}</li>
	  </ul>
	</div>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	export default {
		name:"test",
		data(){
			return{
				
			}
		},
		computed:mapState({
			StockArr:state=>{
				console.log(state)
				return state.StockArr
			}
		}),
		methods:mapActions({
					"logIn":dispatch=>{
						console.log(dispatch('logIn',1))
					}
				})
	}
</script>

<style>
</style>