// Select all comments presents on the page
(() => {
    // Revert the styles back to normal
    changedComments.forEach(ele => {
        let comment = getCommentDivFromIdAndRepId(ele['comment_id'], ele['rep_comment_id']);
        comment.style.cssText = ""
    });
    changedComments = []
})()

