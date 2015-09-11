'use strict';

var express = require('express');
var posts = require('./mock/posts.json');

// iterating through object with .map method returning array of objects
var postsList = Object.keys(posts).map(function(value){
                                    return posts[value]});


var app = express();

app.set('port', (process.env.PORT || 5000));

// mount URL to static server
// add static server middleware as second parameter: path static files in folder 'public'
    // setting route relative from running app to public folder using __dirname
app.use('/static', express.static(__dirname + '/public'));

// views is directory for all template files
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// register route to root of site with 'get'
    // locationparameter + callback function with 2 parameters: request/response
    //render index.jade template
app.get('/', function(request, response) {
    var path = request.path;
    response.render('pages/index', {path: path});
});

// calling blog posts - and blog main page if title is undefined
app.get('/blog/:title?', function(req, res){
    var title = req.params.title;
    if (title === undefined){
        res.status(503);
        res.render('pages/blog', {posts: postsList});
    } else {
    var post = posts[title] || {};
    res.render('pages/post', {post: post});
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


