/**
 * Created by chris on 10/22/14.
 */
var express = require("express"),
    app = express(),
    swift = require('../index'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 3000;


mongoose.connect('mongodb://localhost/swiftTest');
swift.load(app,  __dirname + '/app');

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(port);