/*Users is where all users and passwords will be stored.  This will be joined to 
snippets to retrieve all the snippets for the user*/

/*===================================USERS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var Users = sequelize.define('Users', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	display_name: {
		type: DataTypes.STRING
	},
	//facbook id# provided from passport
	facebook_id: {
		type: DataTypes.INTEGER
	}

}, {
	class_methods: {
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