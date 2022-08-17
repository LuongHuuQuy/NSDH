<template>
    <div class="ms-content" id="detail-user">
        <div class="ms-content-full">
            <div class="content-header">
                <div class="content-header-flex">
                    <div class="content-header-name">
                        Người dùng
                    </div>
                </div>
                <button class="ms-button" @click="btnShowDialogAdd">
                    <div class="ms-icon-default">
                        <i class="icon-btn-add"></i>
                    </div>
                    <span class="ms-button-text">Thêm mới</span>
                </button>
            </div>
            <div class="content-main">

                <!-- Nội dung phần Header -->
                <div class="content-main-header">
                    <div class="input-search-user">
                        <div class="global-search">
                            <div class="icon-search"></div>
                            <input ref="isFocusSearch" v-model="searchData" @keyup="kprSearch" placeholder="Tìm kiếm người dùng" type="text" class="input-search">
                        </div>
                    </div>
                    <div class="select-box-role">
                        <DxSelectBox 
                            :dataSource="userRoleFilters"
                            :value-expr="id"
                            :display-expr="name"
                            v-model="roleFilter"                   
                            @itemClick="roleFilters()"
                            placeholder="Chọn vai trò" 
                            class="ms-select-box"/>
                    </div>
                    <div class="content-main-setting">
                        <div @click="showPopupCustom(1)" class="icon-setting" title="Tùy chỉnh"></div>
                        <div v-if="isShowPopupCustom" class="popup-custom-main">
                            <div class="popup-custom-header">
                                <div class="custom-header-title">
                                    <div class="custom-text-header">Tùy chỉnh cột</div>
                                    <div @click="showPopupCustom(2)" class="ms-popup-close" title="Đóng">
                                        <div class="add-user-close">
                                            <i></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-search-user custom-input-header">
                                    <div class="global-search custom-global">
                                        <div class="icon-search"></div>
                                        <input ref="isFocusCustom" placeholder="Tìm kiếm" type="text" class="input-search width-auto">
                                    </div>
                                </div>
                            </div>
                            <div class="popup-custom-container">
                                <div class="list-group-item not-action">
                                    <div class="group-item-content">
                                        <DxCheckBox :icon-size="16" v-model="fixTrue" class="fix-active"/>
                                        <span class="slot-lable">
                                            <div class="slot-lable-text">Mã nhân viên</div>
                                        </span>
                                    </div>
                                    <div class="all-scroll">
                                        <i></i>
                                    </div>
                                </div>
                                <div class="list-group-item not-action">
                                    <div class="group-item-content">
                                        <DxCheckBox :icon-size="16" v-model="fixTrue" class="fix-active"/>
                                        <span class="slot-lable">
                                            <div class="slot-lable-text">Họ và tên</div>
                                        </span>
                                    </div>
                                    <div class="all-scroll">
                                        <i></i>
                                    </div>
                                </div>
                                <div v-for="item in listColum" :key="item.id" class="list-group-item">
                                    <div class="group-item-content">
                                        <DxCheckBox :icon-size="16" v-model="item.isCheck"/>
                                        <span class="slot-lable">
                                            <div class="slot-lable-text">{{item.name}}</div>
                                        </span>
                                    </div>
                                    <div class="all-scroll">
                                        <i></i>
                                    </div>
                                </div>
                            </div>

                            <div class="popup-custom-footer">
                                <button class="ms-button btn-user-exit btn-custom" @click="clickCustomDefault()">
                                    <span class="ms-button-text custom-text">Lấy lại mặc định</span>
                                </button>
                                <button class="ms-button" @click="changeCustom()">
                                    <span class="ms-button-text">Áp dụng</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Nội dung phần Main -->
                <div class="grid-container">
                    <div class="grid-content">
                        <div class="table-user">
                            <table class="table-user-detail">
                                <thead class="user-thead">
                                    <tr>
                                        <th class="th-usercode">Mã nhân viên</th>
                                        <th class="th-username">Họ và tên</th>
                                        <th v-if="listCustomColum[0].isCheck" class="th-role">Vai trò</th>
                                        <th v-if="listCustomColum[1].isCheck" class="th-status">Trạng thái</th>
                                        <th v-if="listCustomColum[2].isCheck" class="th-department">Phòng ban</th>
                                        <th v-if="listCustomColum[3].isCheck" class="th-position">Vị trí công việc</th>
                                        <th v-if="listCustomColum[4].isCheck" class="th-email">Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="user-tbody">
                                    <tr v-for="user in users" :key="user.UserID" @click="showUserDetail(user)">
                                        <td class="td-usercode">{{user.UserCode}}</td>
                                        <td class="td-username">
                                            <div class="td-username-flex">
                                                <div class="td-username-avatar">
                                                    <div class="td-background-color" :class="{
                                                        'td-color-red': user.UserCode.substr(-1,1) == '2',
                                                        'td-color-green': user.UserCode.substr(-1,1) == '3',
                                                        'td-color-pink': user.UserCode.substr(-1,1) == '4',
                                                        'td-color-violet': user.UserCode.substr(-1,1) == '5',
                                                        'td-color-orange': user.UserCode.substr(-1,1) == '6',
                                                        'td-color-blue': user.UserCode.substr(-1,1) == '7',
                                                        'td-color-dkorange': user.UserCode.substr(-1,1) == '8',
                                                        'td-color-gray': user.UserCode.substr(-1,1) == '9'
                                                    }">
                                                        <b class="td-flex-text">{{user.UserName.substr(0,1).toUpperCase()}}{{formatTextAvatar(user.UserName)}}</b>
                                                    </div>
                                                </div>
                                                <div>{{user.UserName}}</div>
                                            </div>
                                        </td>
                                        <td v-if="listCustomColum[0].isCheck" class="td-role">{{user.RoleName}}</td>
                                        <td v-if="listCustomColum[1].isCheck" class="td-status">
                                            <div class="td-status-container" 
                                            :class="{'status-color-active': user.Status==1,'status-color-wait': user.Status==2,'status-color-not': user.Status==3,'status-color-cease': user.Status==4}">
                                                {{formatStatus(user.Status)}}
                                                <span></span>
                                            </div>
                                        </td>
                                        <td v-if="listCustomColum[2].isCheck" class="td-department">{{user.DepartmentName}}</td>
                                        <td v-if="listCustomColum[3].isCheck" class="td-position">{{user.PositionName}}</td>
                                        <td v-if="listCustomColum[4].isCheck" class="td-email">{{user.Email}}</td>
                                        <td class="td-btn">
                                            <div class="tbl-btn">
                                                <div class="tbl-btn-update" @click="btnShowPopupUpdate(user,$event)">
                                                    <i class="block-update"></i>
                                                </div>
                                                <div class="tbl-btn-delete" @click="btnShowPopupDelete(user,$event)">
                                                    <i class="block-delete"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="ic-loading" v-if="isShowLoading">
                                <div class="spinner"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Nội dung phần footer -->
                    <div class="footer">
                        <div class="pagging">
                            <div class="page-total">Tổng số bản ghi: <b>{{usersCount}}</b></div>
                            <div class="page-left-flex">
                                <div class="page-size-selector">
                                    <div class="page-curent">Số bản ghi/trang</div>
                                    <div class="btn-page-size">
                                        <DropDown 
                                        @reloadPage="reloadPage"
                                        @pagination="pagination"
                                        @setPageSize="setPageSize"/>
                                    </div>
                                    <div class="page-info">
                                        <b>{{recordStart}}</b> - <b>{{recordEnd}}</b> bản ghi 
                                    </div>
                                </div>
                                <div class="page-next-preview">
                                    <div class="page-align page-preview" :class="{'disble-pagging': pageIndex==1}" @click="pagination(--pageIndex)">
                                        <i class="icon-page-size"></i>
                                    </div>
                                    <div class="page-align page-next" :class="{'disble-pagging': recordEnd==usersCount}" @click="pagination(++pageIndex)">
                                        <i class="icon-page-size"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Nội dung phần Dialog thêm mới người dùng -->
        <DialogAddUser
        v-if="isShowDialogAddUser"
        @pagination="pagination"
        @btnShowDialogAddParameter="btnShowDialogAddParameter"
        />

        <!-- Nội dung phần chi tiết người dùng -->
        <MsDetail
        v-if="isShowUserDetail"
        @pagination="pagination"
        :userSelected="userSelected"
        @showUserDetailParameter="showUserDetailParameter"/>

        <!-- Nội dung phần popup xác nhận xóa người dùng -->
        <MsPopupDelete
        v-if="isShowPopupDelete"
        @pagination="pagination"
        :userSelected="userSelected"
        @btnShowPopupDeleteParameter="btnShowPopupDeleteParameter"/>

        <!-- Nội dung phần popup xác nhận Sửa người dùng -->
        <MsPopupUpdate
        v-if="isShowPopupUpdate"
        @pagination="pagination"
        :userSelected="userSelected"
        @btnShowPopupUpdateParameter="btnShowPopupUpdateParameter"/>

    </div>
</template>

<script>
import axios from "axios";
import MsDetail from "../components/base/MsDetail.vue";
import DialogAddUser from "../components/base/DialogAddUser.vue";
import MsPopupDelete from "../components/base/MsPopupDelete.vue";
import MsPopupUpdate from "../components/base/MsPopupUpdate.vue";
import DropDown from "../components/base/DropDown.vue";
export default{
    name: 'TheUserDetail',
    components:{
        MsDetail,
        DialogAddUser,
        MsPopupDelete,
        MsPopupUpdate,
        DropDown
    },
    data(){
        return{
            users: [],                   // Đối tượng User
            userSelected: [],            // Truyền đối tượng User
            usersCount: 0,               // Tổng số bản ghi các User
            isShowLoading: false,        // Bật tắt Icon Loading
            isShowUserDetail: false,     // Bật tắt chi tiết User
            isShowDialogAddUser: false,  // Bật tắt Dialog thêm mới User
            isShowPopupDelete: false,    // Bật tắt popup xác nhận xóa User
            isShowPopupUpdate: false,    // Bật tắt popup xác nhận sửa User
            isShowPopupCustom: false,    // Bật tắt mục tùy chỉnh cột
            searchData: "",              // Từ khóa Search
            recordStart: 0,              // bản ghi đầu tiên
            recordEnd: 0,                // bản ghi cuối cùng
            pageIndex: 1,                // Trang hiện tại
            pageSize: 15,                // Số lương bản ghi hiện tại
            userRoleFilters: ["Tất cả", "Nhân viên", "Quản trị hệ thống", "Quản trị ứng dụng Quy trình", "Quản lý"],
            roleFilter: "",              // Tìm kiếm theo vai trò
            fixTrue: true,               // gán mặc định 2 cột mã và họ tên
            listCustomColum: [
                {id: 0, isCheck: true, name:"Vai trò"},
                {id: 1, isCheck: true, name:"Trạng thái"},
                {id: 2, isCheck: true, name:"Phòng ban"},
                {id: 3, isCheck: true, name:"Vị trí công việc"},
                {id: 4, isCheck: true, name:"Email"},
            ],
            listColum: [],
        }
    },
    computed: {
        // classObject: function(){
        //     return {
        //         'td-color-red': this.users[1].UserCode.substr(-1,1) == '8',
        //         'td-color-green': this.users[1].UserCode.substr(-1,1) == '2',
        //     }
        // }
    },
    methods: {
        /**
         * Chức năng: Lấy lại mặc định cột
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 16/08/2022
         */
        async clickCustomDefault(){
            try {
                var me = this;
                this.isShowPopupCustom = false;
                this.isShowLoading = true;
                await setTimeout(function(){
                    me.isShowLoading = false;
                    me.listCustomColum.forEach(element => {
                        element.isCheck = true;
                    });
                },1500)
                this.$refs.isFocusSearch.focus();
            } catch (error) {
                console.log(error, "Có lỗi khi lấy lại định dạng mặc định các cột !") 
            }
        },

        /**
         * Chức năng: Tùy chỉnh cột dữ liệu
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 16/08/2022
         */
        async changeCustom(){
            try {
                var me=this;
                this.isShowPopupCustom = false;
                this.isShowLoading = true;
                await setTimeout(function(){
                    me.isShowLoading = false;
                    me.listCustomColum = me.listColum;
                },1500)
                this.$refs.isFocusSearch.focus();
            } catch (error) {
                console.log(error, "Có lỗi khi áp dụng cột !") 
            }
        },

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
         * Chức năng: Phân trang theo số lượng bản ghi
         * Người tạo: Lương Hữu Quý
         * Ngày tạo: 10/08/2022
         */
        roleFilters(){
            try {
                this.baseSearch();
            } catch (error) {
                console.log(error, "Có lỗi xảy ra khi baseSearch !!!");
            }
        },

        /**
         * Chức năng: Tìm kiếm dữ liệu theo từ khóa
         * Người tạo: Lương Hữu Quý
         * Ngày tạo: 04/08/2022
         */
        kprSearch(){
            try {
                this.baseSearch();
            } catch (error) {
                console.log(error, "Có lỗi xảy ra khi gọi baseSearch !!!");
            }
        },

        /**
         * Chức năng: Thực hiện công việc chung cho tìm kiếm và lọc dữ liệu
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 09/08/2022
         */
        async baseSearch(){
            try {
                var me = this;
                this.pageIndex = this.recordStart = 1;
                this.recordEnd = this.pageSize;
                if(this.roleFilter=="Tất cả"){
                    this.roleFilter="";
                }
                this.isShowLoading = true;
                setTimeout(function(){

                    // Thực hiện tìm kiếm dữ liệu và lọc
                    axios.get(`http://localhost:5224/api/v1/Users/search?filter=${me.searchData}&roleNameFilter=${me.roleFilter}&pageIndex=${me.pageIndex}&pageSize=${me.pageSize}`)
                        .then(function(res){
                            if(res==null)
                                return console.log(res, "Không tìm thấy dữ liệu trả về");
                            me.users = res.data.Data;
                            me.usersCount = res.data.TotalRecord;
                            me.isShowLoading = false;
                            if(me.recordEnd > me.usersCount){
                                me.recordEnd=res.data.TotalRecord;
                            }
                        })
                        .catch(function(err){
                            console.log(err, "Có lỗi xảy ra khi gọi api search");
                        })
                }, 2000);
            } catch (error) {
                console.log(error, "Có lỗi xảy ra khi tìm kiếm và lọc !");
            }
        },

        /**
         * Chức năng: Cập nhật lại PageSize
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 10/08/2022
         */
        setPageSize(pageSizeparam){
            this.pageSize = pageSizeparam;
        },

        /**
         * Chức năng: hiển thị danh mục chi tiết người dùng
         * Người tạo: Lương Hữu Quý
         * Ngày tạo: 02/08/2022
         */
        showUserDetail(user){
            try {
                this.userSelected=user;
                this.showUserDetailParameter(true);
            } catch (error) {
                console.log(error, "Có lỗi khi hiển thị chi tiết User !")
            }
        },

        /**
         * Truyền biến giúp bật tắt danh mục chi tiết người dùng
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 02/08/2022
         */
        showUserDetailParameter(isShow){
            this.isShowUserDetail=isShow;
        },

        /**
         * Chức năng: bật tắt dialog thêm mới người dùng
         * CreatedBy: Lương Hữu Quý 
         * CreatedDate: (02/08/2022)
         */
        btnShowDialogAdd(){
            this.btnShowDialogAddParameter(true);
        },

        /**
         * Truyền biến giúp bật tắt danh mục thêm mới User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 02/08/2022
         */
        btnShowDialogAddParameter(isShow){
            this.isShowDialogAddUser=isShow;
        },

        /**
         * bật tắt popup Xóa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 04/08/2022
         */
        btnShowPopupDelete(user,event){
            try {
                event.preventDefault();
                event.stopPropagation();
                this.userSelected=user;
                this.btnShowPopupDeleteParameter(true);
            } catch (error) {
                console.log(error, "Có lỗi khi hiển thị Xóa User !")
            }
            
        },

        /**
         * Truyền biến giúp bật tắt danh mục Xác nhận xóa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 03/08/2022
         */
        btnShowPopupDeleteParameter(isShow){
            this.isShowPopupDelete=isShow;
        },

        /**
         * bật tắt popup Sửa User
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 04/08/2022
         */
        btnShowPopupUpdate(user,event){
            try {
                event.preventDefault();
                event.stopPropagation();
                this.userSelected=user;
                this.btnShowPopupUpdateParameter(true);
            } catch (error) {
                console.log(error, "Có lỗi xảy ra khi hiện form Update!");
            }
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
         * Chức năng: Bật tắt tùy chỉnh cột
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 13/08/2022
         */
        showPopupCustom(isCheck){
            if(isCheck==1){
                this.isShowPopupCustom = true;
                this.listColum = JSON.parse(JSON.stringify(this.listCustomColum));
                this.$nextTick(() => this.$refs.isFocusCustom.focus());
            } else
                this.isShowPopupCustom = false;
                this.$refs.isFocusSearch.focus();
        },
        
        /**
         * Chức năng: Định dạng lại dữ liệu trạng thái
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 04/08/2022
         */
        formatStatus(id){
            try {
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
            } catch (error) {
                console.log(error, "Lỗi khi format trạng thái !")
            }
            
        },

        /**
         * Chức năng: Lấy lại toàn bộ dữ liệu
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 04/08/2022
         */
        async reloadPage(){
            try {
                var me=this;
                this.pageIndex=1;
                this.isShowLoading = true;
                // Gọi api lấy dữ liệu
                await axios.get("http://localhost:5224/api/v1/Users")
                    .then(function(res){
                        me.users = res.data;
                        me.usersCount = me.users.length;
                        me.isShowLoading = false;
                    })
                    .catch(function(res){
                        console.log(res,"Không có dữ liệu trả về!");
                    })

            } catch (error) {
                console.log(error,"Có lỗi xảy ra khi lấy lại toàn bộ dữ liệu !");
            }
        },

        /**
         * Chức năng: Phân trang
         * CreatedBy: Lương Hữu Quý
         * CreatedDate: 10/08/2022
         */
        async pagination(){
            try {
                var me = this;
                if(this.roleFilter=="Tất cả"){
                    this.roleFilter="";
                }
                this.isShowLoading = true;
                setTimeout(function(){
                    // Thực hiện tìm kiếm dữ liệu và lọc
                    axios.get(`http://localhost:5224/api/v1/Users/search?filter=${me.searchData}&roleNameFilter=${me.roleFilter}&pageIndex=${me.pageIndex}&pageSize=${me.pageSize}`)
                        .then(function(res){
                            if(res==null)
                                return console.log(res, "Không tìm thấy dữ liệu trả về");
                            me.users = res.data.Data;
                            me.usersCount = res.data.TotalRecord;
                            me.recordStart = res.data.RecordStart;
                            me.recordEnd = res.data.RecordEnd;
                            me.isShowLoading = false;
                            if(me.recordEnd > me.usersCount){
                                me.recordEnd=res.data.TotalRecord;
                            }
                        })
                        .catch(function(err){
                            console.log(err, "Có lỗi xảy ra khi gọi api phân trang !");
                        })
                }, 500);
            } catch (error) {
                console.log(error, "Có lỗi xảy ra khi phân trang !");
            }
        }

    },
    async created(){
        try {
            await this.reloadPage();
            await this.pagination();
            this.$refs.isFocusSearch.focus();
        } catch (error) {
            console.log(error, "Lỗi khi khởi tạo giá trị ban đầu !")
        }
    },

    updated(){
        if(this.usersCount == 0){
            this.recordStart = 0;
        }
    }
}
</script>