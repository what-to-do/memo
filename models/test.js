module.exports = function(sequelize, DataTypes){
//create a model of the table for sequelize
var Categories = sequelize.define('Categories', {
	//validate len will check if the title submitted will be between 6 and 15 letters
	category: {
		type: DataTypes.STRING
	},
	/*time: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
	},*/
	/*deadline: {
		type: DataTypes.DATE,

	},*/
	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: 0
	}

}, {
	timestamps: false
});
return Categories;
};




	