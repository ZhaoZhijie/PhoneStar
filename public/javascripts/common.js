

//update cart data to cookie for unlogged user
function addCookieCart(good_id, num){
    cart = getCookieCart();
    var isInCart = false;
    for(var i = 0; i < cart.length; i++){
        if(cart[i].good_id == good_id){
            cart[i].num += num;
            isInCart = true;
            console.log("good is in cart", good_id);
            break;
        }
    }
    if(!isInCart){
        console.log("good is not in cart", good_id);
        cart.push({good_id:good_id, num:num});
    }
    saveCookieCart(cart);
    alert("Add to cart successfully!")
}

//delete goods in the local cart
function deleteCookieCartGoods(ids){
    cart = getCookieCart();
    for(var i = 0; i < cart.length; i++){
        if(ids.indexOf(cart[i].good_id) != -1){
            cart.splice(i, 1);
            i--;
        }
    }
    saveCookieCart(cart);
}

//get cookie cart and transform it to the same format as server
function getCookieCart(){
    var cartstr = $.cookie("cart") || "[]";
    var cart = null;
    try{
        cart = JSON.parse(cartstr);
    }catch(ex){
        console.error("transform cart cookie string to object error:", cartstr);
        cart = []
    }
    return cart;
}

function saveCookieCart(cart){
    var cartstr = JSON.stringify(cart);
    $.cookie("cart", cartstr, {path:"/"});
}


//get goods contained in order
function getCookieOrderGoods(){
    console.log("cookie order is ", $.cookie("order", {path:"/"}))
    var orderstr = $.cookie("order") || "[]";
    var order = [];
    try{
        order = JSON.parse(orderstr)
    }catch(ex){
        console.error("load cookie order error")
    }
    return order;
}

//save order goods to cookie
function saveCookieOrderGoods(goods){
    var goodstr = JSON.stringify(goods);
    console.log("cookie保存前的值", goodstr)
    $.cookie("order", goodstr);
    console.log("cookie保存后的值", $.cookie("order"))
}

//clear order goods saved in cookie
function clearCookieOrderGoods(){
    $.removeCookie("order");
}

//get goods id
function getGoodsId(goods){
    var ids = [];
    for(var i = 0; i < goods.length; i++){
        ids.push(goods[i].good_id)
    }
    return ids;
}

//transform goods array to list string id-num|id-num...
function goods2liststr(goods){
    var paramstr = ""
    for(var i = 0; i < goods.length; i++){
        var good = goods[i]
        var unit = good.good_id+"-"+good.num
        paramstr += i == 0 ? unit : "|"+unit
    }
    return paramstr;
}

//order goods, redict to order page
function orderGoods(goods){
    var liststr = goods2liststr(goods);
    var data = {goodlist:liststr};
    window.location.href = "/order/order_page?"+$.param(data);
}

//redict to cart page
function toCart(){
    var goods = getCookieCart();
    var liststr = goods2liststr(goods);
    var data = {goodlist:liststr};
    window.location.href = "/cart/cart_page?"+$.param(data);
}












