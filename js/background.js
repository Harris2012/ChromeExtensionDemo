function sendCurrentTab(callback) {

    getCurrentTabUrl(function (url) {
        var postData = { "url": url };

        post('http://fav.cn/api/test', postData, callback);
    });
}

function getCurrentTabUrl(callback) {
    var queryInfo = { active: true, currentWindow: true };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];

        var url = tab.url;

        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

function post(url, data, callback) {

    postData = (function (obj) {
        var returnValue = "";

        var isFirst = true;
        for (var prop in obj) {
            if (!isFirst) {
                returnValue += "&";
            }
            returnValue += prop + "=" + obj[prop];
            isFirst = false;
        }

        return returnValue;
    })(data);

    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function process() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                callback(JSON.parse(xhr.response));
            }
            else {
                alert(xhr.status);
            }
        }
    };
    xhr.send(postData);
}
