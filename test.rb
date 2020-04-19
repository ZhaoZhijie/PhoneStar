require 'pg'
require 'time'

def testpg
    conn = PG.connect( :dbname => 'goods_db', :host => 'localhost', :port => 5432,:user => 'postgres' , :password => '17951' )

    res = conn.query("SELECT * FROM goods LIMIT 10;")
    
    res.values.collect do |row|
        puts row.collect {|col| "%-15s" % [col] }.join( '' )
        result = row.to_json
        puts "result is #{result}"
    end
    record = []
    
    res.each do |e|
        obj = e.to_json
        record.push obj
    end
    
    puts record.to_json
    res.clear
    conn.close
end

def create_order_id
    time = Time.now
    puts Integer(time.usec/1000)
    str = "%4d%02d%02d%02d%02d%02d%03d" % [time.year, time.month, time.day, time.hour, time.min, time.sec, Integer(time.usec/1000)]
    puts str
end


def check_len(str, max=50, min=1)
    return str.length <= max || str.length >= min
end

def send_order_email(lastname, firstname, order_id, money, email)
    message = user_order_message(lastname, firstname, order_id, money, email)
    send_email(message, "385434432@qq.com", email)
end

def user_order_message(lastname, firstname, order_id, money, email)
    message = order_email_message()
    message = message.tr("$from", "385434432@qq.com")
    message = message.tr("$to", email)
    message = message.tr("$lastname", lastname)
    message = message.tr("$firstname", firstname)
    message = message.tr("$order_id", order_id)
    message = message.tr("$money", money.to_s)
    return message
end

def order_email_message
    message = <<-MSGEND
    From: Private Person $from
    To: A Test User $to
    MIME-Version: 1.0
    Content-type: text/html
    Subject: SMTP e-email test
    Dear $lastname $firstname,
    Congratulations on your successful order on the Phone Star shopping website. The products you choose will be sent to your address at full speed, please wait patiently. Your order number is $order_id and the total fee is $money. You can query the order details information on the phonestar shopping website.
    MSGEND
    return message 
end

def send_email(message, from, to)
    server = 'smtp.gmail.com'
    port = 587
    domain = 'gmail.com'
    username = 'zjnear'
    password = 'zzj5418245'
    Net::SMTP.start(server, port, domain, username, password, :login) do |smtp|
        res = smtp.starttls?()
        puts "是否有开启ttls #{res}"
        smtp.send_message(message, from, to)
    end
end

require 'net/smtp'

reg = / /

if reg =~ " "
    puts "yes"
end
