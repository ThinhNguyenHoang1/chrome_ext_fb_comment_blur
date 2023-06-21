const SERVER_ROOT_ADDR = "http://localhost:3000"
const API_ROUTES = {
    PICK_TOXIC_COMMENT_FROM_LIST: '/pick-toxic-comment/'
}

const VI_COMMENT_TERM = 'Bình luận';
const EN_COMMENT_TERM = 'Comment';

const CLASS_NAMES = {
    fb_comment: "x1n2onr6"
}
const buildBlurStyles = (options) => {
}

// Applpy styling to the ids to elements matches the classnames 
const applyStylesToClassNames = (classnames, styles) => {
    // Select the classnames
    const elements =  document.querySelectorAll(classnames);
    // Apply the styles
    elements.forEach((ele) => {
        ele.style = {
            ...ele.style,
            ...styles,
        }
    })
}
// Select all comments presents on the page
const selectAllComments = () => {
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
        backgroundColor: 'red',
        // filter: 'blur(1.5rem)'
    }
    listOfCommentList.forEach(ele => {
        Object.assign(ele.style, newStyles);
        console.log("STYLED: ", ele.style)
    });
    return listOfComments;
}

// Retrieve the comments with toxic contents 
const getToxicComments = async (comments) => {
    const endpoint = `${SERVER_ROOT_ADDR}/${API_ROUTES.PICK_TOXIC_COMMENT_FROM_LIST}`;
    const response = await fetch(endpoint);
    const jsonData = await response.json();
    console.log(jsonData);
    // TODO: Filter the IDs (class names) from the response
    return []
}
console.log("INITIING EXTENSION")
const allComments = selectAllComments();
