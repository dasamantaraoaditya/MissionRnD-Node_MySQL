// This tutorial will walk you through how to use mysql in a node.js application.

// First, include mysql module.

var mysql = require('mysql');

// Next, open a connection to the mysql database.
// Ensure you've create nodejs db and contacts table as described in the project pages.

var theConnection = mysql.createConnection({
						host: "localhost",
						user: "root",
						password: "root",
						database: "nodejs"
					});

var contactId = null;

// Execute an insert statement. In the callback, print out the mysql result object.
// Do you know how to find the insertedId of a row from the result object?
theConnection.query("insert into contacts SET ?",
	{firstname: "Bill", lastname: "Gates", phone: "23002300"},

     function(err, result){
     	if(err){
     		console.log(err);
     	}
     	console.log("Contact insert result: ", result);
     	contactId = result.insertId;
     });

// This is another way of passing an object to be inserted. For this to work, the object's property names
// should match the table's field names.
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

		// Read back the row just inserted. Note that this select statement has to be executed in the callback. Otherwise,
		// it can run before the insert completed and will fail due to the async nature of node.js
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

