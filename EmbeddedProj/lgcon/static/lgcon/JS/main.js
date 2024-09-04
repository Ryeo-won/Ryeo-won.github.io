function start_btn() {
    document.getElementById("mega_start_img").style.display = 'none';
    document.getElementById("mega_start_btn").style.display = 'none';
    document.getElementById("mega_order").style.display = 'block';
    document.getElementById("mega_menu_table").style.display = 'block';
    document.getElementById("nextpage").style.display = 'flex';
    document.getElementById("pay").style.display = 'flex';
    hide_order_list();
}

function hide_order_list() {
    var list = document.getElementsByClassName("cart");
    for (i = 0; i < list.length; i++) {
        list[i].style.display = 'none';
    }
}


var menu_list = ["추천_음료"];
function open_menu_table(id) {
    all_menu_none();
    document.getElementById(id).style.display = 'block';
}

function all_menu_none() {
    document.getElementById("추천_음료").style.display = 'none';
    document.getElementById("추천_디저트").style.display = 'none';
    document.getElementById("커피_HOT").style.display = 'none';
    document.getElementById("커피_ICE").style.display = 'none';
    document.getElementById("스무디_프라페").style.display = 'none';
    document.getElementById("에이드_주스").style.display = 'none';
    document.getElementById("Tea").style.display = 'none';
    document.getElementById("커피_콜드브루").style.display = 'none';
    document.getElementById("Beverage").style.display = 'none';
    document.getElementById("디저트").style.display = 'none';
}

var menu_bar_page = 1;

function turn_menu_page(btn) {
    var current_page_id = "mega_menu_";
    if (btn == "menu_bar_right") {
        if (menu_bar_page != 3) {
            var past = document.getElementsByClassName(current_page_id + menu_bar_page);
            past[0].style.display = 'none';
            past[1].style.display = 'none';
            past[2].style.display = 'none';
            past[3].style.display = 'none';
            menu_bar_page += 1;
            if(menu_bar_page == 3) {
                all_menu_none();
                document.getElementById("Beverage").style.display = 'block';
            }
            if(menu_bar_page == 2) {
                all_menu_none();
                document.getElementById("스무디_프라페").style.display = 'block';
            }

        }
        var now = document.getElementsByClassName(current_page_id + menu_bar_page);
        now[0].style.display = 'block';
        now[1].style.display = 'block';
        now[2].style.display = 'block';
        now[3].style.display = 'block';


    }

    if (btn == "menu_bar_left") {
        if (menu_bar_page != 1) {
            var past = document.getElementsByClassName(current_page_id + menu_bar_page);
            past[0].style.display = 'none';
            past[1].style.display = 'none';
            past[2].style.display = 'none';
            past[3].style.display = 'none';
            menu_bar_page -= 1;
            if(menu_bar_page == 2) {
                all_menu_none();
                document.getElementById("커피_콜드브루").style.display = 'block';
            }
            if(menu_bar_page == 1) {
                all_menu_none();
                document.getElementById("커피_ICE").style.display = 'block';
            }
        }
        var now = document.getElementsByClassName(current_page_id + menu_bar_page);
        now[0].style.display = 'block';
        now[1].style.display = 'block';
        now[2].style.display = 'block';
        now[3].style.display = 'block';
    }

}


function Item(name, price) {
    this.name = name;
    this.number = 0;
    this.price = parseInt(price);
}


var order_list = [];

function option(id, type, price) {
    var drinks = document.querySelectorAll(`[id='${id}']`);
    drinks.forEach(drink => {
        drink.style.borderStyle = 'solid';
        drink.style.borderColor = 'red';
    });

    var order = new Item(id, price);
    var existingOrder = order_list.find(item => item.name === id);
    if (existingOrder) {
        existingOrder.number += 1;
    } else {
        order.number += 1;
        order_list.push(order);
    }
    
    open_order_list(order_list);
}


function deleteItem(index) {
    if (index >= 0 && index < order_list.length) {
        var itemName = order_list[index].name;
        order_list.splice(index, 1);


        var remainingOrder = order_list.find(item => item.name === itemName);
        if (!remainingOrder) {
            var drinks = document.querySelectorAll(`[id='${itemName}']`);
            drinks.forEach(drink => {
                drink.style.borderStyle = 'none';
                drink.style.borderColor = 'transparent';
            });
        }

        open_order_list(order_list);
    } else {
        console.error("Invalid index: ", index);
    }

    if (order_list.length === 0) {
        clear_order_list();
    }
}

function resetItemBorder(id) {
    var drink = document.getElementById(id);
    if (소주) {
        drink.style.borderStyle = 'none';
    }
}


function increaseQuantity(index) {
    if (order_list[index]) {
        order_list[index].number += 1;
        open_order_list(order_list);
    } else {
        console.error("Invalid index: ", index);
    }
}

function decreaseQuantity(index) {
    if (order_list[index]) {
        var itemName = order_list[index].name;

        if (order_list[index].number > 1) {
            order_list[index].number -= 1;
        } else {
            order_list.splice(index, 1);

            var remainingOrder = order_list.find(item => item.name === itemName);
            if (!remainingOrder) {
                var drinks = document.querySelectorAll(`[id='${itemName}']`);
                drinks.forEach(drink => {
                    drink.style.borderStyle = 'none';
                    drink.style.borderColor = 'transparent';
                });
            }
        }

        open_order_list(order_list);
    }else {
        console.error("Invalid index: ", index);
    }

    if (order_list.length === 0) {
        clear_order_list();
    }
}


var total_list = [0, 0];

function open_order_list(order_list) {
    var total_num = 0;
    var total_price = 0;

    for (var i = 0; i < order_list.length; i++) {
        var order_id = "order_" + (i + 1);
        document.getElementById(order_id).style.display = 'flex';

        document.getElementById("range_" + (i + 1)).innerText = (i + 1) + ". " + order_list[i].name;
        document.getElementById("amount_" + (i + 1)).innerText = order_list[i].number + "개";
        document.getElementById("item_price_" + (i + 1)).innerText = order_list[i].price * order_list[i].number + "원";

        total_num += order_list[i].number;
        total_price += order_list[i].price * order_list[i].number;
    }

    for (var j = order_list.length + 1; j <= 20; j++) {
        var order_id = "order_" + j;
        document.getElementById(order_id).style.display = 'none';
        document.getElementById("range_" + j).innerText = '';
        document.getElementById("amount_" + j).innerText = '';
        document.getElementById("item_price_" + j).innerText = '';
    }

    document.getElementById("item_number").innerHTML = "_________________________<br>선택한 상품 " + total_num + "개";
    document.getElementById("total_price").innerHTML = total_price + "원<br>결제하기";
    total_list[0] = total_num;
    total_list[1] = total_price;

    write_order_list_window_pay(order_list);

    if (order_list.length === 0) {
        clear_order_list();
    }
}

function clear_order_list() {
    for (var i = 1; i <= 20; i++) {
        var order_id = "order_" + i;
        document.getElementById(order_id).style.display = 'none';
        document.getElementById("range_" + i).innerText = '';
        document.getElementById("amount_" + i).innerText = '';
        document.getElementById("item_price_" + i).innerText = '';
    }

    document.getElementById("item_number").innerHTML = "_________________________<br>선택한 상품 0개";
    document.getElementById("total_price").innerHTML = "0원<br>결제하기";
    total_list[0] = 0;
    total_list[1] = 0;
}

var takeoutOption = "";

function chooseOption(option) {
    takeoutOption = option;
    change_window_btn(); 
}


/*결제 창*/
function open_window_pay () {

    document.getElementById("window_pay").style.display = 'block';
    document.getElementById("screen_to_window_pay").style.display  = 'block';
    write_order_list_window_pay(order_list);
    
    document.getElementById("w_total_number").innerText = total_list[0];
    document.getElementById("w_total_price").innerText =total_list[1];
    
    document.getElementById("돌아가기").style.display = 'block';
    document.getElementById("먹고가기").onclick = function() { chooseOption("먹고가기"); };
    document.getElementById("가져가기").onclick = function() { chooseOption("가져가기"); };

    document.getElementById("돌아가기_2").style.display = 'none';
    document.getElementById("쿠폰사용").style.display = 'none';
    document.getElementById("간편결제").style.display = 'none';
    document.getElementById("카드결제").style.display = 'none';
    

}

function close_window_pay () {
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display  = 'none';
    back_2_window_btn();
}

function write_order_list_window_pay(order_list) {
    var max_items = 20;

    for (var i = 0; i < order_list.length && i < max_items; i++) {
        var window_id = "window_" + (i + 1);
        document.getElementById(window_id).style.display = 'flex';
        document.getElementById("w_order_" + (i + 1)).innerText = (i + 1) + ". " + order_list[i].name;
        document.getElementById("w_number_" + (i + 1)).innerText = order_list[i].number + "개 " + (order_list[i].price * order_list[i].number).toFixed(0) + "원";
    }

    for (var j = order_list.length + 1; j <= max_items; j++) {
        var window_id = "window_" + j;
        document.getElementById(window_id).style.display = 'none';
        document.getElementById("w_order_" + j).innerText = '';
        document.getElementById("w_number_" + j).innerText = '';
    }
}

function change_window_btn() {
    document.getElementById("돌아가기").style.display = 'none';
    document.getElementById("먹고가기").style.display = 'none';
    document.getElementById("가져가기").style.display = 'none';

    document.getElementById("돌아가기_2").style.display = 'block';
    document.getElementById("쿠폰사용").style.display = 'block';
    document.getElementById("간편결제").style.display = 'block';
    document.getElementById("카드결제").style.display = 'block';
    
}

function back_2_window_btn() {
    document.getElementById("돌아가기").style.display = 'block';
    document.getElementById("먹고가기").style.display = 'block';
    document.getElementById("가져가기").style.display = 'block';

    document.getElementById("돌아가기_2").style.display = 'none';
    document.getElementById("쿠폰사용").style.display = 'none';
    document.getElementById("간편결제").style.display = 'none';
    document.getElementById("카드결제").style.display = 'none';
}

function back_window_btn() {
    document.getElementById("w_간편결제").style.display = 'none';
    document.getElementById("window_pay").style.display = 'block';
    document.getElementById("screen_to_window_pay").style.display  = 'block';
    back_2_window_btn();

}

function open_w_간편결제() {
    document.getElementById("w_간편결제").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_간편결제_total_price").innerText = total_list[1]+"원";
}

function close_w_간편결제() {
    document.getElementById("w_간편결제").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display = 'none';
    back_2_window_btn();
}


function open_w_카드결제() {
    document.getElementById("w_카드결제").style.display = 'block';
    document.getElementById("window_pay").style.display = 'none';
    document.getElementById("w_카드결제_total_price").innerText = total_list[1]+"원";

    document.getElementById("insert_card_moving").style.display='block';
    
}

function close_w_카드결제() {
    document.getElementById("w_카드결제").style.display = 'none';
    document.getElementById("screen_to_window_pay").style.display = 'none';
    document.getElementById("insert_card_moving").style.display = 'none';
    back_2_window_btn();
}

function 결제완료() {
    alert("감사합니다. 결제가 완료되었습니다. 교환권과 카드를 챙겨가세요.");
    location.href = "http://127.0.0.1:8000/1";
}

function herf_home() {
    location.href = "http://127.0.0.1:8000/1";
}


var ca = document.getElementsByClassName("ca");


function handleClick(event) {
  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < ca.length; i++) {
      ca[i].classList.remove("clicked");
    }

    event.target.classList.add("clicked");
  }
}

function init() {
  for (var i = 0; i < ca.length; i++) {
    ca[i].addEventListener("click", handleClick);
  }
}

init();
