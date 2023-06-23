let portFromCS;
// ========================= COMMUNICATIACTIVE STUFF =====================
const registerMessageHandler = (handler) => {
    portFromCS.onMessage.addListener(handler)
}

const sendMessage = (mess) => {
    portFromCS.postMessage(mess)
}

const isMessageFromFbTab = (mess) => {
    return mess?.from === 'facebook_tab';
}
const handleMessage = async (messFromCS, port) => {
    //
    const senderTab = port.sender.tab; 
    console.log("SW::HANDLING MESSAGE:",messFromCS);
    if (isMessageFromFbTab(messFromCS)) {
        // Check if current state is ACTIVE
        const currentState = await chrome.action.getBadgeText({ tabId: senderTab.id });
        if (messFromCS?.body === 'new_comment_added' && currentState === 'ACTIVE') {
            console.log("Executing blur script");
            await chrome.scripting.executeScript({
                target: { tabId: senderTab.id, allFrames: true },
                files: ["scripts/blurScript.js"]
            })

        }
    }
}

function onConnectHandler(p){
    portFromCS = p;
    console.log("CACTIVENECTED TO PORT:", portFromCS)
    // Register handler
    registerMessageHandler(handleMessage)
}
chrome.runtime.onConnect.addListener(onConnectHandler);

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: 'INACTIVE'
    });
});

const facebook_prefix = 'https://www.facebook.com/';

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(facebook_prefix)) {
        const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log("tab is:", tab);
        // We retrieve the action badge to check if the extension is 'ACTIVE' or 'INACTIVE'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

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
chrome.action.onClicked.addListener(() => {
    sendMessage({greeting: "they clicked the button!"});
});