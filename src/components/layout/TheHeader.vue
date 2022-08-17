<template>
    <div class="ms-header" id="header">

        <!-- Nội dung phần Header bên trái -->
        <div class="ms-header-left">
            <div class="header-app-menu" title="Tùy chọn"></div>
            <a href="/routerlink" class="ms-header-logo">Quy trình</a>
            <div class="header-top-menu">
                <div class="top-menu-left">
                    <div class="menu-left-align">
                        <div class="menu-left-name">Lượt chạy</div>
                        <div class="menu-left-active hover-color"></div>
                    </div>
                    <div class="menu-left-align">
                        <div class="menu-left-name">Thiết kế quy trình</div>
                        <div class="menu-left-active hover-color"></div>
                    </div>
                    <div class="menu-left-align">
                        <div class="menu-left-name">Báo cáo</div>
                        <div class="menu-left-active hover-color"></div>
                    </div>
                    <div class="menu-left-align">
                        <div class="menu-left-name left-name-active">Thiết lập</div>
                        <div class="menu-left-active"></div>
                    </div>
                    <div class="btn-run-process">
                        <button class="ms-button">
                            <div class="ms-icon-default">
                                <i class="icon-run-process"></i>
                            </div> 
                            <span class="ms-button-text">Chạy quy trình</span>
                        </button>
                    </div>
                </div>
                <div class="top-menu-right"></div>
            </div>
        </div>

        <!-- Nội dung phần header bên phải -->
        <div class="ms-header-right">
            <div>
                <div class="global-search">
                    <div class="icon-search"></div>
                    <input placeholder="Nhập ID, tiêu đề lượt chạy" type="text" class="input-search">
                </div>
            </div>
            <div class="header-right-title" title="Thông báo">
                <div class="header-popup-title">56</div>
            </div>
            <div class="user-right-action">
                <div class="user-avatar" title="Cá nhân">
                    <div class="apui-user-avatar">
                        <img src="../../assets/img/Imageavt.png" alt="avatar">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'TheHeader',
    components:{

    },
    data(){
        return{

        }
    }
}
</script>