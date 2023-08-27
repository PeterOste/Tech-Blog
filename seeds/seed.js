const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
    // Sync the database tables, dropping existing data
     await sequelize.sync({ force: true });

    // Create users and return the created user objects
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Create posts using postData and associate them with users
    const posts = await Post.bulkCreate(postData);

    // Loop through posts to associate comments with them
    for (const post of posts) {
        // Get a random user index
        const randomUserIndex = Math.floor(Math.random() * users.length);

        // Filter commentData to get comments for the current post
        const postComments = commentData.filter(comment => comment.post_id === post.id);

        // Create comments and associate them with users
        const createdComments = await Comment.bulkCreate(postComments.map(comment => ({
            ...comment,
            user_id: users[randomUserIndex].id,
        })));


        // Set the created comments for the current post
        await post.setComments(createdComments);    
    }

    console.log('Database seeded successfully!');
    process.exit(0);
};

// Call the seed function to start populating the database
seedDatabase();