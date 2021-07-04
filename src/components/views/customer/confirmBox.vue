<template>
    <div>
        <div class="dialog" :class="{'confirm_dialog': !confirmIsShow}">
        <div class="model"></div>
        <div class="confirm_box">
            <div class="dialog_header">
                <div class="dialog_title" style="font-size: 16px;">XÓA KHÁCH HÀNG</div>
                <button class="button_X" @click="btnConfirmBoxClose()"></button>
            </div>
            <div class="confirm_box_content">
                <div style="font-style:italic; font-size: 16px;">Bạn chắc chắn muốn xóa khách hàng này chứ?</div>
            </div>
            <div class="dialog_footer">
                <button class="button_cancel" @click="btnConfirmBoxClose()">Hủy</button>
                <button id="button_confirm" @click="btnConfirmDelete()">Xóa</button>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
export default ({
    props: {
        confirmIsShow: {
            type: Boolean,
            default: false
        },
        customerid: {
            type: String,
            default: null
        },
        
    },
    methods: {
        //Gọi đến phương thức ẩn dialog của cha
        btnConfirmBoxClose() {
            this.$emit('hideConfirmBox');
        },
        //Thực hiện xóa khách hàng
        btnConfirmDelete() {
            axios.delete("http://api.manhnv.net/api/customers/" + this.customerid)
            .then(res =>{
                console.log(res);
                this.$emit('hideConfirmBox');
            })
            .catch(res => {
                console.log(res);
            })
        }
    },
})
</script>

<style scoped>
.confirm_dialog {
    display: none;
}

.model {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #000000;
    opacity: .4;
}

.confirm_box {
    position: fixed;
    width: 600px;
    height: 180px;
    bottom: calc(50% + 30px);
    left: calc(50% - 300px);
    background-color: white;
    border-radius: 4px;
}
.dialog_header {
    display:flex;
    height: 48px;
    
}
.dialog_header .dialog_title {
    width: 80%;
    height: 48px;
    padding-left:24px;
    padding-top: 24px;
    font-weight: bold;
    font-size: 24px;
    
}
.confirm_box .confirm_box_content {
    position: absolute;
    display: flex;
    height: 24px;
    padding: 24px;
    align-items: center;
}
.dialog_footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 60px;
    display: flex;
    align-items: center;
}


</style>