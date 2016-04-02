var http = require('http');
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

var hostIP = '107.170.193.27';
var portAdd = 4567;
var document = {};

setInterval(function(){
  var checks;

    var options = {
      host: hostIP,
      port: portAdd,
      path: '/clients'
    };

    var req = http.request(options, function(res) {
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        var jsonChunk = JSON.parse(chunk, function(k, v) {

          if(k == "name"){
            if(v != 'test' ){
              getChecks(v);
            }
          }
          return v;       // return the unchanged property value.
        });
      });
    });
    req.end();
}, 100*1000);

function getChecks(client){
  var options = {
    host: hostIP,
    port: portAdd,
    path: '/results/'+client
  };

  var req = http.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data', function(chunk){
      var jsonChunk = JSON.parse(chunk, function(checkName,checkValue){
        if(checkName == 'client') document.client = checkValue;
        if(checkName == 'name') document.name = checkValue;
        if(checkName == 'output'){
          var arr = checkValue.split("fin");
          var arr2 = arr[1];
          document.value = arr2;
          if(document.name == 'keepalive' || document.name == 'disk') document = {};
        }
        if(checkName == 'status' && document != {} && document.client != undefined){
          var docEntry = {client: document.client, value:document.value, time:new Date().toString()};
          var p1 = new Promise(
            function(resolve, reject) {
              resolve(storeResults(docEntry, document.name));
            }
          );
          p1.then(function(){console.log('ran')});
        }

      });
    });
  });
  req.end();
}

function storeResults(docEntry, collectionName){
    MongoClient.connect('mongodb://127.0.0.1:27017/thesis', function(err, db) {
      if (err) throw err;
      console.log("Connected to Database");
      db.collection(collectionName.toString()).insert(docEntry, function(err, records) {
        if (err) throw err;
        document = {};
          MongoClient.close();
          return;
      });
    });
}
