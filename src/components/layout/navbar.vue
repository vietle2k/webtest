<template>
    <div id="NavBar">
        <div id="Navbar_logo_box">
            <div id="sidebar"></div>
            <div id="logo"></div>
        </div>
        <div id="Navbar_content_box">
            <div class="navbar-item">
                <div class="navbar-icon icon-dashboard"></div>
                <div class="navbar-text">Tổng quan</div>
            </div>
            <router-link class="navbar-item" tag="li" to="/report">
                <div class="navbar-icon icon-report"></div>
                <div class="navbar-text">Báo cáo</div>
            </router-link>
            <router-link class="navbar-item" tag="li" to="/customer">
                <div class="navbar-icon icon-dic-employee"></div>
                <div class="navbar-text">Danh mục khách hàng</div>
            </router-link>
            <router-link class="navbar-item" tag="li" to="/employee">
                <div class="navbar-icon icon-dic-employee"></div>
                <div class="navbar-text">Danh mục nhân viên</div>
            </router-link>
            <router-link class="navbar-item" tag="li" to="/setting">
                <div class="navbar-icon icon-setting"></div>
                <div class="navbar-text">Thiết lập hệ thống</div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
#NavBar {
    width: 200px;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    border-right: 1px solid #dedede;
} 
#Navbar_logo_box {
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    cursor: pointer;
}

#Navbar_logo_box #sidebar {
    height: 30px;
    width: 30px;
    margin-left: 16px;
    flex-shrink: 0;
    background-image: url("../../assets/img/toggle.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

#Navbar_logo_box #logo {
    margin-left: 8px;
    width: 100%;
    height: 30px;
    flex-shrink: 0;
    background-image: url("../../assets/img/cukcuk-logo.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left;
}

.navbar-item {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
}

.navbar-item:hover {
  background-color: #e5e5e5;
  cursor: pointer;
}

.navbar-item .navbar-icon {
  margin-left: 16px;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.navbar-item .navbar-text {
  margin-left: 10px;
}

.navbar-item:hover {
  cursor: pointer;
}

.navbar-item:active {
  background-color: aquamarine;
}

.icon-dashboard {
    background-image: url('../../assets/icon/dashboard.png');
}

.icon-report {
    background-image: url('../../assets/icon/report.png');
}

.icon-dic-employee {
    background-image: url('../../assets/icon/dic-employee.png');
}

.icon-setting {
    background-image: url('../../assets/icon/setting.png');
}
</style>