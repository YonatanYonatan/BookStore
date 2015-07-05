/**
 * Created by Yonatan.Vainer on 6/23/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var books =
    [
        {
            "title": "boo",
            "author": "kremer",
            "year": "1995",
            "id": 1
        },
        {
            "title": "foo",
            "author": "george",
            "year": "1991",
            "id": 2
        },
        {
            "title": "doo",
            "author": "koko",
            "year": "1995",
            "id": 3
        },
        {
            "title": "hoo",
            "author": "jerry",
            "year": "1980",
            "id": 4
        }
    ]

app.use(express.static('public'));

app.use(bodyParser());

app.get('/books', function(req, res){
    console.log('where are my books?');
    res.send(books);
});

app.post('/', function (req, res) {

    var opp = req.body.opp;

    if (opp == "insert"){
        var title = req.body.data.title;
        var author = req.body.data.author;
        var year = req.body.data.year;

        var book = {title: title, author: author, year: year};

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
                    books[i].author = req.body.data.author();
                }

                break;
            }
        }
    }



});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening at http://%s:%s', host, port);

});