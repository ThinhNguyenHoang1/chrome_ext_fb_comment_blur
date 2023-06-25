(() => {
    // ==================== Test Code =============================
    // const allComments = Array.from(document.querySelectorAll(`[class="${CLASS_NAMES.FB_COMMENT_DIV}"]`));
    // ==================== END TEST CODE =========================
    const dedupArray = (arr) => {
        return arr.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t['comment_id'] === value['comment_id'] && t['rep_comment_id'] === value['rep_comment_id']
        )))
    }
    const data = dedupArray(buildCommentIdx());

    console.log("COMMENT DATA:", data)
    // TODO: Send the data to the ML model to check if the comments are offensive
    // const res  = call_api(data)
    let res = data;

    // TODO: Set the changedComments variable to allow redos based on the response
    changedComments = []

    // TODO: Apply the changes on the comment with href(s) returned from the server (sample on how to change 1 comment below)
    // ===================== TEST Change single comment =============================================================
    data.forEach((ele) => {
        const testComments = getCommentDivFromIdAndRepId(ele['comment_id'], ele['rep_comment_id']);
        testComments.forEach(comment => comment.style.cssText = "background-color:pink;filter:blur(2.5em)")
        // testComment.style.cssText = "background-color:pink;filter:blur(2.5em)"
        // !DOUBLE CHECK
        changedComments.push(ele)
    })
    console.log(changedComments);
    // +==================== END  TEST CHANGE SINGLE COMMENT ==================================================
})()

