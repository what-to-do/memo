/*Model for the table holding all snippets including their time created, importance, deadline and 
completed.  This will be joined to the category table to order all the snippets by category*/


/*=================================SNIPPETS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var Snippets = sequelize.define('Snippets', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	snippet: {
		type: DataTypes.TEXT
	},
	importance: {
		type: DataTypes.INTEGER,
		//validate the importance level is between 1-5
		validate: {
			len: [1, 5]
		}
	},
	/*time: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
	},
	deadline: {
		type: DataTypes.DATE,
		allowNull: true
	},*/
	user_id: {
		type: DataTypes.INTEGER
	},
	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: 0
	}

}, {
	classMethods: {
			associate: function(models){
				/*Snippets.belongsTo(models.Users, {
					foreignKey: 'user_id'
				});*/
				Snippets.hasMany(models.Categories, {
					onDelete: 'cascade',
				});
			}
		}
	},

	{
	/*!!!!!!once we are finished with testing we will remove this and time because we can use createdAt*/
	timestamps: false
});
return Snippets;
};

/*=================================END SNIPPETS TABLE MODEL=============================================*/