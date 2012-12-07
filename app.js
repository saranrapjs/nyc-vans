
var sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('commercial.db'),
	express = require('express'),
	stache = require('stache');



var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.register('.mustache', stache);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
	db.get("SELECT * FROM commercial ORDER BY RANDOM() LIMIT 1;",function(err,row) {
		renderRow(req,res,row);
	});
});

app.get('/i/:id', function(req, res){
	db.get("SELECT * FROM commercial WHERE DOT_NUMBER = '"+req.params.id+"' LIMIT 1;",function(err,row) {
		if (!row || err) {
			res.redirect('/');
		} else {
			renderRow(req,res,row);
		}
	});
});

function renderRow(req,res,row) {
	res.render('index', {
	    locals: {
	        name:row.LEGAL_NAME,
	        street:row.PHY_STREET,
	        city:row.PHY_CITY,
	        state:row.PHY_STATE,
	        zip:row.PHY_ZIP,
	        dot:row.DOT_NUMBER
	    }
	});
}

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
