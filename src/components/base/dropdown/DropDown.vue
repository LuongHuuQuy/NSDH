<template>
  <div style="position: relative" id="base-dropdown">
    <button class="base-btn-pagesize" :styleButton="'btn-select-pagesize justify-between'" :isShowIcon="true" :iconButtonName="'mi-chevron-down'" :msButtonText="selected" @click="showDropDown">
      <span>{{selected}}</span>
      <div class="icon-pagesize"><i></i></div>
    </button>

    <div class="con-ms-dropdown" v-if="isShow" id="dropdown">
      <ul class="ul-dropdown">
        <li
          class="li-dropdown"
          @click="setActive(15)"
          :class="{ 'dropdown-li-active': 15 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>15</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>

        <li
          class="li-dropdown"
          @click="setActive(25)"
          :class="{ 'dropdown-li-active': 25 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>25</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>
        <li
          class="li-dropdown"
          @click="setActive(50)"
          :class="{ 'dropdown-li-active': 50 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>50</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>
        <li
          class="li-dropdown"
          @click="setActive(100)"
          :class="{ 'dropdown-li-active': 100 == this.selected }"
        >
          <a class="dropdown-item--link flex justify-between">
            <div>100</div>
            <div class="icon-dropdown-check"></div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsDropDown",
  data() {
    return {
      selected: 15,
      isShow: false,
    };
  },

  methods: {
    /**
     * Chức năng: Xử lý khi click vào từng dòng
     * CreatedBy: Lương Hữu Quý
     * CreatedDate: 02/08/2022 
     */
    setActive(indexSelect) {
      try {
        this.selected = indexSelect;
        this.isShow = false;
        this.$emit("setPageSize",indexSelect);
        this.$emit("pagination");
        this.$emit("reloadPage");
      } catch (error) {
        console.log(error, "Có lỗi xảy ra khi click chọn PageSize !")
      }
    },

    /**
     * Chức năng: Hiển thị DropDown
     * CreatedBy: Lương Hữu Quý
     * CreatedDate: 02/08/2022
     */
    showDropDown() {
      this.isShow = !this.isShow;
    },

    /**
     * Chức năng: Đóng lại 
     * CreateBy: Lương Hữu Quý
     * CreatedDate: 02/08/2022 
     */
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isShow = false;
      }
    }
  },
  created() {
    window.addEventListener("click", this.close);
  },
    beforeUnmount() {
    window.removeEventListener("click", this.close);
  },
};
</script>
