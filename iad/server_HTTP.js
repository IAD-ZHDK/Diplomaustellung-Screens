const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
var student = {
    sVideoR: "test.mp4",
    sVideoL: "test.mp4",
    sVideoM: "test.mp4"
};

const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        req.on('data', function(data) {
            student = data.toString();
            return student;
        })
    }

    if(req.url == "/"){   
        fs.readFile("./templates/index.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });

    } else if (req.url == "/video_m") {
        fs.readFile("./templates/video_m.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html)
        });
    
    } else if (req.url == "/video_r") {
        fs.readFile("./templates/video_r.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html)
        });
    
    } else if (req.url == "/video_l") {
        fs.readFile("./templates/video_l.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html)
        });


    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, 'templates', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    }else if(req.url.match("\.png$")){
        var imagePath = path.join(__dirname, 'assets', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);

    }else if(req.url.match("\.mp4$")){
        console.log( student.sVideo)
        var videoPath = path.join(__dirname, 'assets', student.sVideo);
        var stat = fs.statSync(videoPath);
        var total = stat.size;
        if (req.headers['range']) {
          var range = req.headers.range;
          var parts = range.replace(/bytes=/, "").split("-");
          var partialstart = parts[0];
          var partialend = parts[1];
          var start = parseInt(partialstart, 10);
          var end = partialend ? parseInt(partialend, 10) : total-1;
          var chunksize = (end-start)+1;
          //console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);
          var file = fs.createReadStream(videoPath, {start: start, end: end});
          res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
          file.pipe(res);
        } else {
         // console.log('ALL: ' + total);
          res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
          fs.createReadStream(videoPath).pipe(res);
        }
       
    }else if(req.url.match("\.js$")){
        var jsPath = path.join(__dirname, 'templates', req.url);
        var fileStream = fs.createReadStream(jsPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fileStream.pipe(res);

    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

