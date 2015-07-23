var mysql = require('mysql');

var theConnection = mysql.createConnection({
						host: "localhost",
						user: "root",
						password: "root",
						database: "nodejs"
					});

var contactId = null;

theConnection.query("insert into contacts SET ?",
	{firstname: "Bill", lastname: "Gates", phone: "23002300"},

     function(err, result){
     	if(err){
     		console.log(err);
     	}
     	console.log("Contact insert result: ", result);
     	contactId = result.insertId;
     });

var c = new Object();
c.firstname = "Steve";
c.lastname = "Jobs";
c.phone = "23002300";

theConnection.query("insert into contacts SET ?",
	[c],

    function(err, result){
     	if(err){
     		console.log(err);
     		process.exit(1);
     	}
     	console.log("Contact insert result: ", result);
     	contactId = result.insertId;
     	
		console.log("selecting contact with id: " + contactId);

		theConnection.query("select id, firstname as firstName, lastname as lastName, phone from contacts WHERE id = ?", 
			[contactId],
			function(err, result){
			if(err){
				console.log(err);
			}
			console.log(result);
			process.exit(0);
		});

     });

