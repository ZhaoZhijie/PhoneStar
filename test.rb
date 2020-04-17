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


goods = []
goodlist = "123-1|234-15|22-3"
arr = goodlist.split("|")
arr.each do |item|
    strs = item.split("-")
    good_id = Integer(strs[0])
    num = Integer(strs[1])
    goods<<{:good_id=>good_id, :num=>num}
end

puts goods













