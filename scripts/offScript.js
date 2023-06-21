// Select all comments presents on the page
(() => {
    // Revert the styles back to normal
    changedComments.forEach(ele => {
        ele.style.cssText = ""
    });
})()

