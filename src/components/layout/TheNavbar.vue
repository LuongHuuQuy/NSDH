<template>
    <div class="ms-navbar" id="navbar">
        <router-link to="/user">
            <div class="ms-menu-list" :class="{'active-menu-list': isActive==1}" @click="active(1)">
                <div class="icon-tab icon-tab-flex icon-employee"></div>
                <div class="name-tab">Người dùng</div>
            </div>
        </router-link>
        <router-link to="/permission">
            <div class="ms-menu-list" :class="{'active-menu-list': isActive==2}" @click="active(2)">
                <div class="icon-tab icon-tab-flex icon-role"></div>
                <div class="name-tab">Vai trò</div>
            </div>
        </router-link>
        <router-link to="/user-group">
            <div class="ms-menu-list" :class="{'active-menu-list': isActive==3}" @click="active(3)">
                <div class="icon-tab icon-tab-flex icon-multiple-user"></div>
                <div class="name-tab">Nhóm người dùng</div>
            </div>
        </router-link>
        <router-link to="/connect">
            <div class="ms-menu-list" :class="{'active-menu-list': isActive==4}" @click="active(4)">
                <div class="icon-tab icon-tab-flex icon-share-link"></div>
                <div class="name-tab">Kết nối</div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'TheNavbar',
    data(){
        return{
            isActive: 0,
        }
    },
    methods:{
        /**
         * Chức năng: Thay đổi màu khi active vào navigation
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 03/08/2022
         */
        active(id){
            this.isActive=id;
        }
    }
}
</script>