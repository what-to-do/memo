/*model for all the categories created by users.  We will be able to reduce the amount of data
used by multiple users sharing categories if they enter the same category*/

/*=================================CATEGORIES TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
var Categories = sequelize.define('Categories', {
	category: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [1, 20]
		}
	},
	userCategoryId: {
		type: DataTypes.INTEGER
	}

}, {
	class_methods: {
		associate: function(models){
			Categories.hasMany(models.Snippets,{
				foreignKey: 'categoryId'
			});
			Categories.belongsTo(models.Users, {
				foreignKey: 'userCategoryId'
			});
		}
	}
},

{
	timestamps: false
});
return Categories;
};

/*===============================END CATEGORIES TABLE MODEL===========================================*/




	