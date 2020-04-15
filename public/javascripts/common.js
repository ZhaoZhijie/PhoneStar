
    
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
        $.cookie("cart", cartstr);
    }















