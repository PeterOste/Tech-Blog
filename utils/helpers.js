module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    generateCommentId: (post_id, user_id, timestamp) => {
        // Generate a unique comment ID based on post ID, user ID, and timestamp
        return `${post_id}_${user_id}_${timestamp}`;
    },
};