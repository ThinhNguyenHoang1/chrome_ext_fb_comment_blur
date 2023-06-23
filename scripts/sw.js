chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: 'OFF'
    });
});

// Handle single message send and received
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log("ext sw received:", request)
        console.log(sender.tab ? "from a content script: " + sender.tab.url : "from extension");
        const response = { farewell: "how are you, tab ?" };
        if (request.from === "content_script") {
            console.log("received message from content script");
            sendResponse(response)
        }
        return true;
    }
)
const facebook_prefix = 'https://www.facebook.com/';

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(facebook_prefix)) {
        const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: currentTab.id,
            text: nextState
        });

        if (nextState === 'ON') {
            await chrome.scripting.executeScript({
                target: { tabId: currentTab.id, allFrames: true },
                files: ["scripts/blurScript.js"]
            })
        } else if (nextState === 'OFF') {
            await chrome.scripting.executeScript({
                target: { tabId: currentTab.id, allFrames: true },
                files: ["scripts/undoBlurScript.js"]
            })
        }
    }
});

