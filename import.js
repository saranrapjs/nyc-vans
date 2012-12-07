var csv = require('csv'),
	sqlite3 = require('sqlite3').verbose(),
	db = new sqlite3.Database('commercial.db'),
	fs = require('fs');
var columns = 
["DOT_NUMBER",
"LEGAL_NAME",
"DBA_NAME",
"CARRIER_OPERATION",
"HM_FLAG",
"PC_FLAG",
"PHY_STREET",
"PHY_CITY",
"PHY_STATE",
"PHY_ZIP",
"PHY_COUNTRY",
"MAILING_STREET",
"MAILING_CITY",
"MAILING_STATE",
"MAILING_ZIP",
"MAILING_COUNTRY",
"TELEPHONE",
"FAX",
"EMAIL_ADDRESS",
"MCS150_DATE",
"MCS150_MILEAGE",
"MCS150_MILEAGE_YEAR",
"ADD_DATE",
"OIC_STATE",
"NBR_POWER_UNIT",
"DRIVER_TOTAL"];

var zips = {"11201":true,"11203":true,"11204":true,"11205":true,"11206":true,"11207":true,"11208":true,"11209":true,"11210":true,"11211":true,"11212":true,"11213":true,"11214":true,"11215":true,"11216":true,"11217":true,"11218":true,"11219":true,"11220":true,"11221":true,"11222":true,"11223":true,"11224":true,"11225":true,"11226":true,"11228":true,"11229":true,"11230":true,"11231":true,"11232":true,"11233":true,"11234":true,"11235":true,"11236":true,"11237":true,"11238":true,"11239":true,"11242":true,"11249":true,"10001":true,"10002":true,"10003":true,"10004":true,"10005":true,"10006":true,"10007":true,"10009":true,"10010":true,"10011":true,"10012":true,"10013":true,"10014":true,"10016":true,"10017":true,"10018":true,"10019":true,"10020":true,"10021":true,"10022":true,"10023":true,"10024":true,"10025":true,"10026":true,"10027":true,"10028":true,"10029":true,"10030":true,"10031":true,"10032":true,"10033":true,"10034":true,"10035":true,"10036":true,"10037":true,"10038":true,"10039":true,"10040":true,"10041":true,"10044":true,"10048":true,"10069":true,"10103":true,"10111":true,"10112":true,"10115":true,"10119":true,"10128":true,"10152":true,"10153":true,"10154":true,"10162":true,"10165":true,"10167":true,"10169":true,"10170":true,"10171":true,"10172":true,"10173":true,"10177":true,"10271":true,"10278":true,"10279":true,"10280":true,"10282":true,"10043":true,"10045":true,"10065":true,"10075":true,"10080":true,"10105":true,"10106":true,"10107":true,"10110":true,"10116":true,"10120":true,"10123":true,"10155":true,"10156":true,"10158":true,"10159":true,"10163":true,"10168":true,"10174":true,"10175":true,"10176":true,"10199":true,"10265":true,"10270":true,"10311":true,"10550":true,"10704":true,"10705":true,"10803":true,"11001":true,"11003":true,"11005":true,"11020":true,"11021":true,"11040":true,"11042":true,"11096":true,"11109":true,"11243":true,"11252":true,"11359":true,"11381":true,"11405":true,"11425":true,"11439":true,"11451":true,"11559":true,"11580":true,"11581":true,"11004":true,"11101":true,"11102":true,"11103":true,"11104":true,"11105":true,"11106":true,"11354":true,"11355":true,"11356":true,"11357":true,"11358":true,"11360":true,"11361":true,"11362":true,"11363":true,"11364":true,"11365":true,"11366":true,"11367":true,"11368":true,"11369":true,"11371":true,"11372":true,"11373":true,"11374":true,"11375":true,"11377":true,"11378":true,"11379":true,"11385":true,"11411":true,"11412":true,"11413":true,"11414":true,"11415":true,"11416":true,"11417":true,"11418":true,"11419":true,"11420":true,"11421":true,"11422":true,"11423":true,"11426":true,"11427":true,"11428":true,"11429":true,"11430":true,"11432":true,"11433":true,"11434":true,"11435":true,"11436":true,"11691":true,"11692":true,"11693":true,"11694":true,"11697":true,"10301":true,"10302":true,"10303":true,"10304":true,"10305":true,"10306":true,"10307":true,"10308":true,"10309":true,"10310":true,"10312":true,"10313":true,"10314":true,"10451":true,"10452":true,"10453":true,"10454":true,"10455":true,"10456":true,"10457":true,"10458":true,"10459":true,"10460":true,"10461":true,"10462":true,"10463":true,"10464":true,"10465":true,"10466":true,"10467":true,"10468":true,"10469":true,"10470":true,"10471":true,"10472":true,"10473":true,"10474":true,"10475":true,"11370":true};

db.serialize(function() {
	db.run("DROP TABLE commercial");
	var texts = [];
	columns.forEach(function(v,i) {
		texts.push(v+" TEXT");
	});
	db.run("CREATE TABLE commercial ("+texts.join(', ')+")");

	var stmt = db.prepare("INSERT INTO commercial VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

	var count = 0;
	csv()
	.from.stream(fs.createReadStream(__dirname+'/2012Nov_Census.txt'))
	.on('record', function(data,index){
		if (zips[ data[9] ] === true ) {
			stmt.run( data );
			count++;
			console.log(count);
		}
	})
	.on('end', function(count){
		//stmt.finalize();
		console.log('done!');
	})
	.on('error', function(error){
	  console.log(error.message);
	});

	// keys.forEach(function(v,i) {
	// 	var t = new track();
	// 	t.import(tracks[ keys[i] ]);
	// 	stmt.run( t.export() );
	// });
	// stmt.finalize();

	// var count = 0;
	// var get = db.each("SELECT * FROM library",function(err,row) {
	// 	count++;
	// });
});

