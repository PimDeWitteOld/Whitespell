function xmr(data) {
    "use strict";

    switch(data.task) {

        case "initialize": {
            return;
        }
        case "request": {
            if(data.params.method === undefined) {
                data.params.method = "GET";
            }
            makeCorsRequest(data.params.url, data.params.method,  data.uid);
            return;
        }
    }
}
// Create the XHR object.
function createCORSRequest(method, url) {

    try {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
    }catch(er){
        console.log(er.message);
    }
    return xhr;
}

// Helper method to parse the title tag from the response.


// Make the actual CORS request.
function makeCorsRequest(url, method,  uid) {

    var url = url;

    var xhr = createCORSRequest(method,
        url);
    if (!xhr) {
        xmrSay({
            task: "request",
            uid: uid,
            content: "ERROR"

        });
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        xmrSay({
            task: "request",
            uid: uid,
            content: text
        });
    };

    xhr.onerror = function() {
        xmrSay({
            task: "request",
            uid: uid,
            content: "ERROR"
        });
    };

    xhr.send();
}


self.addEventListener("message", function(e) {
    xmr(e.data);
}, false);


function xmrSay(e) {
    try {
        self.postMessage(e);
    } catch(error) {
        whitespell.workers.handleManualResponse("xmr", e);
    }
}

function xmrListen(e) {
    xmr(e);
}