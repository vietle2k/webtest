<template>
    <div class="dialog" :class="{'dialog_hide': !isShow}" >
            <div class="model"></div>
            <div class="dialog-content">
                <div class="dialog_header">
                    <div class="dialog_title">THÔNG TIN NHÂN VIÊN</div>
                    <button class="button_X" @click="btnDialogClose()"></button>
                </div>
                <div class="dialog_middle">
                    <div class="column1">
                        <button class="button_avatar"></button>
                        <div style="font-size:11px;">(Vui lòng chọn ảnh có định <br>dạng<br> .jpg,.jpeg,.png,.gif.)</div>
                    </div>
                    <div class="column2">
                        <div style="font-size: 15px">A. THÔNG TIN CHUNG</div>
                        <div class="border"></div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Mã nhân viên (<div style="color:red">*</div>) <div style="color:red; margin-left: 20px;" id="input1" class="InvalidEmail">Yêu cầu nhập</div></div>
                                <input 
                                type="text" 
                                class="blank_box employeecode" 
                                ref="EmployeeCode" 
                                v-model="employee.EmployeeCode" 
                                @blur="EmployeeCodeValidation(employee.EmployeeCode)">
                            </div>
                            <div>
                                <div style="display:flex;">Họ và tên (<div style="color:red">*</div>) <div style="color:red; margin-left: 20px;" id="input2" class="InvalidEmail">Yêu cầu nhập</div></div>
                                <input type="text" class="blank_box fullname" v-model="employee.FullName" @blur="FullNameValidation(employee.FullName)" >
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Ngày sinh</div>
                                <input type="date" class="date_box" v-model="employee.DateOfBirth">
                            </div>
                            <div>
                                <div style="display:flex;">Giới tính</div>
                                <select class="select_box" v-model="employee.Gender">
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                    <option value="">Không xác định</option>
                                </select>
                                <!-- combobox -->
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Số CMTND/ Căn cước (<div style="color:red">*</div>) <div style="color:red; margin-left: 10px;" id="input3" class="InvalidEmail">Yêu cầu nhập</div></div>
                                <input type="text" class="blank_box identity" v-model="employee.IdentityNumber" @blur="IdentityValidation(employee.IdentityNumber)">
                            </div>
                            <div>
                                <div style="display:flex;">Ngày cấp</div>
                                <input type="date" class="date_box" v-model="employee.IdentityDate">
                            </div>
                        </div>
                        <div>
                            <div style="display:flex;">Nơi cấp</div>
                            <input type="text" class="blank_box" v-model="employee.IdentityPlace">
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Email (<div style="color:red">*</div>) <div style="color:red; margin-left: 20px;" id="input4" class="InvalidEmail">Email chưa hợp lệ</div></div>
                                <input type="text" class="blank_box email" v-model="employee.Email" @blur="EmailValidation(employee.Email)" >
                            </div>
                            <div>
                                <div style="display:flex;">Số điện thoại (<div style="color:red">*</div>) <div style="color:red; margin-left: 20px;" id="input5" class="InvalidEmail">Yêu cầu nhập</div></div>
                                <input type="text" class="blank_box phonenumber" v-model="employee.PhoneNumber" @blur="PhoneNumberValidation(employee.PhoneNumber)">
                            </div>
                        </div>
                        <div style="font-size: 15px">B. THÔNG TIN CÔNG VIỆC</div>
                        <div class="border"></div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Vị trí</div>
                                <select class="select_box" v-model="employee.PositionId">
                                    <option value="148ed882-32b8-218e-9c20-39c2f00615e8">Nhân viên Marketing</option>
                                    <option value="25c6c36e-1668-7d10-6e09-bf1378b8dc91">Thu ngân</option>
                                    <option value="3700cc49-55b5-69ea-4929-a2925c0f334d">Giám đốc</option>
                                </select>
                                <!-- combobox -->
                            </div>
                            <div>
                                <div style="display:flex;">Phòng ban</div>
                                <select class="select_box" v-model="employee.DepartmentId">
                                    <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">Phòng Marketing</option>
                                    <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c">Phòng Công nghệ</option>
                                    <option value="17120d02-6ab5-3e43-18cb-66948daf6128">Phòng đào tạo</option>
                                    <option value="469b3ece-744a-45d5-957d-e8c757976496">Phòng Nhân sự</option>
                                </select>
                                <!-- combobox -->
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Mã số thuế cá nhân</div>
                                <input type="text" class="blank_box" v-model="employee.PersonalTaxCode">
                            </div>
                            <div>
                                <div style="display:flex;">Mức lương cơ bản</div>
                                <div class="wrapper" data-placeholder="(VNĐ)">
                                    <input type="text" class="blank_box" id="salary_input"  
                                    v-model="employee.Salary"
                                    @keypress.prevent.tab.exact="format_salary()"
                                    >
                                </div>
                                <!-- format int input js -->
                            </div>
                        </div>
                        <div style="display:flex;">
                            <div>
                                <div style="display:flex;">Ngày gia nhập công ty</div>
                                <input type="date" class="date_box" v-model="employee.JoinDate">
                            </div>
                            <div>
                                <div style="display:flex;">Tình trạng công việc</div>
                                <select class="select_box" v-model="employee.WorkStatus">
                                    <option value="0">Đang thử việc</option>
                                    <option value="1">Đã nghỉ việc</option>
                                    <option value="2">Đang làm việc</option>
                                    <option value="3">Đã nghỉ hưu</option>
                                </select>
                                <!-- combobox -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog_footer">
                    <button class="button_cancel" @click="btnDialogClose()">Hủy</button>
                    <button id="button_save" @click="btnSave()">Lưu</button>
                </div>
            </div>
                
    </div>
</template>


<script>

import axios from 'axios'
import $ from 'jquery'
//regular expression của email
const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default({
    created() {
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        employee: {
            type: Object,
            default: null
        },
        formmode: {
            type: String,
            default: ""
        }
    },
    mounted() {
        
    },
    updated() {
        //auto focus ô input đầu tiên
        //Vì hàm focusInput đã được gọi trước khi dialog hiện ra nên là phải gọi lại nó một lần nữa (sau khi isShow thay đổi từ false sang true)
        while(this.focusFirstInput==true){
        this.focusInput();
        this.focusFirstInput=false;
        
        }
        if(this.isShow == false) this.focusFirstInput = true;

        //Format ngày sau khi dialog được hiện ra, để binding dữ liệu (isShow thay đổi từ false sang true)
        this.employee.DateOfBirth = this.DateFormat(this.employee.DateOfBirth);
        this.employee.IdentityDate = this.DateFormat(this.employee.IdentityDate);
        this.employee.JoinDate = this.DateFormat(this.employee.JoinDate);
        //Format tiền lương (salary) sau khi dialog được hiện ra, để binding dữ liệu (isShow thay đổi từ false sang true)
        if(this.employee.Salary != null){
            this.format_salary();
        }

        
    },
    methods: {
        btnDialogClose(){
            this.$emit('hideDialog');
        },
        //Phương thức thêm/sửa dữ liệu
        btnSave(){
            //Thêm dữ liệu -> đẩy dữ liệu lên API
            if (this.formmode == "add"){
                axios.post("http://api.manhnv.net/v1/employees", this.employee)
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
                axios.put("http://api.manhnv.net/v1/employees/" + this.employee.EmployeeId, this.employee)
                .then(res => {
                    console.log(res);
                    //Đóng Dialog
                    this.$emit('hideDialog');
                })
                .catch(res => { 
                    console.log(res);
                })
            }

        },
        //format date để binding vào form
        DateFormat(unformatDate){
            var formattedDate = new Date(unformatDate);
                var StringMonth = formattedDate.getMonth() + 1;
                if (StringMonth < 10) StringMonth = '0' + StringMonth;
                var StringDate = formattedDate.getDate();
                if (StringDate < 10) StringDate = '0' + StringDate;
                var StringYear = formattedDate.getFullYear();

                return StringYear + '-' + StringMonth + '-' + StringDate;
               
        },
        //auto focus vào ô input đầu tiên sau khi hiện dialog
        focusInput(){
            this.$refs.EmployeeCode.focus();
        },

        //format salary luôn theo định dạng 20,000,000 (vnđ)
        format_salary(){
            var stringSalary = new String(this.employee.Salary)
            this.employee.Salary = parseInt(stringSalary.replace(/\D/g,''),10).toLocaleString();
        },

        //Validate Form hợp lệ
        
        EmployeeCodeValidation(a){
            a = a || '';
            if (a.trim() == "") {
                $(".employeecode").addClass("blank_box_invalid")
                $("#input1").css('display', 'inline-block')
            }
            else {
                $(".employeecode").removeClass("blank_box_invalid")
                $("#input1").css('display', 'none')
            }            
        },
        FullNameValidation(a){
            a = a || '';
            if (a.trim() == "") {
                $(".fullname").addClass("blank_box_invalid")
                $("#input2").css('display', 'inline-block')
            }
            else {
                $(".fullname").removeClass("blank_box_invalid")
                $("#input2").css('display', 'none')
            }  
        },
        IdentityValidation(a){
            a = a || '';
            if (a.trim() == "") {
                $(".identity").addClass("blank_box_invalid")
                $("#input3").css('display', 'inline-block')
            }
            else {
                $(".identity").removeClass("blank_box_invalid")
                $("#input3").css('display', 'none')
            }  
        },
        PhoneNumberValidation(a){
            a = a || '';
            if (a.trim() == "") {
                $(".phonenumber").addClass("blank_box_invalid")
                $("#input5").css('display', 'inline-block')
            }
            else {
                $(".phonenumber").removeClass("blank_box_invalid")
                $("#input5").css('display', 'none')
            }  
        },
        //Validate email hợp lệ
        EmailValidation(a) {
            if (!mailRegex.test(a)) {
                $(".email").addClass("blank_box_invalid")
                $("#input4").css('display', 'inline-block')
            }
            else {
                $(".email").removeClass("blank_box_invalid")
                $("#input4").css('display', 'none')

            }
        }
        
    },
    data() {
        return {
            focusFirstInput: true,
            

        }
    },
    computed: {

    }
})
</script>

<style scoped>
.dialog_hide {
    display:none;
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

.dialog-content {
    position: fixed;
    width: 700px;
    height: 732px;
    top: calc(50% - 366px);
    left: calc(50% - 350px);
    background-color: white;
    border-radius: 4px;
}
.dialog-content .dialog_header{
    display:flex;
    height: 48px;
}

.dialog_header .dialog_title {
    width: 80%;
    height: 48px;
    padding-left:24px;
    padding-top: 24px;
    font-weight: bold;
    font-size: 20px; 
}


.dialog_middle {
    height: 574px;
    padding: 24px;
    display:flex;
}

.column1{
    text-align: center;
    height: 100%;
    margin-right: 16px;
}

.column2{
    width: 100%;
}

.column2 .border{
    height:4px;
    width: 84px;
    margin-top:6px;
    margin-bottom: 6px;
    background-color:#019160;
}

.blank_box {
    height: 30px;
    width: 212px;
    margin-right: 12px;
    margin-top:4px;
    margin-bottom:8px;
    border-radius: 5px;
    border: 2px solid #dedede;
    padding-left: 16px;
    background-color: transparent;
}

.blank_box_invalid {
    border-color: #F65454;
    outline: none;
}
.InvalidEmail {
    display: none;
}

.date_box {
    height: 32px;
    width: 214px;
    margin-right: 12px;
    margin-top:4px;
    margin-bottom:8px;
    border-radius: 5px;
    border: 2px solid #dedede;
    padding-left: 16px;
}

.select_box{
    height: 36px;
    width: 235px;
    margin-right: 12px;
    margin-top:4px;
    margin-bottom:8px;
    border-radius: 5px;
    border: 2px solid #dedede;
    padding-left: 13px;
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
input, .select_box {
  font-family: GoogleSans-Regular;
  font-size: 12px;
}

@font-face {
  font-family: "GoogleSans-Regular";
  src: url("../../../assets/font/GoogleSans-Regular.otf") format("opentype");
}
.blank_box:focus, .date_box:focus, .select_box:focus{
    border-color: #01b075;
    outline: none;
}

.blank_box:hover, .date_box:hover, .select_box:hover{
    border-color: #01b075;
}
.wrapper {
    position: relative;
}
.wrapper::after {
    position: absolute;
    right: 27px;
    top: 14px;
    content: attr(data-placeholder);
    font-style: italic;
}

#salary_input{
    text-align:right;
    padding-right: 56px;
    width: 159px;
}
</style>