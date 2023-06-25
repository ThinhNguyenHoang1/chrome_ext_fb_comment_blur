// Select all comments presents on the page
(() => {
    // Revert the styles back to normal
    changedComments.forEach(ele => {
        let comments = getCommentDivFromIdAndRepId(ele['comment_id'], ele['rep_comment_id']);
        comments.forEach(comment => comment.style.cssText = "")
    });
    changedComments = []
})()

