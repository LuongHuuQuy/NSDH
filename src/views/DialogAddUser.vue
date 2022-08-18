<template>
  <div class="dialog-add-user" id="add-user">
    <div class="popup-add-user">
      <!-- Nội dung phần Header -->
      <div class="add-user-header">
        <div class="ms-popup-title">
          <h2><span>Thêm người dùng</span></h2>
        </div>
        <div class="ms-popup-close">
          <div class="add-user-close" @click="iconCloseDialog">
            <i></i>
          </div>
        </div>
      </div>

      <!-- Nội dung phần bảng dữ liệu -->
      <div class="add-user-content">
        <div class="add-user-table">
          <table class="table-add-all">
            <thead class="add-user-thead">
              <tr>
                <th class="add-th-stt">STT</th>
                <th class="add-th-usercode">Mã nhân viên <span>*</span></th>
                <th class="add-th-username">Họ và tên <span>*</span></th>
                <th class="add-th-department">Phòng ban <span>*</span></th>
                <th class="add-th-position">Vị trí công việc <span>*</span></th>
                <th class="add-th-email">Email <span>*</span></th>
                <th class="add-th-role">Vai trò <span>*</span></th>
                <th class="add-th-status">Trạng thái <span>*</span></th>
                <th class="th-btn-add"></th>
              </tr>
            </thead>
            <tbody class="add-user-tbody">
              <tr v-for="(user, index) in listUserRoles" :key="index">
                <td class="add-td-stt">{{ index + 1 }}</td>
                <td class="add-td-usercode">
                  <div class="input-add-user custom-usercode-div">
                    <input
                      v-model="user.UserCode"
                      type="text"
                      class="input-content custom-usercode-input"
                      maxlength="20"
                    />
                  </div>
                </td>
                <td class="add-td-username">
                  <div class="input-add-user" :class="{'simple-color-validate': checkNullItemObject(user.UserName)}">
                    <input
                      v-model="user.UserName"
                      type="text"
                      class="input-content"
                      maxlength="100"
                    />
                  </div>
                </td>
                <td class="add-td-department">
                  <div class="input-add-user ms-select-add">
                    <DxSelectBox
                      :data-source="addDepartment"
                      value-expr="id"
                      display-expr="name"
                      v-model="user.DepartmentID"
                      placeholder="Chọn phòng ban"
                      class="ms-select-box width-sel-add"
                    />
                  </div>
                </td>
                <td class="add-td-position">
                  <div class="input-add-user ms-select-add">
                    <DxSelectBox
                      :data-source="addPosition"
                      value-expr="id"
                      display-expr="name"
                      v-model="user.PositionID"
                      placeholder="Chọn vị trí"
                      class="ms-select-box width-sel-add"
                    />
                  </div>
                </td>
                <td class="add-td-email">
                  <div class="input-add-user">
                    <input
                      v-model="user.Email"
                      type="text"
                      class="input-content"
                      maxlength="50"
                    />
                  </div>
                </td>
                <td class="add-td-role">
                  <div class="input-add-user ms-tag-box">
                    <DxTagBox
                      :data-source="addUserRole"
                      value-expr="id"
                      display-expr="name"
                      v-model="user.ListRoleID"
                      :search-enabled="true"
                      height="36px"
                      width="340px"
                      placeholder="Chọn vai trò"
                      :accept-custom-value="false"
                      :multiline="false"
                    />
                  </div>
                </td>
                <td class="add-td-status">
                  <div class="input-add-user ms-select-add">
                    <DxSelectBox
                      :data-source="addStatus"
                      value-expr="id"
                      display-expr="name"
                      v-model="user.Status"
                      placeholder="Chọn trạng thái"
                      class="ms-select-box width-sel-add"
                    />
                  </div>
                </td>
                <td class="td-btn td-btn-add">
                  <div class="tbl-btn tbl-btn-add">
                    <div class="tbl-btn-delete" @click="btnDeleteRow(index)">
                      <i class="block-delete"></i>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="add-row-button">
            <button class="ms-button button-add-row" @click="btnAddRow">
              <div class="ms-icon-default">
                <i class="icon-add-row"></i>
              </div>
              <span class="ms-button-text add-row-text">Thêm dòng</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Phần footer -->
      <div class="add-user-footer">
        <div class="user-footer-btn">
          <button class="ms-button btn-user-exit" @click="iconCloseDialog">
            <span class="ms-button-text">Hủy</span>
          </button>
          <button class="ms-button btn-user-add" @click="btnAddUserList">
            <span class="ms-button-text">Lưu</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserRole from "@/model/UserRole";
export default {
  name: "DialogAddUser",
  props: {},
  data() {
    return {
      currentLineNumber: 1, // Thêm dòng mới
      addDepartment: [      // Xử lý chọn Department
        {
          id: "11452b0c-768e-5ff7-0d63-eeb1d8ed8cef",
          name: "Phòng Công nghệ thông tin",
        },
        {
          id: "142cb08f-7c31-21fa-8e90-67245e8b283e",
          name: "Dự án TMS Mobile",
        },
        {
          id: "17120d02-6ab5-3e43-18cb-66948daf6128",
          name: "Công ty Phúc Lâm",
        },
        {
          id: "469b3ece-744a-45d5-957d-e8c757976496",
          name: "Phòng Hỗ trợ khách hàng",
        },
        {
          id: "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
          name: "Trung tâm Sản xuất",
        },
        {
          id: "768f8e64-7d10-20c9-967d-e8c757976496",
          name: "Dự án AMIS Quy trình",
        },
      ],
      addPosition: [        // Xử lý Position
        { id: "197fda97-5a35-781d-0e77-d9ebc53aac3d", name: "Lập trình viên" },
        { id: "1e5e96fa-5d7a-599d-27c2-579daad24557", name: "QC" },
        { id: "28cd1599-63bf-785f-4f80-7ed9d1ea06ea", name: "Nhân viên" },
        {
          id: "3304dddb-1b72-607f-25c2-579daad24557",
          name: "Giám đốc khối/ VP/TT",
        },
        { id: "36ac2df8-2b1e-368f-cc1d-086412a8ea97", name: "Triển khai" },
        { id: "5fab4ff7-1b8e-64d0-1880-de64d090a2c2", name: "Kế toán" },
        { id: "6c80a684-1cb5-41af-ff34-60b3ebf808a9", name: "Tester" },
      ],
      addStatus: [          // Xử lý chọn Trạng thái
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Chờ xác nhận" },
        { id: 3, name: "Chưa kích hoạt" },
        { id: 4, name: "Ngừng kích hoạt" },
      ],
      addUserRole: [        // Xử lý chọn nhiều vai trò
        { id: "674934cc-42cf-20cf-1d4a-aea48a10ed18", name: "Nhân viên" },
        {
          id: "43a6bdf5-1b6b-451b-3695-2c566fa88632",
          name: "Quản trị hệ thống",
        },
        {
          id: "64a59a25-2488-54b0-f6b4-c8af08a50cbf",
          name: "Quản trị ứng dụng Quy trình",
        },
        { id: "34bd2cef-5026-567c-3b71-153b37881afe", name: "Quản lý" },
      ],
      listUserRoles: [],    // Danh sách các đối tượng cần thêm
      listCheckColorValidate: [ 
        {conditionNameColor: false}
      ],
    };
  },
  methods: {
    checkNullItemObject(itemParam){
      if(!itemParam){
        return true;
      } else
      return false;
    },

    /**
     * Chức năng: validate trước khi thêm
     */
    userAddValidate() {
      try {
        let isValidate = true;

        this.listUserRoles.forEach((element) => {
          if (!element.UserName) {
            this.checkNullItemObject(element.UserName);
            isValidate = false;
          }
          if (!element.DepartmentID) {
            isValidate = false;
          }
        });

        // Kiểm tra xem có lỗi không
        if (!isValidate) {
          return false;
        }
        return true;
      } catch (error) {
        console.log(error, "Có lỗi khi kiểm tra dữ liệu !");
      }
    },

    /**
     * Chức năng: Thêm mới danh sách các User
     * CreatedBy: Lương Hữu Quý
     * CreatedDate: 10/08/2022
     */
    btnAddUserList() {
      try {
        var me = this;
        var isVal = this.userAddValidate();
        if (isVal) {
          axios
            .post(`http://localhost:5224/api/v1/Users`, me.listUserRoles)
            .then(function () {
              me.$emit("btnShowDialogAddParameter", false);
              me.$emit("pagination");
            })
            .catch(function (err) {
              console.log(err, "Có lỗi khi gọi api thêm mới !");
            });
        }
      } catch (error) {
        console.log(error, "Có lỗi xảy ra khi thêm mới danh sách user !");
      }
    },

    /**
     * Chức năng: Thêm dòng nhập mới
     * CreatedBy: Lương Hữu Quý
     * CreatedDate: 04/08/2022
     */
    btnAddRow() {
      try {
        var me = this;
        const lastItemUser = me.listUserRoles[me.listUserRoles.length - 1];
        const splitUserCode = lastItemUser.UserCode.split("-");
        // [phan chu]
        const codePrefix = splitUserCode[0];
        // phan so
        const newPostfix = +splitUserCode[1] + 1;
        const newCode = codePrefix + "-" + newPostfix;

        const newUser = new UserRole();
        newUser.UserCode = newCode;
        me.listUserRoles.push(newUser);
      } catch (error) {
        console.log(error, "Lỗi khi thêm dòng mới !!!");
      }
    },

    /**
     * Chức năng: Xóa bớt dòng khi thêm mới
     * CreatedBy: Lương Hữu Quý
     * CreatedDate: 11/08/2022
     */
    btnDeleteRow(index) {
      try {
        this.listUserRoles.splice(index, 1);
      } catch (error) {
        console.log(error, "Lỗi khi xóa dòng !");
      }
    },

    /**
     * Chức năng: tắt dialog thêm mới User
     * CreatedBy: Lương Hữu Quý
     * CreatedDate: 03/08/2022
     */
    iconCloseDialog() {
      this.$emit("btnShowDialogAddParameter", false);
    },
  },
  async created() {
    try {
      var me = this;
      await axios
        .get("http://localhost:5224/api/v1/Users/NewUserCode")
        .then(function (res) {
          if (typeof res.data == "string") {
            const newUser = new UserRole();
            newUser.UserCode = res.data;
            me.listUserRoles.push(newUser);
          } else {
            console.log(res);
          }
        })
        .catch(function (res) {
          console.log(res, "Lỗi trong quá trình gọi API lấy mã mới !");
        });
    } catch (error) {
      console.log(
        error,
        "Có lỗi xảy ra khi khởi tạo giá trị ban đầu thêm mới User !"
      );
    }
  },
};
</script>
