$(document).ready(function () {
   
    setEvent();
    loadData(1);
   
})

/**
 * Load dữ liệu khách hàng
 * */
function setEvent() {
    $(".btn-add").click(function () {
        
       
        $(".dialog").removeClass("dialog-hide");
        $(".dialog-modal").removeClass("dialog-hide");
        $(".dialog-modal input").val('');
        $(".dialog input").val('');
    });
    $(".close").click(function () {
        $(".dialog").addClass("dialog-hide");
        $(".dialog-modal").addClass("dialog-hide");
    });
    $(".btn-save").click(function () {
        // Thu thập các thông tin của khách hàng đã nhập liệu:
        
        var customerCode = $('#txtCustomerCode').val();
        var fullName = $('#txtFullName').val();
        var customerNumber = $('#txtPhoneNumber').val();
        var Customerdate = $("#dtDateOfBirth").val();
        var CustomerEmail = $("#txtEmail").val();
        var CustomerGroup = $("select#cbCustomerGroup option:checked").text();
        var CustomeGroupID = $('#cbCustomerGroup').val();
        var CustomerGender = $("#cbGender input[type='radio']:checked").val();
        //alert(CustomerGender);
        var newcustomer = {
            "customercode": customerCode,
            "fullname": fullName,
            "Gender": CustomerGender,
            "Address": "Hà Nội",
            "DateOfBirth": Customerdate,
            "Email": CustomerEmail,
            "PhoneNumber": customerNumber,
            "CustomerGroupId": CustomeGroupID,
            "DebitAmount": null,
            "MemberCardCode": "",
            "CompanyName": "MISA",
            "CompanyTaxCode": "",
            "IsStopFollow": false,
            "CustomerGroupName": CustomerGroup,
            "GenderName": "Không xác định",
            "MISAEntityState": 0
        }
        // gọi service để lưu lại:
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            url: "http://api.manhnv.net/api/customers",
            data: JSON.stringify(newcustomer),
            async: false,
            
            contenttype: "application/json"
        })
         .done(function (response) {
             alert('thêm thành công!');
             $(".dialog").addClass("dialog-hide");
             $(".dialog-modal").addClass("dialog-hide");
             loadData();
         }).fail(function (response) {
             alert(response.responseText);
        })
    });
    //$(document).on('dblclick', '#tblListCustomer tbody tr', function () {
    //    var customer = $(this).data('record');
    //    var dob = new Date(customer.DateOfBirth);
    //    var stringYear = dob.getFullYear();
    //    var dateString = dob.getDate();
    //    var monthString = dob.getMonth() + 1;
    //    monthString = monthString < 10 ? `0${monthString}` : monthString;
    //    dateString = dateString < 10 ? `0${dateString}` : dateString;
    //    var yyyymmdd = `${stringYear}-${monthString}-${dateString}`;
       
    //    $("#txtCustomerCode").val(customer.CustomerCode);
    //    $("#txtFullName").val(customer.FullName);
    //    $("#dtDateOfBirth").val(yyyymmdd);
    //    $("#txtPhoneNumber").val(customer.PhoneNumber);
    //    $("#txtEmail").val(customer.Email);
    //    //$("#cbGender input[type='radio']:checked").val(customer.Gender);
    //    $("#cbCustomerGroup").val(customer.CustomerGroupId);
    //    $(".dialog").removeClass("dialog-hide");
    //    $(".dialog-modal").removeClass("dialog-hide");
    //    // binding dữ liệu thông tin khách hàng:
    //});
    $(document).on('dblclick', '#tblListCustomer tbody tr', function () {
        $(".dialog").removeClass("dialog-hide");
        $(".dialog-modal").removeClass("dialog-hide");
        var recordId = $(this).data('recordId');
        alert(recordId);
        $.ajax({
            method: "GET",
            url: `http://api.manhnv.net/api/customers/${recordId}`,
            async: false,
        }).done(function (response) {
            var customer = response;
          
            var dob = new Date(customer.DateOfBirth);
            var stringYear = dob.getFullYear();
            var dateString = dob.getDate();
            var monthString = dob.getMonth() + 1;
            monthString = monthString < 10 ? `0${monthString}` : monthString;
            dateString = dateString < 10 ? `0${dateString}` : dateString;
            var yyyymmdd = `${stringYear}-${monthString}-${dateString}`;
            $("#txtCustomerCode").val(customer.CustomerCode);
            $("#txtFullName").val(customer.FullName);
            $("#dtDateOfBirth").val(yyyymmdd);
            $("#txtPhoneNumber").val(customer.PhoneNumber);
            $("#txtEmail").val(customer.Email);
            //$("#cbGender").val(customer.Gender);
            $("#cbCustomerGroup").val(customer.CustomerGroupId);
        }).fail(function (response) {
            console.log(response);
        })
    });

}


function loadData() { 

    //demo:

    $('table#tblListCustomer tbody').empty();
    // lấy dữ liệu từ Api về;
    var data = getData();
    buildDataTableHTML(data);
    // Xử lý dữ liệu:
}

/**
 * Hàm thực hiện lấy dữ liệu
 * */
function getData() {
    var customers = null;
    $.ajax({
        method: "GET",
        url: "http://api.manhnv.net/api/customers",
        data: null,
        async: false,
        contentType: "application/json"
    }).done(function (response) {
        customers = response;
    }).fail(function (response) {
        alert("Không thể lấy dữ liệu từ Api");
    })
    return customers;
}


function buildDataTableHTML(data) {
    $('table#tblListCustomer tbody').html('');
    $.each(data, function (index, customer) {
        var dateOfBirth = customer.DateOfBirth;
        var dateFormat = formatDateDDMMYYYY(dateOfBirth);
        var debitAmout = 5455254572452;
        var moneyFormat = formatMoney(debitAmout);
        var trHTML = $(`<tr>
                        <td>${customer.CustomerCode}</td>
                        <td>${customer.FullName}</td>
                        <td>${customer.GenderName}</td>
                        <td>${dateFormat}</td>
                        <td>${customer.CustomerGroupName}</td>
                        <td>${customer.PhoneNumber}</td>
                        <td>${customer.Email}</td>
                        <td>${moneyFormat}</td>
                        <td><input type="checkbox" checked/></td>
                    </tr>`);
                    trHTML.data('recordId', customer.CustomerId);
                    trHTML.data('record', customer);
       $('table#tblListCustomer tbody').append(trHTML);


    })
   
}

function formatDateDDMMYYYY(date) {
    if (!date) {
        return "(chưa sinh)";
    }
    var newDate = new Date(date);
    var dateString = newDate.getDate();
    var monthString = newDate.getMonth() + 1;
    var year = newDate.getFullYear();
    var s = '';
    var t = '';
    if (dateString < 10) {
         s = '0' + dateString.toString();
    } else {
        s = dateString.toString();
    }
    if (monthString < 10) {
         t = '0' + monthString.toString();
    } else {
        t = monthString.toString();
    }
    return `${s}/${t}/${year}`;
}

function formatMoney(money) {
    var moneyFormat = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " VND";;
    return moneyFormat;
}

/**
 * Xử lý hiển thị tiền tệ - cách 2
 * @param {Number} money Số tiền dạng decimal
 * CreatedBy: NVMANH (17/03/2021)
 */
function formatMoney(money) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0
    })
    if (money) {
        return formatter.format(money) // "$1,000.00"
    }
    return "";
}

