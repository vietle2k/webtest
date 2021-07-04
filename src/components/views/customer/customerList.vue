<template>
    <div>
        <div class="page-title">
            <div class="page-left">Danh sách khách hàng</div>
            <div class="page-right">
                <button id="btnAdd" class="btn-default" @click="btnAddOnClick()">
                Thêm khách hàng
                </button>
            </div>
        </div>
        <div class="toolbar">
            <input
                type="text"
                class="input-search"
                style="width: 220px"
                placeholder="Tìm kiếm theo mã, tên khách hàng"
            />
            <button class="btn-refresh"></button>
            <button class="btn-delete" @click="btnDeleteData()"></button>
        </div>
        <div class="grid">
            <table id="tblListCustomer" class="table" width="100%" border="0">
                <thead>
                    <tr>
                        <th>Mã khách hàng</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Nhóm khách hàng</th>
                        <th>Điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Số tiền nợ</th>
                        <th>Mã thẻ thành viên</th>
                        <th style="text-align: center;">Đang hoạt động</th>
                        <th :class="{'deleteItems': !isDelete}">Xóa</th>
                    
                    </tr>
                </thead>
                <tbody>
                    <!-- vòng lặp v-for để binding dữ liệu -->
                    <tr v-for="customer in customers" :key='customer.CustomerId' @dblclick="rowOnDblClick(customer.CustomerId)">
                        <td>{{customer.CustomerCode}}</td>
                        <td>{{customer.FullName}}</td>
                        <td>{{customer.GenderName}}</td>
                        <td>{{DateFormat(customer.DateOfBirth)}}</td>
                        <td>{{customer.CustomerGroupName}}</td>
                        <td>{{customer.PhoneNumber}}</td>
                        <td>{{customer.Email}}</td>
                        <td>{{customer.Address}}</td>
                        <td style="text-align: right;">{{customer.DebitAmount}}</td>
                        <td>{{customer.MemberCardCode}}</td>
                        <td style="text-align: center;"><input type="checkbox" checked/></td>
                        <td :class="{'deleteItems': !isDelete}" style="text-align: center;"><button class="button_delete_x" @click="buttonDeleteOnClick(customer.CustomerId)"></button></td>

                    </tr>


                </tbody>
            </table>
        </div>
        <div class="footer">
                <div class="paging-record-info">Hiển thị <b>1-10/1000</b> khách hàng</div>

                <div class="paging">
                    <div id="backward"></div>
                    <div id="previous"></div>
                    
                    <div id="paging_bar">
                        <button class="button_page selected" >1</button>

                        <button class="button_page" >2</button>

                        <button class="button_page">3</button>

                        <button class="button_page">4</button>
                    </div>
                    <div id="next"></div>
                    <div id="forward"></div>
                </div>

                <div class="paging-record-option"><b data-v-a72348a4="">10</b> khách hàng/trang</div>
        </div>
        
        <CustomerDetail 
           :isShow="isShowDialogDetail"
           :customer="selectedCustomer"
           @hideDialog = "hideDialog"
           :formmode="DetailFormMode"
        />
        <Confirm
            :confirmIsShow="isShowConfirmBox"
            @hideConfirmBox = "hideConfirmBox"
            :customerid = "selectedCustomerId"
        />
    </div>
</template>

<script>
import CustomerDetail from './customerDetail.vue';
import Confirm from './confirmBox.vue';
import axios from 'axios';


export default({
    components: {
        CustomerDetail,
        Confirm
    },
    created() {
        //load dữ liệu cho trang
        axios.get("http://api.manhnv.net/api/customers")
        .then(res => {
            this.customers = res.data;

        })
        .catch((res) =>{
            console.log(res);
        });

    },
    props:{
        
    },
    methods: {
        //Load lại data trong bảng
        loadData(){
            axios.get("http://api.manhnv.net/api/customers")
            .then(res => {
            this.customers = res.data;

            })
            .catch((res) =>{
            console.log(res);
            });
        },
        //Phương thức hiện dialog
        btnAddOnClick() {
            this.isShowDialogDetail = true;
            this.selectedCustomer = {};
            this.DetailFormMode = "add";
            
        },
        //Phương thức ẩn dialog
        hideDialog(){
            this.isShowDialogDetail = false;
            this.loadData();
        },
        hideConfirmBox(){
            this.isShowConfirmBox = false;
            this.loadData();
            this.isDelete = false;
        },
        //phương thức tìm kiếm thông tin khách hàng
        searchBarInput() {
            // this.searchInput = this.searchInput.toLowerCase();
            // for (var i = 0; i < 20; i++){
            //     this.fullname = this.customers[i].FullName
            //     if(this.fullname.indexOf(this.searchInput) == -1) this.hasKeyWord = true;
            //     else this.hasKeyWord = false;
            // }
        },
        //phương thức format ngày tháng năm sinh
        DateFormat(DateOfBirth) {
            var newDate = new Date(DateOfBirth);
            var StringDate = newDate.getDate();
            if (StringDate < 10) StringDate = '0' + StringDate;
            var StringMonth = newDate.getMonth() + 1;
            if (StringMonth < 10) StringMonth = '0' + StringMonth;
            var StringYear = newDate.getFullYear();
            return StringDate + '/' + StringMonth + '/' + StringYear;
        },

        //Phương thức hiện thông tin chi tiết của khách hàng
        rowOnDblClick(CustomerId){
            //Hiện dialog
            this.isShowDialogDetail = true;
            //Lấy id của bản ghi được chọn

            //Gọi API lấy thông tin của khách hàng
            axios.get("http://api.manhnv.net/api/customers/" + CustomerId)
            .then(res => {
                this.selectedCustomer = res.data;
            })
            .catch(res =>{
                console.log(res);
                alert("Lấy dữ liệu thất bại");
            })
            //Binding thông tin chi tiết của khách hàng
            //Gán formmode = "edit" để phân biệt với thêm dữ liệu
            this.DetailFormMode = "edit";
        },

        //Phương thức xóa khách hàng 
        btnDeleteData(){
            this.isDelete = true;
        },
        buttonDeleteOnClick(customerId){
            //Tạo biến nhận id của khách hàng cần xóa
            this.selectedCustomerId = customerId;
            //Hiện confirmBox
            this.isShowConfirmBox = true;
        }, 
        
    },
    data() {
        return {
            isShowDialogDetail: false,
            isShowConfirmBox: false,
            selectedCustomer: {},
            selectedCustomerId: "",
            isDelete: false,
            customers:[],
            DetailFormMode: "add",
            searchInput: "",
            hasKeyWord: false,
            fullname: ""
        };
    },
    watch: {},
    mounted() {
        
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

.paging {
    
    width: 400px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: calc(50% - 200px);
    
}

.paging #backward {
    height: 30px;
    width: 30px;
    background-image: url('../../../assets/icon/btn-firstpage.svg');
    background-repeat: no-repeat;
    background-position: center;
}

#backward:hover {
    cursor: pointer;
}

.paging #previous {
    height: 30px;
    width: 30px;
    background-image: url('../../../assets/icon/btn-prev-page.svg');
    background-repeat: no-repeat;
    background-position: center;
}

#previous:hover {
    cursor: pointer;
}

.paging #next {
    height: 30px;
    width: 30px;
    background-image: url('../../../assets/icon/btn-next-page.svg');
    background-repeat: no-repeat;
    background-position: center;
}

#next:hover {
    cursor: pointer;
}

.paging #forward {
    height: 30px;
    width: 30px;
    background-image: url('../../../assets/icon/btn-lastpage.svg');
    background-repeat: no-repeat;
    background-position: center;
}

#forward:hover {
    cursor: pointer;
}

.button_page.selected, .selected:hover {
    background-color: #019160;
    color: #ffffff;
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
.button_delete_x {
    height: 18px;
    width: 15px;
    border: none;
    outline:none;
    background-image: url('../../../assets/icon/x.svg');
    background-repeat: no-repeat;
    background-size: contain;
}

.button_delete_x:active {
    border-color: #E74C3C;
    background-color: #E74C3C;
}
</style>