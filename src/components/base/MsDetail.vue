<template>
    <div class="user-detail" id="base-detail-user">
        <div class="user-detail-container">
            <div class="user-detail-content">

                <!-- Phần header chi tiết người dùng -->
                <div class="mi-user-close" @click="closeUserDetail"></div>
                <div class="user-detail-header">
                    <div class="user-avatar-detail">
                        <div class="avatar">
                            <img src="../../assets/img/Imageavt.png" alt="avatar">
                        </div>
                    </div>
                    <div class="user-main">
                        <div class="user-fullname">{{userSelected.UserName}}</div>
                        <div class="user-email">{{userSelected.Email}}</div>
                        <div class="user-status">
                            <div class="comment">
                                <div class="dot"></div>
                                <span class="active">{{formatStatus(userSelected.Status)}}</span>
                            </div>
                        </div>
                        <div class="user-detail-options">
                            <button class="ms-button btn-update-detail" @click="btnShowPopupUpdate">
                                <span class="ms-button-text">Cập nhật</span>
                            </button>
                            <button class="ms-button btn-delete-detail" @click="btnShowPopupDelete">
                                <span class="ms-button-text">Xóa</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Phần thân chi tiết người dùng -->
                <div class="user-detail-body">
                    <div class="detail-body-title">THÔNG TIN CÔNG VIỆC</div>
                    <div class="user-detail-row row-top">
                        <div class="detail-row-title">
                            <div class="title-bold">Mã nhân viên</div>
                        </div>
                        <div class="detail-row-content">
                            <div class="content-usercode">{{userSelected.UserCode}}</div>
                        </div>
                    </div>
                    <div class="user-detail-row">
                        <div class="detail-row-title">
                            <div class="title-bold">Phòng ban</div>
                        </div>
                        <div class="detail-row-content">
                            <div class="content-usercode">{{userSelected.DepartmentName}}</div>
                        </div>
                    </div>
                    <div class="user-detail-row">
                        <div class="detail-row-title">
                            <div class="title-bold">Vị trí công việc</div>
                        </div>
                        <div class="detail-row-content">
                            <div class="content-usercode">{{userSelected.PositionName}}</div>
                        </div>
                    </div>
                    <div class="detail-body-title">THÔNG TIN PHÂN QUYỀN</div>
                    <div class="user-detail-role">
                        <div class="detail-role-full">
                            <div class="detail-role-content">
                                <div class="role-content-row row-role-text">Vai trò</div>
                            </div>
                            <div class="detail-role-content" v-for="ur in userRoleDetail" :key="ur.RoleID">
                                <div class="role-content-row">{{ur.User_RoleName}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Nội dung phần popup xác nhận xóa người dùng -->
        <MsPopupDelete
        v-if="isShowPopupDelete" 
        :userSelected="userSelected"
        @reloadDetail="reloadDetail"
        @btnShowPopupDeleteParameter="btnShowPopupDeleteParameter"/>

        <!-- Nội dung phần popup xác nhận Sửa người dùng -->
        <MsPopupUpdate
        v-if="isShowPopupUpdate"
        :userSelected="userSelected"
        @reloadDetail="reloadDetail"
        @btnShowPopupUpdateParameter="btnShowPopupUpdateParameter"/>

    </div>
</template>

<script>
import axios from 'axios';
import MsPopupDelete from "./MsPopupDelete.vue";
import MsPopupUpdate from "./MsPopupUpdate.vue";
export default {
    name: 'MsDetail',
    components:{
        MsPopupDelete,
        MsPopupUpdate,
    },
    props:{
        userSelected:{    // Đối tượng hiện tại
            type: []
        }
    },
    data(){
        return{
            userRoleDetail: [],  // Vai trò của từng User được truyền sang
            isShowPopupDelete: false,
            isShowPopupUpdate: false,
        }
    },
    methods:{
        /**
         * bật tắt popup Sửa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 04/08/2022
         */
        btnShowPopupUpdate(){
            this.btnShowPopupUpdateParameter(true);
        },

        /**
         * Truyền biến giúp bật tắt danh mục Sửa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 03/08/2022
         */
        btnShowPopupUpdateParameter(isShow){
            this.isShowPopupUpdate=isShow;
        },

        /**
         * Chức năng: bật tắt popup Xóa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 04/08/2022
         */
        btnShowPopupDelete(){
            this.btnShowPopupDeleteParameter(true);
        },

        /**
         * Chức năng: Truyền biến giúp bật tắt danh mục Xác nhận xóa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 03/08/2022
         */
        btnShowPopupDeleteParameter(isShow){
            this.isShowPopupDelete=isShow;
        },

        /**
         * Chức năng: Đóng danh mục chi tiết người dùng
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 03/08/2022
         */
        closeUserDetail(){
            this.$emit("showUserDetailParameter",false);
        },
        c(){
            this.$emit("showUserDetailParameter",false);
        },

        /**
         * Chức năng: Thực hiện load lại dữ liệu khi xóa và cập nhật
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 10/08/2022
         */
        reloadDetail(){
            this.$emit("pagination");
            this.$emit("showUserDetailParameter",false);
        },

        /**
         * Chức năng: Định dạng lại dữ liệu trạng thái
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 04/08/2022
         */
        formatStatus(id){
            if(id==1){
                return "Đang hoạt động";
            }
            if(id==2){
                return "Chờ xác nhận";
            }
            if(id==3){
                return "Chưa kích hoạt";
            }
            if(id==4){
                return "Ngừng kích hoạt";
            }
        },
    },
    created(){
        try {
            var me=this;

            // gọi api lấy từng vai trò của user
            axios.get(`http://localhost:5224/api/User_Roles/GetID?id=${me.userSelected.UserID}`)
                .then(function(res){
                    me.userRoleDetail = res.data;
                    me.$refs.isFocusDetail.focus();
                })
                .catch(function(res){
                    console.log(res,"Có lỗi khi gọi axios gán giá trị vai trò của từng User!")
                })
        } catch (error) {
            console.log(error,"Có lỗi xảy ra khi xem chi tiết User !")
        }
    },
    updated(){
        
    }
}
</script>