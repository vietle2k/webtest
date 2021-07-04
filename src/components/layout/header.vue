<template>
    <div>
        <div id="Header"> 
            <select class="list">
                <option>Nhà hàng Biển Đông</option>
                <option>Nhà hàng Biển Tây</option>
                <option>Nhà hàng Biển Nam</option>
                <option>Nhà hàng Biển Bắc</option>
            </select>

            <div class="profile">
                <div class="name">Nguyễn An Bằng</div>
                <button id="button_option"></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#Header {
    position: absolute;
    left: 200px;
    top:0px;
    right:0px;
    height: 60px;
    border: 1px solid #dedede;
    display: flex;
    align-items: center;
    border-collapse: collapse;
}

.list {
       
        position: absolute;
        left: 40px;
        width: 200px;
        height: 50%;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size:15px;
    }

.profile {
        position: absolute;
        right:0px;
        width:200px;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 24px;
    }

    .profile .name {
        height: 100%;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background-image: url('../../assets/icon/avatar-default.png');
        background-size: 36px;
        background-repeat: no-repeat;
        background-position-y: center;
        background-position-x: 16px;
        padding-right: 16px;
    }
    #button_option {
    height: 16px;
    width: 16px;
    background-image: url('../../assets/icon/option.png');
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
    outline: none;
}
#button_option:hover{
        cursor: pointer;
    }



</style>