/*Users is where all users and passwords will be stored.  This will be joined to 
snippets to retrieve all the snippets for the user*/

/*===================================USERS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var Users = sequelize.define('users', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	displayName: {
		type: DataTypes.STRING
		//validates the user entered an email and responds with an error message if not
	},
	facebook_id: {
		type: DataTypes.INTEGER
	}

}, {
	classMethods: {
		associate: function(models){
			Users.hasMany(models.Snippets, {
				foreignKey: 'user_id'
			});
		}
	}
},
	{
	timestamps: false
	}
);
return Users;
};

/*=================================END USERS TABLE MODEL=============================================*/