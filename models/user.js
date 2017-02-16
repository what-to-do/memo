/*Users is where all users and passwords will be stored.  This will be joined to 
snippets to retrieve all the snippets for the user*/

/*===================================USERS TABLE MODEL=============================================*/

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var Users = sequelize.define('Users', {
	name: {
		type: DataTypes.STRING
	},

	oauthId: {
		type: DataTypes.STRING
	},
	
}, {
	class_methods: {
		associate: function(models){
			User.hasMany(models.Snippets, {
				foreignKey: 'id'
			});
		}
	}/*,

	instanceMethods: {
		generateHash: function(password) {
			return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		},
		validPassword: function(password) {
			return bcrypt.compareSync(password, this.password);
		},
	}*/
},
	{
	timestamps: false
	}
);
return Users;
};

/*=================================END USERS TABLE MODEL=============================================*/