
$(function(){
    var cart = null;
    if($.cookie("username")){
        cart = gon.cart
    } else {
        cart = getCookieCart();
    }
    var selected = {};//selected goods
    var goods = {};//goods in the cart
    showCart(cart);

    $("#goods-box").on("click", ".good-tick", function(){
        var gid = $(this).attr("gid");
        obj = gid == "all" ? $(".good-tick") : $(this);
        if(selected[gid]){
            obj.css("background-image", 'none');
            obj.attr("tick", "no");
        } else {
            obj.css("background-image", 'url("/images/icons/tick.png")');
            obj.attr("tick", "yes");
        }
        if(selected[gid]){
            if(gid == "all"){
                //set all unselected;
                selected = {};
            } else {
                selected[gid] = false;
                selected["all"] = false;
                $("#tick-all").css("background-image", 'none');
                $("#tick-all").attr("tick", "no");
            }
        } else {
            if(gid == "all"){
                setAllSelected(selected, cart);
            } else {
                selected[gid] = true;
            }
        }
    })

    //redict to order page
    $("#cart-commit").click(function(){
        window.location.href="/order/order_page";  
    });

    //set all selected
    function setAllSelected(selected, cart){
        for(var i = 0; i < cart.length; i++){
            selected[cart[i].good_id] = true;
        }
        selected["all"] = true;
    }

    //get goods brief data from server and display
    function showCart(cart){
        if(cart.length == 0){
            $("#empty-cart-info").css("display", "block");
        } else {
            var ids = [];
            for(var i= 0; i < cart.length; i++){
                var item = cart[i]
                ids.push(item.good_id);
            }
            if(ids.length > 0){
                var data = {ids:ids};
                //alert("id集是"+JSON.stringify(ids))
                $.post("/good/good_brief", data, function(data, status){
                    if(status != 'success'){
                        alert("Server Error!")
                        return;
                    }
                    displayGoods(data, cart)
                })
            }
        }
    }

    //show goods list in cart
    function displayGoods(goods, cart){
        //count good num
        var cartgoods = {}
        for(var i = 0; i < cart.length; i++){
            var item = cart[i];
            gid = item.good_id
            if(!cartgoods[gid]){
                cartgoods[gid] = 0;
            }
            cartgoods[gid] += item.num;
        }
        var htmlstr = "";
        for(var i = 0; i < goods.length; i++){
            var good = goods[i];
            if(cartgoods[good.id]){
                num = cartgoods[good.id];
                var unitstr = '<p class="cart-good-item"  gid=$good_id>'+
                                '<span class="list-good col-tickbox"><label class="good-tick"  tick="no"></label></span>'+
                                '<a href="$link"><img class="list-good col-cover" src=$cover gid=$good_id/></a>'+
                                '<a href="$link"><span class="list-good col-product">$titles</span></a>'+
                                '<span class="list-good col-price">￥$price</span>'+
                                '<span class="list-good col-num">$num</span>'+
                                '<span class="list-good col-total pink-color">￥$total</span>'+
                            '</p>';
                            unitstr = unitstr.replace("$cover", good.cover);            
                unitstr = unitstr.replace("$good_id", good.id);
                unitstr = unitstr.replace("$titles", good.titles);
                unitstr = unitstr.replace("$price", good.price);
                unitstr = unitstr.replace("$num", num);
                unitstr = unitstr.replace("$total", good.price*num);
                unitstr = unitstr.replace(/\$link/g, "/good/detail?good_id="+good.id);
                htmlstr += unitstr;
            }
        }
        $("#goods-list").html(htmlstr);
    }

})

























