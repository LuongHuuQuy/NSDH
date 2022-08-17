<template>
    <div class="ms-container" id="container">
        <TheNavbar/>
        <router-view></router-view>
    </div>
</template>

<script>
import TheNavbar from "./TheNavbar.vue";
export default{
    name: 'TheContainer',
    components:{
        TheNavbar,
    },
    data(){
        return{
            
        }
    }
}
</script>