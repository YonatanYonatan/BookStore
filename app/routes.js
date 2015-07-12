/**
 * Created by Yonatan.Vainer on 7/9/2015.
 */
var Book            = require('./models/book');
var fs              = require('fs-extra');

module.exports = function(app){

    // ===  server routes

    // lets use CRUD = create, retrieve, update & delete

    // Retrieve
    app.get('/api/books', function(req, res) {

        console.log('get books');

        Book.find({},function(err, books){

            if(err){
                res.send(err);
            }

            res.json(books);
        });
    });

    // Create

    app.post('/api/books', function(req, res) {

        console.log('insert book');

        var book = new Book(
            {
                title: req.body.title,
                author: req.body.author,
                year: req.body.year,
                link: req.body.link,
                cover: req.body.cover
            }
        );
        book.save(function(err, book){
            if(err){
                res.send(err);
            }
            res.sendStatus(200);
        })
    });

    // Update

    app.put('/api/books/', function(req, res){

        console.log('edit book');
        Book.findByIdAndUpdate( req.body.id, req.body ,function(err, book){
            if(err){
                console.log(err);
                res.send(err);
            }
            res.sendStatus(200);
        });

    });

    // Delete

    app.delete('/api/books/:id', function(req, res) {

        console.log('delete book');

        Book.findByIdAndRemove(req.params.id, function(err, book){
            if(err){
                console.log(err);
                res.send(err);
            }
            res.sendStatus(200);
        });
    });

    // image route

    app.post('/api/images', function(req, res, next){

        console.log('got image to upload');
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

    app.get('/api/images/:name', function(req, res){

        res.sendfile('./public/images/'+req.params.name);

    })

    // === frontend routes

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};