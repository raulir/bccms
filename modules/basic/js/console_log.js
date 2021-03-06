// send console.log output to ajax

function console_log_send(message){

	get_ajax_panel(
			'basic/console_log',
			{
				'do': 'console_log_write',
				'message': message
			},
			function(){}
	);

}

// redefine console.log
(function(){
    var original_log = console.log;
    console.log = function (message) {
    	console_log_send('log:   ' + message)
    	original_log.apply(console, arguments);
    };
})();

(function(){
    var original_warn = console.warn;
    console.warn = function (message) {
    	console_log_send('warn:  ' + message)
    	original_warn.apply(console, arguments);
    };
})();

(function(){
    var original_info = console.info;
    console.info = function (message) {
    	console_log_send('info:  ' + message)
    	original_info.apply(console, arguments);
    };
})();

(function(){
    var original_error = console.error;
    console.error = function (message) {
    	console_log_send('error: ' + message)
    	original_error.apply(console, arguments);
    };
})();
