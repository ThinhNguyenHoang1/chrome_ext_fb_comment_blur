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
        text: 'ACTIVE'
    });
});