const express = require('express');
const path = require('path');
const open = require('open');

const chrome = require('chromedriver');
const {Builder} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');
let options_r = new Options();
let options_l = new Options();
let options_m = new Options();

//makes sure CORS works
var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  next();
}

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()) 
app.use(allowCrossDomain);

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  var url = host + ":" + port
  var driver_l = new Builder().setChromeOptions(options_l).forBrowser('chrome').build();

  driver_l.get("http://127.0.0.1:8080/video_l");
  options_l.addArguments("--kiosk")
  options_l.excludeSwitches('--enable-automation')	
  options_l.addArguments("--window-position=1080,0");
  options_l.addArguments("--window-size=1920,1080");

  var driver_m = new Builder().setChromeOptions(options_m).forBrowser('chrome').build();
  driver_m.get("http://127.0.0.1:8080/video_m");
  options_m.addArguments("--kiosk")
  options_m.excludeSwitches('--enable-automation')
  options_m.addArguments("--window-position=3000,0");
  options_m.addArguments("--window-size=1920,1080");

  var driver_r = new Builder().setChromeOptions(options_r).forBrowser('chrome').build();
  driver_r.get("http://127.0.0.1:8080/video_r");
  options_r.addArguments("--kiosk")
  options_r.excludeSwitches('--enable-automation')
  options_r.addArguments("--window-position=4920,0");
  options_r.addArguments("--window-size=1920,1080");

})



var io = require('socket.io')(server);
io.sockets.on('connection',
 function (socket) {
    console.log("Client has connected: " + socket.id);
    socket.on('user',
     async function(data) {
        console.log("Received:" +  data.sVideoR, data.sVideoL, data.sVideoM);
        //socket.broadcast.emit('user', data);
        io.sockets.emit('user', data);
      }
    );
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.route('/video_r').get(function(req,res){
    res.sendFile(path.join(__dirname, '/public/video_r.html'));
    
});

app.route('/video_l').get(function(req,res){
    res.sendFile(path.join(__dirname, '/public/video_l.html'));
    
});

app.route('/video_m').get(function(req,res){
    res.sendFile(path.join(__dirname, '/public/video_m.html')); 
});


app.get('/video', function(req, res) {
    var videoPath = path.join(__dirname, 'assets', res.url);
    const stat = fs.statSync(videoPath)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream( videoPath, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream( videoPath).pipe(res)
    }
  });
