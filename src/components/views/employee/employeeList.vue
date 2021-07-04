<template>
    <div>
        <div class="page-title">
            <div class="page-left">Danh sách nhân viên</div>
            <div class="page-right">
                <button id="btnAdd" class="btn-default" @click="btnAddEmployee()" >
                Thêm nhân viên
                </button>
            </div>
        </div>
        <div class="toolbar">
            <input
                type="text"
                class="input-search"
                placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
                v-model="searchdata"
                @keyup="SearchData()"
            />
            
            <select class="select_box" v-model="selectedDepartmentId" @change="SelectDepartment()" >
                <option value="" disabled selected hidden>Tất cả phòng ban</option>
                <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">Phòng Marketing</option>
                <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c">Phòng Công nghệ</option>
                <option value="17120d02-6ab5-3e43-18cb-66948daf6128">Phòng đào tạo</option>
                <option value="469b3ece-744a-45d5-957d-e8c757976496">Phòng Nhân sự</option>
            </select>
            <select class="select_box" v-model="selectedPositionId" @change="SelectPosition()" >
                <option value="" disabled selected hidden>Tất cả vị trí</option>
                <option value="148ed882-32b8-218e-9c20-39c2f00615e8">Nhân viên Marketing</option>
                <option value="25c6c36e-1668-7d10-6e09-bf1378b8dc91">Thu ngân</option>
                <option value="3700cc49-55b5-69ea-4929-a2925c0f334d">Giám đốc</option>
            </select>
            <button class="btn-refresh" @click="loadData()"></button>
            <button class="btn-delete" @click="btnDeleteData()"></button>
        </div>
        <div class="grid">
            <table id="tblListCustomer" class="table" width="100%" border="0">
                <thead>
                    <tr>
                        <th>Mã nhân viên</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Điện thoại</th>
                        <th>Email</th>
                        <th>Chức vụ</th>
                        <th>Phòng ban</th>
                        <th style="text-align: right;">Mức lương cơ bản</th>
                        <th>Tình trạng công việc</th>
                        <th :class="{'deleteItems': !isDelete}">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in filteredEmployee" :key='employee.EmployeeId' @dblclick="rowOnDblClick(employee.EmployeeId)" >
                        <td>{{employee.EmployeeCode}}</td>
                        <td>{{employee.FullName}}</td>
                        <td>{{employee.GenderName}}</td>
                        <td>{{DateFormat(employee.DateOfBirth)}}</td>
                        <td>{{employee.PhoneNumber}}</td>
                        
                        <td>{{employee.Email}}</td>
                        <td>{{employee.PositionName}}</td>
                        <td>{{employee.DepartmentName}}</td>
                        <td style="text-align: right;">{{SalaryFormat(employee.Salary)}}</td>
                        <td>{{workStatusFormat(employee.WorkStatus)}}</td>
                        <td :class="{'deleteItems': !isDelete}" style="text-align: center;"><button class="button_delete_x" @click="buttonDeleteOnClick(employee.EmployeeId)"></button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer">
                <div class="paging-record-info">Hiển thị <b>1-10/1000</b> nhân viên</div>

                <Pagination 
                :totalPages="10"
                
                :perPage="perPage"
                :currentPage="currentPage"
                @pagechanged="onPageChange"
                />

                <div class="paging-record-option"><b data-v-a72348a4="">10</b> nhân viên/trang</div>
        </div>
        <!-- chú ý tại sao không lấy option cho select-box dựa trên api-->
        <!-- chú ý lifecycle, updated, một số hàm format-->
        
       

        
        <EmployeeDetail
            ref="dialog"
            :isShow="isShowDialogEmployee"
            @hideDialog="hideDialog"
            :employee="selectedEmployee"
            :formmode="DetailFormMode"
            
        />

        <EmployeeDelete
            :confirmIsShow="isShowConfirmBox"
            :employee="selectedEmployee"
            @hideConfirmBox = "hideConfirmBox"
        />

    </div>
</template>


<script>
import EmployeeDetail from './employeeDetail.vue'
import EmployeeDelete from './employeeDelete.vue'
import Pagination from '../../base/pagination.vue'
import axios from 'axios'
import $ from 'jquery'
export default ({
    components: {
        EmployeeDetail,
        EmployeeDelete,
        Pagination
    },
    created() {
        //load dữ liệu cho trang
        axios.get("http://api.manhnv.net/v1/employees")
        .then(res => {
            console.log(res);
            this.employees = res.data;
            
            this.initialEmployees = res.data;
            this.employeeNumber = this.initialEmployees.length;
        })
        .catch((res) =>{
            console.log(res);
        });
        
        
    },
    props: {

    },
    methods: {
        loadData(){
            //load dữ liệu cho trang
            axios.get("http://api.manhnv.net/v1/employees")
            .then(res => {
                console.log(res);
                this.employees = res.data;
                
            })
            .catch((res) =>{
                console.log(res);
            });

            this.selectedDepartmentId = "";
            this.selectedPositionId = "";
            this.currentPage = 1;
        },
        //Hiện dialog thêm nhân viên
        btnAddEmployee(){
            this.isShowDialogEmployee = true;
            //Mã nhân viên tự động có và tự tăng theo tiêu chí 
            axios.get("http://api.manhnv.net/v1/Employees/NewEmployeeCode")
            .then(res =>{
                this.selectedEmployee  = {};
                this.selectedEmployee.EmployeeCode = res.data;
            })
            
            this.$refs.dialog.focusInput();
            this.$refs.dialog.format_salary();
            this.DetailFormMode = "add";
            
        },
        //ẩn
        hideDialog(){
            this.isShowDialogEmployee = false;
            this.loadData();
        },
        //ẩn confirm box khi muốn xóa 1 bản ghi
        hideConfirmBox(){
            this.isShowConfirmBox = false;
            this.loadData();
            this.isDelete = false;
        },
        //hiện thông tin chi tiết (employee Detail)
        rowOnDblClick(employeeId){
            //Hiện Dialog
            this.isShowDialogEmployee = true;
            //Lấy id của bản ghi được chọn

            //Get dữ liệu từ APi về phù hợp với bản ghi
            axios.get("http://api.manhnv.net/v1/employees/" + employeeId)
            .then(res => {
                this.selectedEmployee = res.data;
            })
            .catch(res => {
                console.log(res);
            })
            //Binding thông tin của nhân viên

            //Gán formmode = "edit" để phân biệt với thêm dữ liệu
            this.DetailFormMode = "edit";
        },
        //format work status
        workStatusFormat(workstatus){
            var workStatus = null;
            if (workstatus == 0) workStatus = "Đang thử việc";
            else if (workstatus == 1) workStatus = "Đã nghỉ việc";
            else if (workstatus == 2) workStatus = "Đang làm việc";
            else if (workstatus == 3) workStatus = "Đã nghỉ hưu";
            return workStatus;
        },

        //format date of birth
        DateFormat(DateOfBirth) {
            var newDate = new Date(DateOfBirth);
            var StringDate = newDate.getDate();
            if (StringDate < 10) StringDate = '0' + StringDate;
            var StringMonth = newDate.getMonth() + 1;
            if (StringMonth < 10) StringMonth = '0' + StringMonth;
            var StringYear = newDate.getFullYear();
            return StringDate + '/' + StringMonth + '/' + StringYear;
        },
        //format salary
        SalaryFormat(Salary) {
            if (Salary != null) Salary = Salary.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VNĐ";
            return Salary;
        },
        //Xóa nhân viên
        btnDeleteData(){
            this.isDelete = true;
            
        },
        buttonDeleteOnClick(employeeId){
            //Get dữ liệu từ APi về phù hợp với bản ghi
            axios.get("http://api.manhnv.net/v1/employees/" + employeeId)
            .then(res => {
                this.selectedEmployee = res.data;
            })
            .catch(res => {
                console.log(res);
            })
            //Hiện confirmBox
            this.isShowConfirmBox = true;
        }, 

        //Tìm kiếm thông tin
        SearchData(){
            var value = this.searchdata.toLowerCase();
            $("table#tblListCustomer tbody tr").each(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1); //toggle(boolean) true:show / false:hide  
            })
        },
        //Chọn filter phòng ban
        SelectDepartment(){
            //Chạy hàm filter với initialEmployees, vì dữ liệu từ initialEmployees không đổi nên có thể chọn filter nhiều lần
            this.employees = this.filter(this.initialEmployees, 'DepartmentId', this.selectedDepartmentId); 
            
            
        },
        //Chọn filter vị trí
        SelectPosition(){
            //Chạy hàm filter với initialEmployees, vì dữ liệu từ initialEmployees không đổi nên có thể chọn filter nhiều lần
            this.employees = this.filter(this.initialEmployees, 'PositionId', this.selectedPositionId);
        },
        filter(arr, key, value) {
            return arr.reduce((data, item) => {
                if (item[key] == value) data.push(item);
                return data;
            }, []);
        },
        //Thay đổi số trang, thay đổi currentPage
        onPageChange(page) {
            // console.log(page)
            this.currentPage = page;
        },
        
    },
    computed:{
        //limit hiển thị số lượng bản ghi mỗi trang tùy thuộc vào currentpage và perpage (perpage = 10)
        filteredEmployee: function(){
            return this.employees.slice(this.perPage * this.currentPage - this.perPage,  this.perPage * this.currentPage);
        }
    },
    data() {
        return {
            //dữ liệu đầu vào (axios.get) -> để gán dữ liệu
            employees: [],
            //Số lượng bản ghi được lấy về
            employeeNumber: null,
            //Số lượng trang hiển thị
            pageNumber: null,
            //dữ liệu đầu vào tương tự như employees nhưng cố định, không thay đổi, dùng trong hàm filter
            initialEmployees: [],
            //dữ liệu của 1 bản ghi được chọn khi double click
            selectedEmployee: {},
            
            isShowDialogEmployee: false,
            DetailFormMode: "add",
            isDelete: false,
            isShowConfirmBox: false,
            //dữ liệu được nhập vào từ search bar
            searchdata: "",
            //dữ liệu được chọn từ filter phòng ban
            selectedDepartmentId: "",
            //dữ liệu được chọn từ filter vị trí công việc
            selectedPositionId: "",


            //Dấu trang
            currentPage: 1,

            //Số lượng bản ghi được hiển thị trong 1 trang
            perPage: 10,
        }
    },
})
</script>

<style scoped>
.page-title {
  height: 40px;
  display: flex;
  align-items: center;
}

.page-title .page-right {
  position: absolute;
  right: 24px;
}

.page-title .page-left {
  font-size: 24px;
  font-weight: bold;
}

.toolbar {
  margin-top: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 42px;
}

::placeholder{
    font-size:12px;
}
.select_box {
    height: 40px;
    width: 220px;
    margin-left: 12px;
    margin-right: 12px;
    padding-left: 20px;
    
    border-radius: 4px;
    border: 2px solid #dedede;
}

.select_box:focus{
    border: 1px solid;
    outline: none;
    border-color: #019160;
}
.grid {
  position: absolute;
  right: 24px;
  left: 24px;
  bottom: 60px;
  top: 128px;
  overflow-y: auto;
}




.footer {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right:24px;
    left: 24px;
    height: 60px;
    border-top: 1px solid #bbbbbb;
}




.paging-record-info {
    position: absolute;
    left: 16px;
}

.paging-record-option {
    position: absolute;
    right: 16px;
}
.deleteItems {
    display: none;
}

</style>