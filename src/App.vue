<template>
  <div id="app">
    <router-view :key="$route.fullpath"></router-view>
    <router-view :key="$route.fullpath" name="menu"></router-view>
    <vue-model></vue-model>
    <modal></modal>
  </div>
</template>

<script>
import modal from "./components/layer";
export default {
  name: 'App',
  components:{
  	modal
  },
  created(){
  	console.log(this);
  }
}
</script>
