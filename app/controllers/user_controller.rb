class UserController < ApplicationController
    skip_before_action :verify_authenticity_token
    #获取某一个商品的详细信息
    def detail_data
        good_id = params[:good_id]
        puts "客户端商品id是#{good_id}"
        record = Goods.find(good_id)
        good_properties = get_good_config(good_id)
        data = {"good"=>record, "properties"=>good_properties}
        respond_to do |format|
            format.json {render json:data.to_json}
        end
    end


    #register
    def register
        username = params[:username]
        #check if username is exists
        res = {:status=>0, :msg=>"reigster sucessfully!"}
        if Users.where("username=?",username).length != 0
            res[:status] = 1
            res[:msg] = "Username is already registered!"
            puts "用户名已经存在"
        else
            password = params[:password]
            email = params[:email]
            newuser = Users.new
            newuser.username = username
            newuser.password = Digest::MD5.hexdigest(password)
            if newuser.save
                log_in(newuser)
            else
                res[:status] = 2
                res[:msg] = "Regist error, please try again later!"
            end
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    #login
    def login
        res = {:status=>0, :msg=>"Login Sucessfully!"}
        username = params[:username]
        password = params[:password]
        password = Digest::MD5.hexdigest(password)
        users = Users.where(username:username, password:password)
        if users.length == 0
            res[:status] = 1
            res[:msg] = "Username or password is incorrect!"
        else
            log_in(users[0])
        end
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    def logout
        session.delete(:user_id)
        session.delete(:user_id)
        session.delete(:username)
        res = {:status=>0}
        respond_to do |format|
            format.json {render json:res.to_json}
        end
    end

    private
        #获取商品的属性配置信息
        def get_good_config(id)
            records = Properties.select("attr_name, attr_val").where("good_id=?", id)
            return records
        end

        def log_in(user)
            puts "处理用户登录信息"
            session[:user_id] = user.id
            cookies[:user_id] = user.user_id
            cookies[:username] = user.username
        end  

end



























