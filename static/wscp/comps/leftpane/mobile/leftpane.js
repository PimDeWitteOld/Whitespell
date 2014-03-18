/*setTimeout(function() {

for(var i = 0; i < 5; i++) {
    w$("$apps", {
       "name"   : "Application "+i+"",
       "id"   :   i
    });

    w$("$mails", {
        "name"   : "Mail States "+i+"",
        "id"   :   i
    });

}
}, 300);

*/







var gestures = {

    unique: { // ids

    },

    collective: { //classes
        "openInterface": {
            release: function (el) {
                whitespell.layout.updateComponentContent("mainscreen", "dynatasks");
            }
        },
        "mail": {
            release: function (el) {

            }
        },
        "toggleLeftPane" : {
            release: function(el) {
                whitespell.layout.switchBetween(document.getElementById("leftpane"), "display", "block", "none");
               // whitespell.layout.switchBetween(document.getElementById("navbutton"), "left", "230px", "10px");

            }
        }

    }
}

whitespell.ui.addGestures("{{componentName}}", gestures);
