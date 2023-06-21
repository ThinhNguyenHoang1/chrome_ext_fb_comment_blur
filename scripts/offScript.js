// Select all comments presents on the page
(() => {
    // Search for 'Comments' or 'Binh Luan' as <h2>
    const commentTermAnchors = Array.from(document.querySelectorAll("h2")).filter(ele => (ele.textContent == VI_COMMENT_TERM || ele.textContent == EN_COMMENT_TERM));
    if (!commentTermAnchors) {
        console.log("Cannot found anchors")
    }
    else {
        console.log("ANCHORS:", commentTermAnchors)
    }
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
        backgroundColor: 'purple',
        filter: 'blur(0)'
    }
    listOfCommentList.forEach(ele => {
        // Object.assign(ele.style, newStyles);
        // console.log("STYLED: ", ele.style)
        ele.style.cssText = ""
    });
    console.log("index3.js:", defaultStyles.backgroundColor)
    return listOfComments;
})()

