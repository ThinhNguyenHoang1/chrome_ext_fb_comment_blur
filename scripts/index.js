const CLASS_NAMES = {
    FB_COMMENT_DIV: "x1r8uery x1iyjqo2 x6ikm8r x10wlt62 x1pi30zi",
    FB_COMMENT_TEXT_DIV: "xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs",
    FB_COMMENT_DATE_A: "x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz xt0b8zv xi81zsa xo1l8bm"
}

// Blurred Styles 
const blurredStyles = {
    backgroundColor: 'blue',
    filter: 'blur(2.5rem)'
}
// Applpy styling to the ids to elements matches the classnames
const applyStylesToClassNames = (classnames, styles) => {
    // Select the classnames
    const elements = document.querySelectorAll(classnames);
    // Apply the styles
    elements.forEach((ele) => {
        ele.style = {
            ...ele.style,
            ...styles,
        }
    })
}
let defaultStyles = {}
// Client uses these function to crawl the comments data and send to the AI model
const getCommentHrefFromElement = (ele) => {
    return ele.querySelector(`a[class="${CLASS_NAMES.FB_COMMENT_DATE_A}"]`).href;
}
const buildCommentIdx = () => {
    // Select all the comments
    const allComments = Array.from(document.querySelectorAll(`[class="${CLASS_NAMES.FB_COMMENT_DIV}"]`));
    return allComments.map(ele => {
        // Sample: href="https://www.facebook.com/mew629/posts/pfbid022Fo8Zc1weinwndeLztsgqK1ginp8eYtRNKtPmsi4LaUPTuZ31otEX3jpVoawS6Yil?comment_id=806188640824780&__tn__=R*F"
        const comment_text = ele.querySelector(`[class="${CLASS_NAMES.FB_COMMENT_TEXT_DIV}"]`).textContent;
        const comment_href = getCommentHrefFromElement(ele);
        return {
            comment_text,
            comment_href
        }
    })
}
// Quickly find back the comment by the href (from response of server)
const getCommentDivFromHref = (href) => {
    return document.querySelector(`a[class="${CLASS_NAMES.FB_COMMENT_DATE_A}"][href="${href}"]`).parentElement.parentElement.parentElement;
}

const SERVER_ROOT_ADDR = "http://localhost:3000"
const API_ROUTES = {
    PICK_TOXIC_COMMENT_FROM_LIST: '/pick-toxic-comment/'
}
// Retrieve the comments with toxic contents
const getToxicComments = async (data) => {
    const endpoint = `${SERVER_ROOT_ADDR}/${API_ROUTES.PICK_TOXIC_COMMENT_FROM_LIST}`;
    const response = await fetch(endpoint);
    const jsonData = await response.json();
    console.log(jsonData);
    return []
}

let changedComments = []