(() => {
    // ==================== Test Code =============================
    // const allComments = Array.from(document.querySelectorAll(`[class="${CLASS_NAMES.FB_COMMENT_DIV}"]`));
    // ==================== END TEST CODE =========================
    const data = buildCommentIdx();
    console.log("COMMENT DATA:", data)
    // TODO: Send the data to the ML model to check if the comments are offensive
    // const res  = call_api(data)
    const res = data;

    // TODO: Set the changedComments variable to allow redos based on the response
    changedComments = []

    // TODO: Apply the changes on the comment with href(s) returned from the server (sample on how to change 1 comment below)
    // ===================== TEST Change single comment =============================================================
    res.forEach((ele) => {
        const testComment = getCommentDivFromId(ele['comment_id']);
        console.log("TESTCOMMENT:", testComment)
        Object.assign(testComment.style, blurredStyles);
        changedComments.push(ele)
    })
    console.log(changedComments);
    // +==================== END  TEST CHANGE SINGLE COMMENT ==================================================
})()

