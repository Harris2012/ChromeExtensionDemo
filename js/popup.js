function callback(response) {

    if (response.length == 2) {
        $('p').text('成功');
    } else {
        $('p').text('失败');
    }
}

$(function () {

    var backgroundPage = chrome.extension.getBackgroundPage();

    backgroundPage.sendCurrentTab(callback);
})
