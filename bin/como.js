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
            "id": 1,
            "link": "http://thrivesearch.com/wp-content/uploads/2014/08/books-clipart.png"
        },
        {
            "title": "foo",
            "author": "george",
            "year": "1991",
            "id": 2,
            "link": "http://thrivesearch.com/wp-content/uploads/2014/08/books-clipart.png"
        },
        {
            "title": "doo",
            "author": "koko",
            "year": "1995",
            "id": 3,
            "link": "http://thrivesearch.com/wp-content/uploads/2014/08/books-clipart.png"
        },
        {
            "title": "hoo",
            "author": "jerry",
            "year": "1980",
            "id": 4,
            "link": "http://thrivesearch.com/wp-content/uploads/2014/08/books-clipart.png"
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
        var link = req.body.data.link;

        var book = {title: title, author: author, year: year, link: link};

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