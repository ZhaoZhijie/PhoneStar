$(function(){
    //console.log("订单页面的cookie商品", $.cookie("order"));
    var goods = gon.goods;
    var goods_basic = gon.goods_basic;//basic info of goods in cart
    var basic = gon.basic;
    console.log("current goods is ",JSON.stringify(goods));

    showGoods(goods, goods_basic);
    showGoodsSummay(goods, goods_basic);
    initUserBasicInput(basic)

    var checklist = [
        {func:check_name, identify:"#order-lastname", err_identify:"#lastname-error"},
        {func:check_name, identify:"#order-firstname", err_identify:"#firstname-error"},
        {func:check_address, identify:"#order-address", err_identify:"#address-error"},
        {func:check_zipcode, identify:"#order-zipcode", err_identify:"#zipcode-error"},
        {func:check_email, identify:"#order-email", err_identify:"#address-email-error"}
    ];

    setFormListener(checklist);

    //After the request is responsed, the cookie order can be removed
    $(".goods-commit").click(function(){
        var checkres = check_form(checklist);
        if(checkres != ""){
            alert(checkres);
            return;
        }
        var lastname = $("#order-lastname").val();
        var firstname = $("#order-firstname").val();
        var address = $("#order-address").val();
        var zipcode = $("#order-zipcode").val();
        var email = $("#order-email").val();
        var params = {goods:goods, address: address, zipcode:zipcode, email:email, firstname:firstname, lastname:lastname};

        $.post("/order/check", params, function(data, status){
            if(status != 'success'){
                alert("Server Error!");
                return;
            }
            if(data.status != 0){
                alert(data.msg)
                return;
            }
            alert(data.msg)
            //if user is not logged int, delete order goods in local cart
            var ids = getGoodsId(goods);
            //console.log("删除前cookie cart ",JSON.stringify(getCookieCart()));
            deleteCookieCartGoods(ids);
            //console.log("删除后cookie cart ",JSON.stringify(getCookieCart()));
            toCart();
        });
    });

    function initUserBasicInput(basic){
        if(basic){
            $("#order-lastname").val(basic.lastname)
            $("#order-firstname").val(basic.firstname)
            $("#order-province").val(basic.province)
            $("#order-city").val(basic.city)
            $("#order-address").val(basic.address)
            $("#order-zipcode").val(basic.zipcode)
            $("#order-email").val(basic.email)
        }
    }
})























