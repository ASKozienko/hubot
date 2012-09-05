// Description:
//   Hubot status
//
//Commands:
//   hubot status - Reply with status
//

module.exports = function(robot) {

    var start = new Date().getTime();

    var numPlural = function(num) {
        return (num != 1) ? 's' : '';
    };

    var uptime = function() {
        var now = new Date().getTime();

        uptime_seconds = Math.floor((now - start) / 1000);
        var intervals = {};
        intervals.day = Math.floor(uptime_seconds / 86400);
        intervals.hour = Math.floor((uptime_seconds % 86400) / 3600);
        intervals.minute = Math.floor(((uptime_seconds % 86400) % 3600) / 60);
        intervals.second = ((uptime_seconds % 86400) % 3600) % 60;

        var elements = [];
        for (var interval in intervals) {
            if (intervals[interval] > 0) {
                elements.push(intervals[interval] + ' ' + interval + numPlural(intervals[interval]));
            }
        }

        if (elements.length > 1) {
            var last = elements.pop();
            var response = elements.join(', ');
            response += ' and ' + last;
        } else {
            var response = elements.join(', ');
        }

        return response;
    };

    robot.respond(/status$/i, function(response){
        var msg = "Status: live\n";
        msg += "Version: " + robot.version + "\n";
        msg += "Uptime: " + uptime();

        response.send(msg);
    });
};
