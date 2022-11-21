
__path = process.cwd();
var favicon = require('serve-favicon');
const express = require('express'),
    secure = require('ssl-express-www')
const PORT = process.env.PORT || 8080;
const morgan = require('morgan')
var app = express();
app.use(secure)
app.use(morgan('dev'));
app.use(express.static('client'));
__path = process.cwd()

var downloader = require('./server/downloader.js');
var search = require('./server/search.js');
var creator = require('./server/creator.js');
var randomimg = require('./server/randomimage.js');
var main = require('./main');

app.use('/downloader', downloader)
app.use('/search', search)
app.use(favicon(__path +'/views/anu.ico'))
app.use('/randomimg', randomimg)
app.use('/creator', creator)
app.use('/', main)

app.set('json spaces', 2);
app.listen(PORT, () => {
    console.log(`Server Run on port ${PORT}`)
});