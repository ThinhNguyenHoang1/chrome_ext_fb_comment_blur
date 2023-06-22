// Select all comments presents on the page
(() => {
    // Revert the styles back to normal
    changedComments.forEach(ele => {
        const comment = getCommentDivFromId(ele['comment_id']);
        comment.style.cssText = ""
    });
    changedComments = []
})()

