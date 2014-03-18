/*    w$("$email", {
       "email"   : "p.dwitte@soulsplit.com"
    });*/

var key = whitespell.config.AES_KEY;
var iv  = CryptoJS.lib.WordArray.random(16);
var encrypted = CryptoJS.AES.encrypt("Message", key, { iv: iv });
var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), key, { iv: iv });

alert(decrypted.toString(CryptoJS.enc.Utf8));

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
                    var d = JSON.parse(data);
                    if(d.status === "success") {
                    whitespell.layout.deactivateComponent("authentication");
                    whitespell.layout.activateComponent("mainscreen");
                    whitespell.layout.activateComponent("nav");
                    whitespell.layout.activateComponent("leftpane");
                    whitespell.history.startHistory();
                    }
                });

                w$("$username", {
                   "value" : document.getElementById("username").value
                }, 0);


            }
        },

        "createButton": {
            release: function (el) {
                whitespell.layout.updatePage({
                    components: ["authentication"],
                    updates: ["create_account"]
                }, true);
            }
        }

    }
}

whitespell.ui.addGestures("{{componentName}}", gestures);


