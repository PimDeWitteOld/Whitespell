/*    w$("$email", {
       "email"   : "p.dwitte@soulsplit.com"
    });*/


var gestures = {

    unique: { // ids

        "username" : {
            release: function(el) {
                el["placeholder"] = "";
                el.value = "";
            }
        },
        "password" : {
            release: function(el) {
                el["placeholder"] = "";
                el.value = "";
            }
        }

    },

    collective: { //classes

        "loginButton": {
            release: function (el) {
                var personalKey = "";

                whitespell.workers.assign("xmr", {
                    task: "request",
                    params: {
                        url: "http://216.189.173.50:8040/requestloginkey",
                        method: "post",
                        parseData: {
                            "email"   : CryptoJS.SHA256(document.getElementById("username").value).toString()
}
                    }
                }, function(data) {
                    personalKey = data;
                    console.log("Personal Key:" + personalKey);
                });



                whitespell.workers.assign("xmr", {
                    task: "request",
                    params: {
                        url: "http://216.189.173.50:8040/login",
                        method: "post",
                        parseData: {
                            "username"   : CryptoJS.SHA256(CryptoJS.SHA256(document.getElementById("username").value).toString() + CryptoJS.SHA256(personalKey).toString()).toString(),
                            "password"   :  CryptoJS.SHA256(CryptoJS.SHA256(document.getElementById("password").value).toString() + CryptoJS.SHA256(personalKey).toString()).toString()
                        }
                    }
                }, function(data) {
                    alert(data);
                });
                w$("$username", {
                   "value" : document.getElementById("username").value
                });
                whitespell.layout.switchBetween(document.getElementById("authentication"), "display", "none", "block");
            }
        },

        "createButton": {
            release: function (el) {
                whitespell.layout.switchBetween(document.getElementById("loginBox"), "display", "none", "block");
                whitespell.layout.switchBetween(document.getElementById("registerBox"), "display", "none", "block");
            }
        }

    }
}

whitespell.ui.addGestures("{{componentName}}", gestures);


