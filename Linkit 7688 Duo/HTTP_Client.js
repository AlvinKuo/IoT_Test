var http = require('http');
var qs = require("querystring");

var post_option = {
	host:'192.168.1.118',
	port:'32780',
	path:'/POST/TEST',
	method:'POST'
}

var get_option = {
	host:'192.168.1.118',
	port:'32780',
	path:'/GET/TEST/?id=123&data=456'	
	
}


callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

/*
var req = http.request(post_option, callback);
//This is the data we are posting, it needs to be a string or a buffer
req.write("hello world!");
req.end();
*/

http.request(get_option, callback).end();