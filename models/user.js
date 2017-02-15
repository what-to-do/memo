/*Users is where all users and passwords will be stored.  This will be joined to 
snippets to retrieve all the snippets for the user*/

/*===================================USERS TABLE MODEL=============================================*/

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var User = sequelize.define('Users', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	// facebook provided display name in profile
	display_name: {
		type: DataTypes.STRING/*,
		allowNull: false*/
	},
	//facbook id# provided from passport
	// modified to allow for fb integers which are
	// outside of INTEGER allowed values
	facebook_id: {
		type: DataTypes.BIGINT/*,
		allowNull: false*/
	},
	//username - supposed to be email entered at /login
	username: {
		type: DataTypes.STRING,
		validate: {isEmail: true}
	},
	//password entered from /login
	password: {
		type: DataTypes.STRING
	},
	// created only for comparison of stored hash with newly hashed pw
	salt: {
		type: DataTypes.STRING
	}
}, {
	class_methods: {
		associate: function(models){
			User.hasMany(models.Snippets, {
				foreignKey: 'user_id'
			});
		}
	}, // created for hashing and validating the passwords
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