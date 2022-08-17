<template>
    <div class="ms-popup-delete" id="delete-user">
        <div class="popup-delete-container">

            <!-- Nội dung phần header -->
            <div style="height: 53px">
                <div class="popup-delete-header">
                    <div class="delete-header-title">
                        <h2><span>Xóa người dùng</span></h2>
                    </div>
                    <div class="ms-popup-close" @click="iconClosePopupDelete">
                        <div class="add-user-close">
                            <i></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Nội dung phần main -->
            <div class="popup-delete-content">
                <div>
                    <span>Bạn có chắc chắn muốn xóa </span>
                    <span>
                        <span class="text-bold"> {{userSelected.UserName}} </span> 
                        khỏi ứng dụng AMIS Quy trình 
                    </span>
                    <span>không?</span>
                </div>
            </div>

            <!-- Nội dung phần footer -->
            <div class="ms-popup-footer">
                <button class="ms-button btn-user-exit" @click="iconClosePopupDelete">
                    <span class="ms-button-text">Hủy</span>
                </button>
                <button class="ms-button btn-acept-delete" @click="btnDeleteUser">
                    <span class="ms-button-text">Xóa</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'MsPopupDelete',
    props:{
        userSelected:{
            type: []
        }
    },
    data(){
        return{
        }
    },
    methods:{
        /**
         * Chức năng: Thực hiện xóa người dùng
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 02/08/2022
         */
        btnDeleteUser(){ 
            try {
                var me = this;
                
                // Gọi api thực hiện xóa
                axios.delete(`http://localhost:5224/api/v1/Users?id=${me.userSelected.UserID}`)
                    .then(function(){
                        me.$emit("btnShowPopupDeleteParameter",false);
                        me.$emit("pagination");
                        me.$emit("reloadDetail");
                    })
                    .catch(function(err){
                        console.log(err,"Có lỗi xảy ra khi gọi api xóa người dùng !")
                    })
            } catch (error) {
                console.log(error,"Có lỗi xảy ra khi xóa người dùng !")
            }
        },
        
        /**
         * Chức năng: Tắt Popup xác nhận xóa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 03/08/2022
         */
        iconClosePopupDelete(){
            this.$emit("btnShowPopupDeleteParameter",false);
        }
    },
    created(){
    }
}
</script>