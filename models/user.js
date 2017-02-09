/*Users is where all users and passwords will be stored.  This will be joined to 
snippets to retrieve all the snippets for the user*/

/*===================================USERS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var Users = sequelize.define('Users', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	email: {
		type: DataTypes.STRING,
		//validates the user entered an email and responds with an error message if not
		validate: {
			isEmail: {
				args: true,
				msg: "Please enter your email address"}
			}
	},
	password: {
		type: DataTypes.STRING
	}

}, {
	timestamps: false
	}
);
return Users;
};

/*=================================END USERS TABLE MODEL=============================================*/