<template>
    <div>
    <!-- :class là đặt điều kiện cho  class -->
     <div id="dlgCustomerDetail" class="dialog" :class="{ 'dialog-hide': !isShow }"> 
        <div class="model"></div>

        <div class="dialog_content">
            <div class="dialog_header">
                <div class="dialog_title">THÔNG TIN KHÁCH HÀNG</div>
                <button class="button_X" @click="btnDialogClose()"></button>
            </div>
            <div class="dialog_middle">
                <div id="dialog_middle_1">
                    <div class="column" style="text-align:center">
                        <button class="button_avatar"></button>
                        <div style="font-size:11px">Vui lòng chọn ảnh có định dạng</div>
                        <div style="font-size: 11px; font-weight: bold">.jpg, .jpeg, .png, .gif</div>
                    </div>
                    <div class="column">
                        <div style="display:flex">Mã khách hàng (<div style="color:red">*</div>)</div>
                        <input id="customerCode" type="text" class="blank_box" v-model="customer.CustomerCode">
                        <div>Mã thẻ thành viên</div>
                        <input id="customerMemberCode" type="text" class="blank_box" v-model="customer.MemberCardCode">
                        <div>Ngày sinh</div>
                        <input id="customerDateofBirth" type="date" class="date_box" v-model="customer.DateOfBirth">
                    </div>
                    <div class="column">
                        <div style="display:flex">Họ và tên (<div style="color:red">*</div>)</div>
                        <input id="customerName" type="text" class="blank_box" v-model="customer.FullName">
                        <div>Nhóm khách hàng</div>
                        <select id="CustomerGroup" class="blank_box" v-model="customer.CustomerGroupId">
                            <option value="7a0b757e-41eb-4df6-c6f8-494a84b910f4">Khách thường</option>
                            <option value="19165ed7-212e-21c4-0428-030d4265475f">Khách VIP</option>
                            <option value="0cb5da7c-59cd-4953-b17e-c9adc9161663">Nhóm khách hàng MISA</option>
                            <option value="3631011e-4559-4ad8-b0ad-cb989f2177da">Khách vãng lai</option>
                        </select>
                        <div>Giới tính</div>
                        <div style="display: flex;margin-top: 12px;margin-bottom: 12px; align-items:center">
                            <input id="radio1" type="radio" name="Gender" value="Nam" class="button_check">
                            <div>Nam</div>
                            <input id="radio2" type="radio" name="Gender" value="Nữ" class="button_check">
                            <div>Nữ</div>
                            <input id="radio3" type="radio" name="Gender" value="Khác" class="button_check">
                            <div>Khác</div>
                        </div>
                    </div>
                </div>
                <div id="dialog_middle_2">
                    <div class="large_column">
                        <div>Email</div>
                        <input id="customerEmail" type="text" placeholder="example@domain.com" class="long_blank_box" v-model="customer.Email"/>
                        <div>Tên công ty</div>
                        <input id="customerCompany" type="text" class="long_blank_box" v-model="customer.CompanyName">
                    </div>
                    <div class="small_column">
                        <div style="display:flex">Số điện thoại (<div style="color:red">*</div>)</div>
                        <input id="customerPhone" type="text" class="blank_box" v-model="customer.PhoneNumber">
                        <div>Mã số thuế</div>
                        <input id="customerTax" type="text" placeholder="Mã số thuế của công ty" class="blank_box" v-model="customer.CompanyTaxCode">
                    </div>
                </div>
                <div>Địa chỉ</div>
                <input id="customerAddress" type="text" class=" giant_blank_box" v-model="customer.Address" />
            </div>
            <div class="dialog_footer">
                <button class="button_cancel" @click="btnDialogClose()">Hủy</button>
                <button id="button_save" @click="btnSave()">Lưu</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

import axios from 'axios';
export default ({
    props: {
        // Tạo một thuộc tính mặc định là ẩn để gán điều kiện cho class dialog-hide
        isShow: {
            type: Boolean,
            default: false
        },
        //tạo thuộc tính customer để nhận giá trị truyền từ selectedCustomer của component cha
        customer: {
            type: Object,
            default: null
        },
        formmode: {
            type: String,
            default: ""
        }
    },
    methods: {
        //Gọi đến phương thức ẩn dialog của cha
        btnDialogClose() {
            this.$emit('hideDialog');
        },
        //Phương thức lưu dữ liệu được thêm/sửa
        btnSave() {
            //Thêm dữ liệu -> đẩy dữ liệu lên API
            if (this.formmode == "add"){
                axios.post("http://api.manhnv.net/api/customers", this.customer)
                .then(res => {
                    console.log(res);
                    //Đóng Dialog
                    this.$emit('hideDialog');
                })
                .catch(res => { 
                    console.log(res);
                })
            }
            //Sửa dữ liệu -> đẩy dữ liệu lên API
            else {
                axios.put("http://api.manhnv.net/api/customers/" + this.customer.CustomerId, this.customer)
                .then(res => {
                    console.log(res);
                    //Đóng Dialog
                    this.$emit('hideDialog');
                })
                .catch(res => { 
                    console.log(res);
                })
            }
            
        }
        //Format ngày sinh để binding lên CustomerDetail dialog
        // DateFormat(DateOfBirth) {
        //     var newDate = new Date(DateOfBirth);
        //     var StringDate = newDate.getDate();
        //     if (StringDate < 10) StringDate = '0' + StringDate;
        //     var StringMonth = newDate.getMonth() + 1;
        //     if (StringMonth < 10) StringMonth = '0' + StringMonth;
        //     var StringYear = newDate.getFullYear();
        //     this.customerFormatDOB = StringYear + '-' + StringMonth + '-' + StringDate;
        // },
    },
    data() {
        return {
            // customerFormatDOB: null
        }
    },
})
</script>

<style scoped>

.dialog-hide {
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

.dialog .dialog_content {
    position: fixed;
    width: 600px;
    height: 560px;
    top: calc(50% - 280px);
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

.dialog_middle {
    padding: 24px;
}

.dialog_middle #dialog_middle_1{
    height: 200px;
    width: 100%;
    display: flex;
}

#dialog_middle_1 .column{
    height: 100%;
    width: 180px;
    padding:6px;
}
.dialog_middle #dialog_middle_2 {
        margin-top: 12px;
        height: 140px;
        width: 100%;
        display: flex;
}

#dialog_middle_2 .large_column {
    height: 100%;
    width: 360px;
    padding-right:6px;
}

#dialog_middle_2 .small_column{
    height: 100%;
    width: 180px;
    padding-left: 6px;
}

.dialog_footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #e5e5e5;
    border-radius: 0px 0px 4px 4px;
}

.blank_box{
    width: 180px;
    height: 30px;
    border-radius: 4px;
    border: 2px solid #dedede;
    outline: none;
    margin-top: 6px;
    margin-bottom: 12px;
}


    .blank_box:focus {
        border: 1px solid #ff0000;
    }

.long_blank_box {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    border: 2px solid #dedede;
    outline: none;
    margin-top: 6px;
    margin-bottom: 12px;
}


    .long_blank_box:focus {
        border: 1px solid #ff0000;
    }


.giant_blank_box {
    height: 30px;
    width: 100%;
    border-radius: 4px;
    border: 2px solid #dedede;
    outline: none;
    margin-top: 6px;
    margin-bottom: 12px;
}

.giant_blank_box:focus {
    border: 1px solid #ff0000;
}

.date_box {
    width: 164px;
    height: 30px;
    border-radius: 4px;
    border: 2px solid #dedede;
    outline: none;
    margin-top: 6px;
    margin-bottom: 12px;
    padding-left: 10px;
    padding-right: 10px;
    
}

.date_box:focus {
    border: 1px solid #ff0000;
}


</style>