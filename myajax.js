window._ = {
    get: function (url, config, callback) {
        var httpRequest;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }


        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304) {
                    callback(JSON.parse(httpRequest.responseText), null);
                } else {
                    callback(null, httpRequest.status);
                }
            }
        }


        httpRequest.open("get", url + "?" + _.jsonToUrl(config), true);
        httpRequest.send(null);
    },
    post: function (url, config, callback) {
        var httpRequest;
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }


        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304) {
                    callback(JSON.parse(httpRequest.responseText), null);
                } else {
                    callback(null, new Error("请求错误"));
                }
            }
        }
        // 以下三条语句顺序不能颠倒，必须先open，再setRequestHeader,再send
        httpRequest.open("post", url, true);
        httpRequest.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpRequest.send(_.jsonToUrl(config));
    },
    jsonToUrl: function (jsObj) {
        var res = [];
        for (var k in jsObj) {
            res.push(encodeURIComponent(k) + "=" + encodeURIComponent(jsObj[k]));
        }
        return res.join("&");
    },
    formSerializeToJson: function (formObj) {
        var json = {};
        for (var i = 0; i < formObj.elements.length; i++) {
            var item = formObj.elements[i];
            switch (item.type) {
                case undefined:
                case 'button':
                case 'file':
                case 'reset':
                case 'submit':
                    break;
                case 'checkbox':
                case 'radio':
                    if (!item.checked) {
                        break;
                    }
                default:
                    if (json[item.name]) {
                        json[item.name] = json[item.name] + ',' + item.value;
                    } else {
                        json[item.name] = item.value;
                    }
                    break;
            }
        }
        return json;
    }
}