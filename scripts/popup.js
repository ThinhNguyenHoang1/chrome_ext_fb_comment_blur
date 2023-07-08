const button_blur = document.querySelector('#blur');
const facebook_prefix = 'https://www.facebook.com/';
let isBlur = true;

button_blur.addEventListener('click', async () => {   
    console.log("button clicked");
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    isBlur = !isBlur;
        if (currentTab.url.startsWith(facebook_prefix)) {
            // Next state will always be the opposite
            const nextState = isBlur? 'ACTIVE' : 'INACTIVE';
            // Set the action badge to the next state
            await chrome.action.setBadgeText({
                tabId: currentTab.id,
                text: nextState
            });
            if (nextState === 'ACTIVE') {
                await chrome.scripting.executeScript({
                    target: { tabId: currentTab.id, allFrames: true },
                    files: ["scripts/blurScript.js"]
                })
            } else if (nextState === 'INACTIVE') {
                await chrome.scripting.executeScript({
                    target: { tabId: currentTab.id, allFrames: true },
                    files: ["scripts/undoBlurScript.js"]
                })
            }
        }
    
});
