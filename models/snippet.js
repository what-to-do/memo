/* ==================================MODEL DETAILS=============================================
*userId: holds the primary key id from the Users table of the user that created the snippet.  
this will be used to pull all sippets by the user when they log in
*categoryId: holds the primary key of the Categories table category that was used when creating
the snippet.  This will be used when sorting the snippets by category.
*snippet: Holds the text entered in the snippet field
*importance: holds a number 1-5 selected by the user to show how important the snippet created is
*completed: a Boolean the user can check off if they want the snippet created to be a task checklist
ASSOCIATIONS:
*Snippets-->belongsTo-->Users: 
*Snippets-->belongsTo-->Categories: 

/*=================================SNIPPETS TABLE MODEL=============================================*/

module.exports = function(sequelize, DataTypes) {
    var Snippets = sequelize.define('Snippets', {
            //user_id joins users to snippets
            userId: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            //categoryId joins snippets to categories
            categoryId: {
                type: DataTypes.INTEGER,
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
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
        }, {
            classMethods: {
                associate: function(models) {
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