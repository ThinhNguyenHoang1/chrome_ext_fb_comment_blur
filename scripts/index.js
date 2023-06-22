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

// Client uses these function to crawl the comments data and send to the AI model
const getCommentHrefFromElement = (ele) => {
    return ele.querySelector(`a[class="${CLASS_NAMES.FB_COMMENT_DATE_A}"]`).href;
}
const extractCommentIdFromHref = (href) => {
    const url = new URL(href)
    const params = new URLSearchParams(url.search); 
    return params.get("comment_id");
}
const compactArray = (arr) => {
    return arr.reduce(function(res, el) {
        if(el !== null) {
        res.push(el);//from ww  w .  ja  v  a2s.  c om
        };
        return res;
    }, [])
}
const buildCommentIdx = () => {
    // Select all the comments
    const allComments = Array.from(document.querySelectorAll(`[class="${CLASS_NAMES.FB_COMMENT_DIV}"]`));
    console.log("allComments:", allComments)
    let data = allComments.map(ele => {
        // Sample: href="https://www.facebook.com/mew629/posts/pfbid022Fo8Zc1weinwndeLztsgqK1ginp8eYtRNKtPmsi4LaUPTuZ31otEX3jpVoawS6Yil?comment_id=806188640824780&__tn__=R*F"
        const comment_text_ele = ele.querySelector(`[class="${CLASS_NAMES.FB_COMMENT_TEXT_DIV}"]`);
        // console.log("comment text ele:", comment_text_ele)
        if (comment_text_ele && comment_text_ele?.textContent) {
            const comment_text = comment_text_ele.textContent;
            const comment_href = getCommentHrefFromElement(ele);
            const comment_id = extractCommentIdFromHref(comment_href);
            return {
                comment_text,
                comment_href,
                comment_id
            }
        }
        return null;
    })
    data = compactArray(data);
    console.log("DATA:", data);
    return data;
}
const getCommentDivFromId = (id) => {
    const commentAnchors = Array.from(document.querySelectorAll(`a[class="${CLASS_NAMES.FB_COMMENT_DATE_A}"]`));
    const matchingCommentAnchor = commentAnchors.find((ele) => {
        const href = ele.href;
        const comment_id = extractCommentIdFromHref(href);
        return id == comment_id;
    });
    return matchingCommentAnchor.parentElement.parentElement.parentElement;
}

const getCommentDivFromHref = (href) => {
    const id = extractCommentIdFromHref(href);
    return getCommentDivFromId(id);
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