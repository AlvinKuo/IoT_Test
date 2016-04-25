//================Global variable================================
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyS0",{
	baudrate: 57600
});

var temperature = 0;
var humidity = 0;

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://192.168.1.118:32779');
var count = 0;


function OpenCOM()
{
	console.log("Open MT7688 COM");
}


//================MQTT Service================================
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
		MQTT_Publish_Data(data)		
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

//================Main========================================
serialPort.on("open",OpenCOM);
serialPort.on("data",ReceiveData);
