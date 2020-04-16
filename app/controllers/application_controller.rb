class ApplicationController < ActionController::Base
    before_action :record_visit

    private
        def record_visit
            record = Visits.new
            record.ip = request.remote_ip
            record.time = Time.now
            record.path = request.path
            record.timestr = Time.at record.time
            record.save
        end
end
