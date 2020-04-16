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


time = Time.now
str = Time.at time
puts str







