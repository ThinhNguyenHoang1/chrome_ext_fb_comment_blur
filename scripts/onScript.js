// Select all comments presents on the page
(() => {
    // Search for 'Comments' or 'Binh Luan' as <h2>
    const commentTermAnchors = Array.from(document.querySelectorAll("h2")).filter(ele => (ele.textContent == VI_COMMENT_TERM || ele.textContent == EN_COMMENT_TERM));
    console.log("ANCHORS:", commentTermAnchors)
    const commentSectionWrappers = commentTermAnchors.map((anchor) => {
        return anchor.parentNode || anchor.parentElement;
    })  
    if (!commentSectionWrappers) {
        console.log("No commentsection wrapper found");
    }
    else {
        console.log("wrapper:", commentSectionWrappers)
    }
    const listOfCommentList = commentSectionWrappers.map(section => section.querySelector('ul'))
    console.log("list of comment List", listOfCommentList)
    // Flatten list of all comments on the page
    const listOfComments = listOfCommentList.reduce((acc, list) => {
        const commentList = list.querySelectorAll('li');
        console.log("comment list: ", commentList)
        acc.push(Array.from(commentList))
        return acc
    }, [])
    console.log("final list:", listOfComments);
    // Test Apply Style
    const newStyles = {
        backgroundColor: 'blue',
        filter: 'blur(2.5rem)'
    }
    listOfCommentList.forEach(ele => {
        Object.assign(ele.style, newStyles);
        console.log("STYLED: ", ele.style)
    });
    const data = buildCommentIdx();
    console.log("CRAWLED COMMENTS:", data);
    console.log("index2.js:", defaultStyles.backgroundColor)
    const TEST_HREF = "https://www.facebook.com/kienkhongngu.vn/posts/pfbid02V2KvWjL3MQ4bcDa9EXp8gi28tPvpgfmeKzh9R83wtWvotA19ixFTczpDFQCZneonl?comment_id=912871459808965&__tn__=R*F"
    const testComment = getCommentDivFromHref(TEST_HREF)
    testComment.style.backgroundColor = 'green';
    return listOfComments;
})()

