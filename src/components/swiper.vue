<template>
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide"><img src="../assets/img/loop3.jpg"></div>		    	
		        <div class="swiper-slide"><img src="../assets/img/loop1.jpg"></div>
		        <div class="swiper-slide"><img src="../assets/img/loop2.jpg"></div>
		        <div class="swiper-slide"><img src="../assets/img/loop4.jpg"></div>
		    </div>
		    <div class="swiper-pagination"></div>
		</div>
</template>

<script>
	export default {
		name:"swiper",
		mounted(){
			var mySwiper = new swiper(this.$el, {
				loop:true,
				autoplay:true,
				pagination: {
			      el: '.swiper-pagination',
			    },
			})        
		}
	}
</script>
