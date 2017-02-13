/*model for all the categories created by users.  We will be able to reduce the mount of data
used by multiple users sharing categories if they enter the same category*/

/*=================================CATEGORIES TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var Categories = sequelize.define('Categories', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	category: {
		type: DataTypes.STRING
	}

}, {
	classMethods: {
		associate: function(models){
			Categories.hasMany(models.Snippets,{
				foreignKey: 'category_id'
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




	