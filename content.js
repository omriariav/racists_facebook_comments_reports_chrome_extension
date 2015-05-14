/**
 * Created by Omri Ariav on 3/20/14.
 */


var add_command = function () {
    var facebook_all_comments_blocks = [].slice.call(document.getElementsByClassName("UFICommentActions"));
    for (var i = 0; i < facebook_all_comments_blocks.length; i++) {
        html_block_to_add = ' · <a class="report_to_crx"/>לדווח למשרד המשפטים</a>';
        if (facebook_all_comments_blocks[i].getAttribute('been_there') != 'done_that') {
            facebook_all_comments_blocks[i].insertAdjacentHTML('beforeend', html_block_to_add);
            facebook_all_comments_blocks[i].setAttribute('been_there', 'done_that');
        }
    }
};

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "add_command":
            add_command();
            break;
    }
});

var s = document.createElement('script');
s.src = chrome.extension.getURL('injectme.js');
document.head.appendChild(s);

document.addEventListener('yourCustomEvent', function (e) {
    var data=e.detail;
    chrome.runtime.sendMessage({type: 'add_report', commentId: data});
});
