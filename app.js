/**
 * Created by Yonatan.Vainer on 6/23/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var busboy =  require('connect-busboy');
var fs = require('fs-extra');

var app = express();

var books =
    [
        
        {
            "title": "boo",
            "author": "kremer",
            "year": "1995",
            "id": 1,
            "link": "",
            "cover": "images/Folder.jpg"
        },
        {
            "title": "foo",
            "author": "george",
            "year": "1991",
            "id": 2,
            "link": "",
            "cover": "images/Folder.jpg"
        },
        {
            "title": "doo",
            "author": "koko",
            "year": "1995",
            "id": 3,
            "link": "",
            "cover": "images/Folder.jpg"
        },
        {
            "title": "hoo",
            "author": "jerry",
            "year": "1980",
            "id": 4,
            "link": "",
            "cover": "images/Folder.jpg"
        }
        
    ];

app.use(express.static('public'));
app.use(bodyParser());
app.use(busboy({immediate: true}));


/**
 * Oron: put all routes on different file, see example: https://github.com/oronbz/mean-starter-kit
 */


/**
 * Oron: save to an external folder (like 'upload') and add to .gitignore
 */
app.post('/images', function(req, res, next){

    var fstream;

    req.busboy.on('file', function(fieldname, file, filename){

        fstream = fs.createWriteStream('./public/images/'+filename);
        file.pipe(fstream);
        fstream.on('close', function(){
            console.log('upload finished for '+filename);
        });

    });

    req.busboy.on('finish', function(){
        next();
    });

    }, function(req, res){

    res.sendStatus(200);

});


app.get('/books', function(req, res){
    res.send(books);
});
 
/**
 * Oron: add function per HTTP method (DELETE, PUT(edit))
 * also add id to urls when possible
 */
app.post('/', function (req, res) {

    var opp = req.body.opp;

    if (opp == "insert"){
        var title = req.body.data.title;
        var author = req.body.data.author;
        var year = req.body.data.year;
        var link = req.body.data.link;
        var cover = "";

        if (req.body.data.cover != ""){
            cover = "http://localhost:3000/images/"+req.body.data.cover
        }

        var book = {title: title, author: author, year: year, link: link, cover: cover};

        var max_id = -1;

        for (var i=0; i<books.length; i++){
            if (books[i].id > max_id){
                max_id = books[i].id;
            }
        }

        book.id = max_id + 1;

        books.push(book);
    }

    else if (opp == "delete"){
        var id = req.body.data.id;

        for (var i=0; i<books.length; i++){
            if (books[i].id == id){
                books.splice(i,1);
                break;
            }
        }
    }

    else if (opp == "edit"){

        var id = req.body.data.id;

        for (var i=0; i<books.length; i++){
            if (books[i].id == id){

                if (req.body.data.title != ""){
                    books[i].title = req.body.data.title;
                }
                if (req.body.data.year != ""){
                    books[i].year = req.body.data.year;
                }
                if (req.body.data.author != ""){
                    books[i].author = req.body.data.author;
                }
                if (req.body.data.link != ""){
                    books[i].link = req.body.data.link;
                }


                break;
            }
        }
    }

    res.sendStatus(200);

});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening at http://%s:%s', host, port);

});