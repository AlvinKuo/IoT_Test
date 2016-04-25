
var http = require('http');
var qs = require("querystring");
var StingBuilder = require("stringbuilder");

var handleRequest = function(request, response){

	switch(request.method)
	{
		case "GET":
			console.log('HTTP GET');
			if(request.url == "/")
			{
				//getHome(request, response);
				getTmpHum(request, response);
			}
			else{
				get404(request, response);
			}			
			break;
		case "POST":
			getHome(request, response);
			console.log('HTTP POST');
			break;
		default:
			console.log('HTTP Not POST and GET');
			get405(request, response);
			break;
	}
	
    //response.end('Hello I am Linkit 7688 Duo');
}
var server = http.createServer(handleRequest);

server.listen(8080,'192.168.1.89',function(){
    console.log('HTTP Server work on http://192.168.1.68:8080/');
});


function getHome(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write("<html><head><title>Home</title></head><body>Click <a href='http://mylinkit.local/' >here</a> to go into Linkit 7688 Duo home page.</body></html>");
	response.end();	
}


function get404(request, response)
{
	response.writeHead(404, {'Content-Type': 'text/html'});
	response.write("<html><head><title>404 Error</title></head><body>404 Error Click <a href='/' >here</a> to home page.</body></html>");
	response.end();	
}


function get405(request, response)
{
	response.writeHead(405, {'Content-Type': 'text/html'});
	response.write("<html><head><title>405 Method not Support.</title></head><body>405 Method not supported. Click <a href='/' >here</a> to home page.</body></html>");
	response.end();	
}

function getTmpHum(request, response)
{
	var sb = new StingBuilder({newline:"\r\n"});
	
	sb.appendLine("<html>");
	sb.appendLine("<head>");
	sb.appendLine("<title>");
	sb.appendLine("Temperature and Humidity");
	sb.appendLine("</title>");
	sb.appendLine("<head>");
	sb.appendLine("<body>");
	sb.appendLine("<form method='post' ");
	sb.appendLine(" <table>");
	sb.appendLine("<tr>");
	sb.appendLine("<td> Temperature :</td>");
	sb.appendLine("<td><input type='text' id='temp' name='tempvalue' value='' /></td>");
	sb.appendLine("</tr>");
	sb.appendLine("<tr>");
	sb.appendLine("<td> Hundity :</td>");
	sb.appendLine("<td><input type='text' id='hum' name='humvalue' value=''/></td>");
	sb.appendLine("</tr>");
	sb.appendLine("<tr>");
	sb.appendLine("<td><input type='submit' value='Calcuate' /></td>");
	sb.appendLine("</tr>");
	sb.appendLine("</table>");
	sb.appendLine("</form>");
	sb.appendLine("</body>");	
	sb.appendLine("</html>");
	
	sb.build(function(err,result){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(result);
		response.end('Hello');
	});
	
	
//	response.end('Hello I am Linkit 7688 Duo');


}


/*


var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
app.get('/',function(request, response){ 
    response.end('Hello'); 
});
server.listen(8080,'192.168.1.68',function(){
    console.log('HTTP Server work on http://127.0.0.1:8080/');
});


*/
