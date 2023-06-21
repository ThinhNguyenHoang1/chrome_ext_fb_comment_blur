(() => {
    // ==================== Test Code =============================
    // const allComments = Array.from(document.querySelectorAll(`[class="${CLASS_NAMES.FB_COMMENT_DIV}"]`));
    // ==================== END TEST CODE =========================
    const data = buildCommentIdx();
    // TODO: Send the data to the ML model to check if the comments are offensive


    // TODO: Set the changedComments variable to allow redos based on the response
    changedComments = []
    
    // TODO: Apply the changes on the comment with href(s) returned from the server (sample on how to change 1 comment below)
    // ===================== TEST Change single comment =============================================================
    // const TEST_HREF = "https://www.facebook.com/kienkhongngu.vn/posts/pfbid02V2KvWjL3MQ4bcDa9EXp8gi28tPvpgfmeKzh9R83wtWvotA19ixFTczpDFQCZneonl?comment_id=912871459808965&__tn__=R*F"
    // const testComment = getCommentDivFromHref(TEST_HREF)
    // testComment.style.backgroundColor = 'green';
    // changedComments = [testComment]
    // +==================== END  TEST CHANGE SINGLE COMMENT ==================================================
})()

