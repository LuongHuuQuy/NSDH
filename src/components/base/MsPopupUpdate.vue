<template>
    <div class="ms-popup-delete" id="update-user">
        <div class="popup-delete-container popup-delete-container">

            <!-- Phần Header -->
            <div style="height: 53px">
                <div class="popup-delete-header">
                    <div class="delete-header-title">
                        <h2><span>Sửa người dùng</span></h2>
                    </div>
                    <div class="ms-popup-close" @click="iconClosePopupUpdate">
                        <div class="add-user-close">
                            <i></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Phần Main -->
            <div class="popup-update-content">
                <div class="item-wrap">
                    <div class="avatar-update-user">
                        <!-- <img src="../../assets/img/Imageavt.png" alt="avatar"> -->
                        <div class="td-background-color" :class="{
                            'td-color-red': userSelected.UserCode.substr(-1,1) == '2',
                            'td-color-green': userSelected.UserCode.substr(-1,1) == '3',
                            'td-color-pink': userSelected.UserCode.substr(-1,1) == '4',
                            'td-color-violet': userSelected.UserCode.substr(-1,1) == '5',
                            'td-color-orange': userSelected.UserCode.substr(-1,1) == '6',
                            'td-color-blue': userSelected.UserCode.substr(-1,1) == '7',
                            'td-color-dkorange': userSelected.UserCode.substr(-1,1) == '8',
                            'td-color-gray': userSelected.UserCode.substr(-1,1) == '9'
                        }">
                            <b class="td-flex-text">{{userSelected.UserName.substr(0,1).toUpperCase()}}{{formatTextAvatar(userSelected.UserName)}}</b>
                        </div>
                    </div>
                    <div class="update-user-text">
                        <div>
                            <span><b>{{userSelected.UserName}}</b></span>
                            <span style="margin-left: 4px">({{userSelected.UserCode}})</span>
                        </div>
                        <div class="title-email">
                            <span>{{userSelected.Email}}</span>
                        </div>
                        <div>
                            <span>{{userSelected.PositionName}}</span>
                            <span> - </span>
                            <span>{{userSelected.DepartmentName}}</span>
                        </div>
                    </div>
                </div>
                <label class="update-user-lable"><p>Vai trò <span>* </span></p></label>
                <div class="update-role-content">
                    <div class="role-content-col" v-for="update in updateUserRole" :key="update.id">
                        <div class="role-col-item">
                            <label>
                                <span><DxCheckBox :icon-size="16" v-model="update.check" @valueChanged="clickCheckChange"/></span>
                                <span class="col-item-content"><div>{{update.name}}</div></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Phần footer -->
            <div class="ms-popup-footer">
                <button class="ms-button btn-user-exit" @click="iconClosePopupUpdate">
                    <span class="ms-button-text">Hủy</span>
                </button>
                <button class="ms-button btn-user-add custom-btn-add" @click="btnUpdateUserRole">
                    <span class="ms-button-text">Lưu</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'MsPopupUpdate',
    props:{
        userSelected:{    // Đối tượng hiện tại
            type: []
        }
    },
    data(){
        return{
            userRoleDetail: [],  // Chi tiết Vai trò của từng User được truyền sang
            updateUserRole: [    // Bắn dữ liệu vào popup cập nhật
                {id: "34bd2cef-5026-567c-3b71-153b37881afe", check: false, name: "Quản lý"},
                {id: "674934cc-42cf-20cf-1d4a-aea48a10ed18", check: false, name: "Nhân viên"},
                {id: "64a59a25-2488-54b0-f6b4-c8af08a50cbf", check: false, name: "Quản trị ứng dụng Quy trình"},
                {id: "43a6bdf5-1b6b-451b-3695-2c566fa88632", check: false, name: "Quản trị hệ thống"}
            ],
            checkUpdate: [],    // Kiểm tra, Phân loại nghiệp vụ trước khi gọi api
            userRole: [
                {UserID: ""},
                {RoleID: ""},
                {User_RoleName: ""},
                {Status: 0},
            ],
            listupdateUserRole: []  // Danh sách gửi về api để thực hiện cập nhật
        }
    },
    methods:{
        /**
         * Chức năng: Cắt chuỗi thành avatar
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 11/08/2022
         */
        formatTextAvatar(text){
            try {
                var x = text.split(" ");
                var data = x[x.length-1].trim().substr(0,1);
                return data;
            } catch (error) {
                console.log(error, "Có lỗi khi cắt chuổi ghéo vào avatar !")
            }
        },

        /**
         * Chức năng: Xử lý dữ liệu khi Click chọn vai trò
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 15/08/2022
         */
        async clickCheckChange(){
            var me = this;
            var i = 0;
            me.listupdateUserRole = [];

            // Thêm các vai trò vào danh sách để bắn vào api
            await me.updateUserRole.forEach(element => {
                me.userRole[i].UserID = me.userSelected.UserID;
                me.userRole[i].RoleID = element.id;
                me.userRole[i].User_RoleName = element.name;

                if(element.check == me.checkUpdate[i].check){
                    me.userRole[i].Status = 0;
                    me.listupdateUserRole.push(me.userRole[i]);
                } else
                if(element.check == true && me.checkUpdate[i].check == false){
                    me.userRole[i].Status = 1;
                    me.listupdateUserRole.push(me.userRole[i]);
                } else
                if(element.check == false && me.checkUpdate[i].check == true){
                        me.userRole[i].Status = 2;
                        me.listupdateUserRole.push(me.userRole[i]);
                    }
                i++;
            });
        },
        
        /**
         * Chức năng: Thực hiện cập nhật vai trò 
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 11/08/2022
         */
        btnUpdateUserRole(){
            try {
                // debugger;
                // console.log(this.listupdateUserRole);
                var me = this;
                axios.put(`http://localhost:5224/api/User_Roles/UserRoles`, me.listupdateUserRole)
                    .then(function(){
                        me.$emit("btnShowPopupUpdateParameter",false);
                        me.$emit("reloadDetail");
                        me.$emit("pagination");
                    })
                    .catch(function(err){
                        console.log(err, "Có lỗi khi gọi api cập nhật vai trò !")
                    })
            } catch (error) {
                console.log(error, "Có lỗi xảy ra khi cập nhật vai trò !")
            }
        },

        /**
         * Chức năng: Tắt Popup xác nhận xóa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 03/08/2022
         */
        iconClosePopupUpdate(){
            this.$emit("btnShowPopupUpdateParameter",false);
        }
    },

    async created(){
        try {
            var me=this;

            // gọi api lấy từng vai trò của User
            await axios.get(`http://localhost:5224/api/User_Roles/GetID?id=${me.userSelected.UserID}`)
                .then(function(res){
                    me.userRoleDetail = res.data;
                })
                .catch(function(res){
                    console.log(res,"Có lỗi khi gọi axios gán giá trị vai trò của từng User!")
                })
            
            // Kiểm tra xem vai trò nào được Check
            this.userRoleDetail.forEach(element => {
                this.updateUserRole.forEach(item => {
                    if(element.User_RoleName == item.name){
                        item.check=true;
                    }
                });
            });

            // Gán cố định trạng thái check của từng vai trò
            this.checkUpdate = JSON.parse(JSON.stringify(me.updateUserRole));

        } catch (error) {
            console.log(error,"Có lỗi xảy ra khi sửa User!")
        }
    },
    updated(){}
}
</script>