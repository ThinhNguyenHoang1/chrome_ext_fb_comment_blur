(() => {
    // ==================== Test Code =============================
    // const allComments = Array.from(document.querySelectorAll(`[class="${CLASS_NAMES.FB_COMMENT_DIV}"]`));
    // ==================== END TEST CODE =========================
    const data = buildCommentIdx();
    console.log("COMMENT DATA:", data)
    // TODO: Send the data to the ML model to check if the comments are offensive


    // TODO: Set the changedComments variable to allow redos based on the response
    changedComments = []
    
    // TODO: Apply the changes on the comment with href(s) returned from the server (sample on how to change 1 comment below)
    // ===================== TEST Change single comment =============================================================
    const firstCommentData = (data && data.length > 0) ? data[0] : undefined;
    if (firstCommentData) {
        const id = firstCommentData['comment_id'];
        const testComment = getCommentDivFromId(id)
        console.log("COMMENT FOUND:", testComment);
        testComment.style.backgroundColor = 'green';
        changedComments = [testComment]
    }
    // +==================== END  TEST CHANGE SINGLE COMMENT ==================================================
})()

