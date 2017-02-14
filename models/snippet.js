/*Model for the table holding all snippets including their time created, importance, deadline and 
completed.  This will be joined to the category table to order all the snippets by category*/


/*=================================SNIPPETS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
var Snippets = sequelize.define('Snippets', {
	//user_id joins users to snippets
	user_id: {
		type: DataTypes.INTEGER,
		//allowNull: false
	},
	//category_id joins snippets to categories
	category_id: {
		type: DataTypes.INTEGER,
		//allowNull: false
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
					foreignKey: 'user_id'
				});
				Snippets.belongsTo(models.Categories, {
					foreignKey: 'category_id'
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