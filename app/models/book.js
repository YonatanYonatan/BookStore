/**
 * Created by Yonatan.Vainer on 7/9/2015.
 */
var mongoose        = require('mongoose');

// our book model definition

module.exports = mongoose.model('Book',
    {
        title: {type: String, default: "a book"},
        author: {type: String, default: "kremer"},
        year: {type: Number, default: 2000},
        link: {type: String, default: ""},
        cover: {type: String, default: ""}

    }
);