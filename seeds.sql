/*Use for testing the sequelize models*/
USE `memo_db`
INSERT INTO `Users` (`display_name`, `facebook_id`, `createdAt`, `updatedAt`) VALUES ('Rick Dotchin', 1123, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), 
																					 ('Justin Bestman', 2154, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																					 ('Jessica Prado', 3521, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																					 ('Jeff "Party Boy" Searinger', 6666, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO `Categories` (`category`, `createdAt`, `updatedAt`) VALUES ('entertainment', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																	   ('sports', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																	   ('music', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																	   ('education', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO `Snippets` (`user_id`, `category_id`, `snippet`, `importance`, `completed`, `createdAt`, `updatedAt`) VALUES (1, 1, 'rick entertainment snippet 1', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (1, 1, 'rick entertainment snippet 2', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																														 (1, 2, 'rick sports snippet 1', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																														 (1, 2, 'rick sports snippet 2', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																														 (2, 1, 'Justin entertainment snippet 1', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (2, 1, 'Justin entertainment snippet 2', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																														 (2, 4, 'Justin education snippet 1', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (2, 4, 'Justin education snippet 2', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (3, 1, 'Jessica entertainment snippet 1', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (3, 1, 'Jessica entertainment snippet 2', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																														 (3, 4, 'Jessica education snippet 1', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (3, 4, 'Jessica education snippet 2', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (4, 1, 'Jeff entertainment snippet ', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (4, 2, 'Jeff sports snippet', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																														 (4, 3, 'Jeff music snippet', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
																													 	 (4, 4, 'Jeff education snippet', 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
																													 	 
