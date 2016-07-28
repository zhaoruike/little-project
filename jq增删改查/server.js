/**
 * Created by Administrator on 2016/7/19 0019.
 */
var http = require('http')
var fs = require('fs')
var url = require('url')
var mime = require('mime')
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true)
    var pathname = urlObj.pathname
    var query = urlObj.query;
    if (pathname == '/') {
        fs.createReadStream('./index.html').pipe(res)
    } else if (pathname == '/get') {
        res.setHeader('content-type', 'application/json;charset=utf8')
        fs.createReadStream('./data/data.json').pipe(res)
    } else if (pathname == '/update') {
        var add=''
        req.on('data', function (data) {
            add += data;
        })
        req.on('end', function () {
            var obj = fs.readFileSync('./data/data.json', 'utf8')
            obj = JSON.parse(obj)
            add = JSON.parse(add);
           obj[add.id].name=add.name
            obj[add.id].type=add.type
            obj[add.id].price=add.price
            console.log(obj[add.id])
            fs.writeFileSync('./data/data.json', JSON.stringify(obj));
        })
    }
    else if (pathname == '/add') {
        var add = "";
        req.on('data', function (data) {
            add += data;
        })
        req.on('end', function () {
            var obj = fs.readFileSync('./data/data.json', 'utf8')
            obj = JSON.parse(obj)
            add = JSON.parse(add)
            obj.push(add);
            fs.writeFileSync('./data/data.json', JSON.stringify(obj));
        })
        //req.pipe(fs.createWriteStream('./data/data.json',{flags:'a'}))
    } else if (pathname == '/delete') {
        var id = query.id
        var obj = fs.readFileSync('./data/data.json', 'utf8')
        obj = JSON.parse(obj)
        obj.splice(id, 1)
        fs.writeFileSync('./data/data.json', JSON.stringify(obj))
        res.end("")
    }

     else {
        if (fs.existsSync('.' + pathname)) {
            res.setHeader('content-type', mime.lookup(pathname) + ';charset=utf8')
            fs.createReadStream("." + pathname).pipe(res)
        } else {
            res.statusCode = 404;
            res.end()
        }
    }
}).listen('2888', function () {
    console.log('success')
})

