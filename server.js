const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");


const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "amylee614",
	database: "animal_crossing"

});

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());


// use this function within the get and post requests
// SQL
async function connectDB(){
	await con.connect(err => {if (err) throw err});
}
connectDB();

const collection = "animal_crossing.villagers";

// DON'T FORGET TO LOWERCASE EVERYTHING THANK YOU

// GET request for all personalities
async function getVillagerPersonalities(req, res){
	await con.query(`SELECT DISTINCT personality FROM ${collection} ORDER BY personality;`, function(err, result, fields){
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});
}
app.get("/personalities", getVillagerPersonalities);

// GET request for all species
async function getVillagerSpecies(req, res){
	await con.query(`SELECT DISTINCT species FROM ${collection} ORDER BY species;`, function(err, result, fields){
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});

}
app.get("/species", getVillagerSpecies);


// GET request for all colors (only 1)
async function getVillagerColors(req, res){
	await con.query(`SELECT DISTINCT color FROM ${collection} ORDER BY color;`, function(err, result, fields){
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});
}
app.get("/colors", getVillagerColors);


// GET request for all hobbies
async function getVillagerHobbies(req, res){
	await con.query(`SELECT DISTINCT hobbies FROM ${collection} ORDER BY hobbies;`, function(err, result, fields){
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});

}
app.get("/hobbies", getVillagerHobbies);


// GET request for all themes
async function getVillagerThemes(req, res){
	await con.query(`SELECT DISTINCT themes FROM ${collection} ORDER BY themes;`, function(err, result, fields){
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});
}
app.get("/themes", getVillagerThemes);


// GET request based on species
async function getVillagerBySpecies(req, res){
	const species = req.params.species;
	console.log(species);
	await con.query(`SELECT * FROM ${collection} WHERE species = "${species}"`, (err, result, fields) => { 
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});

}
app.get("/species/:species", getVillagerBySpecies);


// GET request based on hobby
async function getVillagerByHobby(req, res){
	const hobby = req.params.hobby;
	console.log(hobby);

	await con.query(`SELECT * FROM ${collection} WHERE hobbies = "${hobby}"`, (err, result, fields) => {
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});
}
app.get("/hobby/:hobby", getVillagerByHobby);


// GET request based on theme
async function getVillagerByTheme(req, res){
	const theme = req.params.theme;
	console.log(theme);

	await con.query(`SELECT * FROM ${collection} WHERE themes = "${theme}"`, (err, result, fields) => {
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});
}
app.get("/theme/:theme", getVillagerByTheme);


// GET request based on colors(query)
async function getVillagerByColor(req, res){
	const color = req.params.color;
	console.log(color);

	await con.query(`SELECT * FROM ${collection} WHERE color = "${color}"`, (err, result, fields) => {
		if (err) throw err;
		res.json(result);
		// console.log(result);
	});
}
app.get("/color/:color", getVillagerByColor);

//POST request that adds the new user's email if the user does not already exist
async function addUserEmail(req, res){

	let response = null;

	const email = req.body.email;
	console.log(email);

	// check to see if email is in database
	// 0 rows are returned, how do i check for that?

	await con.query(`SELECT * from animal_crossing.users where email = "${email}"`, (err, result, fields) => {
		if (err) throw err;
		// if there is nothing in the results array, then flag becomes true
		if (result.length === 0){
			const mysql = `INSERT INTO users (email) VALUES ("${email}")`;
			con.query(mysql, (err, result) => {
				if (err) throw err;
				response = result.affectedRows;
				console.log(`${email} has been added to the users.`);
			});		
		}
		// not sure what i should respond with if the email is already inside
		res.json(response);
	});
	

}
app.post("/newuser", jsonParser, addUserEmail);


// GET request based on name (if IN)


//send database and dump file (this is the file and this is how u dump it all)

// store access token
// google login gives profile object with id inside of it and store that
// store that in the table
// in user_villager 
// don't use material io



// POST request that takes the user's credientials to grab the user_id
// then also grabs the req, with the villager_id
// add it to user_villager table with the two sets of info
// async function addToUserList(req, res){
// 	const user = ;
// 	const villager = req.params.villager;

	
// }
// app.post("/userlist/:villager", addToUserList);


app.listen(3000, function(){
	console.log("listening on 3000")
});



