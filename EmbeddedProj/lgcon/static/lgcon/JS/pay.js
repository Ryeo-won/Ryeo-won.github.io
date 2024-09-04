var IMP = window.IMP;
IMP.init(""); // 고객사 식별코드

var today = new Date();
var hours = today.getHours(); 
var minutes = today.getMinutes(); 
var seconds = today.getSeconds(); 
var milliseconds = today.getMilliseconds();
var makeMerchantUid = hours + minutes + seconds + milliseconds;

// 예시로 고객 ID와 UID를 설정 (서버에서 제공받아야 함)
var customer_id = 'CUST-' + Date.now(); // 실제 고객 ID로 대체 필요
var customer_uid = 'UID-' + Math.random().toString(36).substr(2, 16); // 실제 고객 UID로 대체 필요

function getCSRFToken() {
    const token = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
    return token;
}

function kakaoPay() {
    IMP.request_pay({
        pg: 'kakaopay',
        pay_method: 'card',
        merchant_uid: "IMP" + makeMerchantUid,
        name: '상명대학교 카페',
        amount: total_list[1],
        buyer_email: 'Iamport@chai.finance',
        buyer_name: '상명대학교 스마트정보통신공학과',
        buyer_tel: '010-1234-5678',
        buyer_addr: '충청남도 천안시 동남구 상명대길 31',
        buyer_postcode: '123-456',
        customer_uid: customer_uid, // 고객 UID
        customer_id: customer_id  // 고객 ID
    }, function (rsp) { 
        if (rsp.success) {
            alert('결제가 성공적으로 완료되었습니다.');
            fetch("http://127.0.0.1:8000/orders/api/order-data/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({
                    order_list: order_list, 
                    current_url: window.location.href,
                    total_price: total_list[1],
                    takeout_option: takeoutOption,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            alert('결제에 실패하였습니다. ' + rsp.error_msg);
            console.log(rsp);
        }
    history.go(0);
    });
}


function tossPay() {
    IMP.request_pay({
        pg: 'tosspay', 
        pay_method: 'card',
        merchant_uid: "IMP" + makeMerchantUid,
        name: '상명대학교 카페',
        amount: total_list[1], 
        buyer_email: 'Iamport@chai.finance',
        buyer_name: '상명대학교 스마트정보통신공학과',
        buyer_tel: '010-1234-5678',
        buyer_addr: '충청남도 천안시 동남구 상명대길 31',
        buyer_postcode: '123-456',
        customer_uid: customer_uid,
        customer_id: customer_id  
    }, function (rsp) { 
        if (rsp.success) {
            alert('결제가 성공적으로 완료되었습니다.');
            fetch("http://127.0.0.1:8000/orders/api/order-data/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({
                    order_list: order_list, 
                    current_url: window.location.href,
                    total_price: total_list[1],
                    takeout_option: takeoutOption,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            alert('결제에 실패하였습니다. ' + rsp.error_msg);
            console.log(rsp);
        }
    history.go(0);
    });
}

function payco() {
    IMP.request_pay({
        pg: 'payco', 
        pay_method: 'payco',
        merchant_uid: "IMP" + makeMerchantUid,
        name: '상명대학교 카페',
        amount: total_list[1],
        buyer_email: 'Iamport@chai.finance',
        buyer_name: '상명대학교 스마트정보통신공학과',
        buyer_tel: '010-1234-5678',
        buyer_addr: '충청남도 천안시 동남구 상명대길 31',
        buyer_postcode: '123-456',
        customer_uid: customer_uid,
        customer_id: customer_id
    }, function (rsp) { 
        if (rsp.success) {
            alert('결제가 성공적으로 완료되었습니다.');
            fetch("http://127.0.0.1:8000/orders/api/order-data/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({
                    order_list: order_list,
                    current_url: window.location.href,
                    total_price: total_list[1],
                    takeout_option: takeoutOption,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            alert('결제에 실패하였습니다. ' + rsp.error_msg);
            console.log(rsp);
        }
    history.go(0);
    });
}


function card_success(){
    alert('카드결제가 완료되었습니다.');
    fetch("http://127.0.0.1:8000/orders/api/order-data/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            order_list: order_list,
            current_url: window.location.href,
            total_price: total_list[1],
            takeout_option: takeoutOption,
        }),
    })
    history.go(0);
}
