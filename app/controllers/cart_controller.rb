

class CartController < ApplicationController
    
    def add2cart
        user_id = session[:user_id]
        res = {:status=>0, :msg=>"Add to cart successfully!"}
        if not user_id
            res[:status] = 1
            res[:msg] = "Illegal operation!"
        else
            #if record is already exist, update, or create new
            good_id = params[:good_id]
            num = Integer(params[:num])
            records = Carts.where(user_id:user_id, good_id:good_id)
            if records.length == 0
                record = Carts.new
                record.user_id = user_id
                record.good_id = good_id
                record.num = num
                if not record.save
                    res[:status] = 2
                    res[:msg] = "Failed to add item to cart!"
                end
            else
                ActiveRecord::Base.connection.execute("UPDATE carts SET num = num + #{num} WHERE user_id = #{user_id} AND good_id = #{good_id}") 
            end

        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    def cart_page
        if session[:user_id]
            puts "从服务器获取用户#{session[:user_id]}的购物车数据"
            gon.cart = Carts.where(user_id: session[:user_id])
            puts "购物车长度#{gon.cart.length}"
        else
            gon.cart = nil
        end
    end
end






























