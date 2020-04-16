
class HomeController < ApplicationController
    def records
        #只返回最近7天的记录
        time = Integer(Time.now - 7*24*3600)
        records = Visits.where("time > ?", time).order(time: :desc)
        gon.records = records
    end
end


































