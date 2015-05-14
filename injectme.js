/**
 * Created by Omri on 3/23/14.
 */
// updated: this works with Chrome 30:

function send_report(data) {
    var evt=document.createEvent("CustomEvent");
    evt.initCustomEvent("yourCustomEvent", true, true, data.target.myParam);
    document.dispatchEvent(evt);
}

function add_link_action() {
    a_click = document.getElementsByClassName("report_to_crx");
    for (var i=0;i<a_click.length;i++) {
        a_click[i].addEventListener('click', send_report, false);
        userCommentId = a_click[i].parentElement.getAttribute("data-reactid").split('$comment')[1].split(':')[0];
        a_click[i].myParam = userCommentId; //TODO: extract hoover per user and hoover per likes
    }
}
add_link_action();
document.addEventListener('load', add_link_action);
document.addEventListener('scroll', add_link_action);
document.body.addEventListener('change', add_link_action);
document.addEventListener('click', add_link_action);
document.addEventListener('onclick', add_link_action);