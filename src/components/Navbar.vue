<template>
    <div class="nav container">
        <div class="brand">
            <router-link :to="{name:'Index'}">
                <img src="@/assets/img/BrandIcon.png" alt="">
            </router-link>
        </div>
        <div class="search">
            <input type="text" name="search" placeholder="Search..." v-model="searchTerm" @keyup ="submit">
        </div>
        <div class="logout">
            <!-- <router-link :to=> -->
                <img src="@/assets/img/logout.png" alt="">
                <span>Logout</span>
            <!-- </router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name : 'Navbar',
    
    data(){
        return{
            searchTerm :'',
        }
    },
    methods:{
        submit(){
            this.$emit("inputData", this.searchTerm)
            this.tempMessage = ""
        }
    }
}

</script>

<style lang="scss">

.nav{
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    .brand{
        height: 40px;
        width: auto;
    }
    .search{
        height: 40px;
        width:40%;
        border-radius: 10px;
        background: #ccc;
        position: relative;
        // overflow: hidden;
        input{
            border :none;
            height: 40px;
            width:calc(100% - 20px);
            background: transparent;
            margin:0;
            padding:0 10px;
            border-radius: 10px;
            &:focus{
                outline:none;
                box-shadow: 0px 12px 24px -10px rgba(0, 0, 0, 0.2);

            }
            &::placeholder{
                color: #999;
                font-weight:500;
            }
        }
    }
    .logout{
        width:auto;
        height: 40px;
        /* background : red; */
        display:flex;
        align-items: center;
        span{
            margin-left: 5px;
            font-weight: bold;
            color: #666;
            }
    }
}
</style>
