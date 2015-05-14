var add_command_msg = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "add_command"});
    });
};

function send_email(commentLink) {
    var link = "mailto:shivion@justice.gov.il"
               + "?subject=" + encodeURIComponent("דיווח על חשד לתגובה פוגענית בפייסבוק")
               + "&body=" + encodeURIComponent("I want to report this comment as a potential harmful comment:\n\n")
               + encodeURIComponent(commentLink + "\n\n")
               + encodeURIComponent("Sent by התוסף למלחמה בתגובות פוגעניות");
    chrome.tabs.create({ url: link }, function(tab) {
        setTimeOut(function() {
            chrome.tabs.remove(tab.id);
        }, 100);
    });
}

function build_comment_link(fullLink) {
    postId = fullLink.split('_',2)[0];
    commentId = fullLink.split('_',2)[1];
    var url = "http://www.facebook.com/" + postId + "?comment_id=" + commentId;
    send_email(url);
}
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "add_report":
            build_comment_link(request.commentId);
            break;
    }
    return true;
});

chrome.webNavigation.onDOMContentLoaded.addListener(add_command_msg);
chrome.webRequest.onCompleted.addListener(add_command_msg,
    {urls: ["<all_urls>"]});
chrome.webNavigation.onCompleted.addListener(add_command_msg);
chrome.webNavigation.onReferenceFragmentUpdated.addListener(add_command_msg);
chrome.runtime.onMessage.addListener(add_command_msg);
chrome.runtime.onInstalled.addListener(function() {
    show_options();
});


function show_options() {
    var optionsUrl = chrome.extension.getURL('options.html');
    chrome.tabs.query({url: optionsUrl}, function(tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, {active: true});
        } else {
            chrome.tabs.create({url: optionsUrl});
        }
    });
}
