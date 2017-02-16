/*Model for the table holding all snippets including their time created, importance, deadline and 
completed.  This will be joined to the category table to order all the snippets by category*/


/*=================================SNIPPETS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
var Snippets = sequelize.define('Snippets', {
	//user_id joins users to snippets
	userId: {
		type: DataTypes.INTEGER,

	

		defaultValue: 1


	},
	//categoryId joins snippets to categories
	categoryId: {
		type: DataTypes.INTEGER,

		//allowNull: false

		defaultValue: 3/*,
		allowNull: false*/

	},
	//the users snippet text 
	snippet: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	//the importance from 1-5
	importance: {
		type: DataTypes.INTEGER,
		allowNull: false,
		//validate the importance level is between 1-5
		validate: {
			len: [1, 5]
		}
	},
	/*to
	deadline: {
		type: DataTypes.DATEONLY,
		allowNull: true
	},*/
	//user_id joins the two tables together
	//if task is completed
	completed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: 0
	},
}, {
	classMethods: {
			associate: function(models){
				Snippets.belongsTo(models.Users, {
					foreignKey: 'userId'
				});
				Snippets.belongsTo(models.Categories, {
					foreignKey: 'categoryId'
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