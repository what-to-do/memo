/*Users is where all users and passwords will be stored.  This will be joined to 
snippets to retrieve all the snippets for the user*/

/*===================================USERS TABLE MODEL=============================================*/

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var User = sequelize.define('Users', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	display_name: {
		type: DataTypes.STRING/*,
		allowNull: false*/
	},
	//facbook id# provided from passport
	facebook_id: {
		type: DataTypes.BIGINT/*,
		allowNull: false*/
	},
	//username
	username: {
		type: DataTypes.STRING,
		validate: {isEmail: true}
	},
	//password
	password: {
		type: DataTypes.STRING
	}
}, {
	class_methods: {
		associate: function(models){
			User.hasMany(models.Snippets, {
				foreignKey: 'user_id'
			});
		}
	},
	instanceMethods: {
		generateHash: function(password) {
			return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		},
		validPassword: function(password) {
			return bcrypt.compareSync(password, this.password);
		},
	}
},
	{
	timestamps: false
	}
);
return User;
};

/*=================================END USERS TABLE MODEL=============================================*/