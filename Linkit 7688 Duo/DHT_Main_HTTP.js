//================Global variable================================
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyS0",{
	baudrate: 57600
});

var http = require('http');
var qs = require("querystring");

var post_option = {
	host:'192.168.1.118',
	port:'32780',
	path:'/POST/TEST',
	method:'POST'
}

var json_post_data = {
	hum:'',
	temp:''
}

function OpenCOM()
{
	console.log("Open MT7688 COM");
}


//================Service================================
function ReceiveData(data)
{
	var i;
	var length = 4;
	var checkSum = 0;
	var data_string;
	
/*	
	for(i=0;i<length;i++){
		console.log(data[i]);			
	}
*/	
	checkSum = CheckSum(length, data);
	
	if(checkSum == data[3])
	{
		//console.log("CheckSum Pass");			
		json_post_data.hum = data[1];
		json_post_data.temp = data[2];
		
		var req = http.request(post_option, callback);
		//req.write('Humidity:' + humidity + ' Temperature' + temperature);
		data_string = JSON.stringify(json_post_data);
		req.write(data_string);
		req.end();
	}
	else
	{
		console.log("CheckSum Error");
	}
}

function CheckSum(length, data)
{
	var i,ChkSUM=0;
	for(i=0;i<(length-1);i++){
		ChkSUM = ChkSUM + data[i];	
	}	
	ChkSUM = (0xFF - ChkSUM) + 1;
	return ChkSUM;
}

function MQTT_Publish_Data(data)
{
	count++;
	//client.publish('DHT', 'Humidity:' + data[1] + 'Temperature:' + data[2] + 'count:' + count);
	client.publish('DHT', '' + data[1]+ '' + data[2]);	
}

//================HTTP Service================================
callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

//================Main========================================
serialPort.on("open",OpenCOM);
serialPort.on("data",ReceiveData);
