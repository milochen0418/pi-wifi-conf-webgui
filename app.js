var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	port = 3001,
	io = require('socket.io').listen(server);

server.listen(port);
console.log('listen port = ' + port);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
	socket.on('send message', function(data){
		console.log('receive message from socket.io client');
		io.sockets.emit('new message', { msg: data});
	});

	socket.on('disconnect', function(data){
		console.log('disconnect');
		io.sockets.emit('lose connection', {msg:data});
	});
});





/* funcitonal test */
function test_check() {
	var piWifi = require('pi-wifi');
	piWifi.check('myTestNetwork', function(err, result) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log(result);
	});
}


function test_connecTo() {
	var piWifi = require('pi-wifi');
	var networkDetails = {
	  ssid: 'MyNetwork',
	  username: 'demo',
	  password: 'swordfish'
	};

	//A simple connection
	piWifi.connectTo(networkDetails, function(err) {
	  if(!err) {
	    console.log('Network created successfully!');
	  } else {
	    console.log(err.message); //Failed to connect
	  }
	});

	//After creating a succesful connection, you could use the function check to verify
	var ssid = 'MyOpenNetwork';
	piWifi.connectTo({ssid: ssid}}, function(err) {
	  if (!err) { //Network created correctly
	    setTimeout(function () {
	      piwifi.check(ssid, function (err, status) {
	        if (!err && status.connected) {
	          console.log('Connected to the network ' + ssid + '!');
	        } else {
	          console.log('Unable to connect to the network ' + ssid + '!');
	        }
	      });
	    }, 2000);
	  } else {
	    console.log('Unable to create the network ' + ssid + '.');
	  }
	});
}


function test_connectToId() {
	var piWifi = require('pi-wifi');

	piWifi.connectToId(2, function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Successful connection!');
	});	
}


function test_connect() {
	var piWifi = require('pi-wifi');

	piWifi.connect('myTestNetwork', 'MyTestPassword', function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Successful connection!');
	});
}


function test_connectOpen(){
	var piWifi = require('pi-wifi');

	piWifi.connectOpen('myTestNetwork', function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Successful connection!');
	});
}


function test_connectEAP() {
	var piWifi = require('pi-wifi');

	piWifi.connectEAP('myTestNetwork', 'MyTestUsername', 'MyTestPassword', function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Successful connection!');
	});	
}

function test_disconnect() {
	var piWifi = require('pi-wifi');

	piWifi.disconnect(function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Disconnected from network!');
	});	
}

function test_detectSupplicant() {
	var piWifi = require('pi-wifi');

	piWifi.detectSupplicant(function(err, iface, configFile) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Supplicant running in interface', iface, 'using the configuration file', configFile);
	});
}


function test_interfaceDown(){
	var piWifi = require('pi-wifi');

	piWifi.interfaceDown('wlan0', function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Interface dropped succesfully!');
	});
}


function test_interfaceUp() {
	var piWifi = require('pi-wifi');

	piWifi.interfaceUp('wlan0', function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Interface raised succesfully!');
	});	
}

function test_killSupplicant() {
	var piWifi = require('pi-wifi');

	piWifi.killSupplicant('wlan0', function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Supplicant process terminated!');
	});	
}

function test_listInterfaces(){
	var piWifi = require('pi-wifi');

	piWifi.listInterfaces(function(err, interfacesArray) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log(interfacesArray);
	});
	// =>
	// ['wlan0', 'wlan1']	
}

function test_listNetworks() {
	var piWifi = require('pi-wifi');

	piWifi.listNetworks(function(err, networksArray) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log(networksArray);
	});

	// =>
	// [{ network_id: 0, ssid: 'MyNetwork', bssid: 'any', flags: '[DISABLED]' },
	// { network_id: 1, ssid: 'Skynet', bssid: 'any', flags: '[CURRENT]' }]
}


function test_restartInterface() {
	var piWifi = require('pi-wifi');

	piWifi.restartInterface('wlan0', function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Interface restarted succesfully!');
	});
}


function test_scan() {
	var piWifi = require('pi-wifi');

	piWifi.scan(function(err, networks) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log(networks);
	});

	// =>
	//[ 
	//  { bssid: 'aa:bb:cc:dd:ee:ff',
	//    frequency: 2462,
	//    signalLevel: -40,
	//    flags: '[WPA2-PSK-CCMP][WPS][ESS]',
	//    ssid: 'MyNetwork' },
	//  { bssid: '11:22:33:44:55:66',
	//    frequency: 2462,
	//    signalLevel: -28,
	//    flags: '[WPA2-PSK-CCMP][ESS]',
	//    ssid: 'AnotherNetwork' },
	//  { bssid: 'aa:11:bb:22:cc:33',
	//    frequency: 2462,
	//    signalLevel: -33,
	//    flags: '[WPA2-EAP-CCMP-preauth][WPS][ESS]',
	//    ssid: 'MyEnterpriseNetwork' },
	//  { bssid: 'c0:56:27:44:3b:9c',
	//    frequency: 2412,
	//    signalLevel: -59,
	//    flags: '[WPA-PSK-CCMP+TKIP][WPA2-PSK-CCMP+TKIP][ESS]',
	//    ssid: 'MyGuestsNetwork' 
	//  }
	//]	
}


function test_setCurrentInterface(){
	var piWifi = require('pi-wifi');
	piWifi.setCurrentInterface('wlan1');

	piWifi.status('wlan0', function(err, status) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log(status);
	});	
}



function test_startSupplicant() {
	var piWifi = require('pi-wifi');

	piWifi.startSupplicant({iface: 'wlan0', config: '/etc/wpa_supplicant/wpa_supplicant.conf', dns: '/etc/resolv.conf'}, function(err, networks) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log('Supplicant instance successfully started!');
	});
}


function test_status(){
	var piWifi = require('pi-wifi');

	piWifi.status('wlan0', function(err, status) {
	  if (err) {
	    return console.error(err.message);
	  }
	  console.log(status);
	});

	// =>
	//{
	//  bssid: '2c:f5:d3:02:ea:d9',
	//  frequency: 2412,
	//  mode: 'station',
	//  key_mgmt: 'wpa2-psk',
	//  ssid: 'MyNetwork',
	//  pairwise_cipher: 'CCMP',
	//  group_cipher: 'CCMP',
	//  p2p_device_address: 'aa:bb:cc:dd:ee:ff',
	//  wpa_state: 'COMPLETED',
	//  ip: '10.20.30.40',
	//  mac: 'a1:b2:c3:d4:e5:f6',
	//  uuid: 'e1cda789-8c88-53e8-ffff-31c304580c22',
	//  id: 0
	//}	
}



