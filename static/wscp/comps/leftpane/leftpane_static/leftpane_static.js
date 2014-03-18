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




for (var i in whitespell.config.components) {
    w$("$staticFiles", {
        "fileName" : i
    }, i);
}



var gestures = {

    unique: { // ids

    },

    collective: { //classes


    }
}

whitespell.ui.addGestures("{{componentName}}", gestures);
