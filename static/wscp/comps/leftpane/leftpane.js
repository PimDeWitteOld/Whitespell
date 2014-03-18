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


if(!whitespell.d.isset("$leftPopoutApps")) {
whitespell.workers.assign("xmr", {

        task: "request",
        params : {
            url: "{@this}/json/sample.json"
        }
    }
    , function(data) {
        var wsSample = JSON.parse(data);
        for(var sample in wsSample.samples) {
            w$("$leftPopoutApps", {
                "name"   : wsSample.samples[sample].name
            }, sample);
        }
    });
}


whitespell.ui.addGestures("{{componentName}}", {

    unique: { // ids

    },

    collective: { //classes
        "loadPage": {
            release: function (el) {
                whitespell.layout.updatePage({
                    components: ["mainscreen", "leftpane"],
                    updates: ["static_content", "leftpane_static"]
                }, true);
           }
        }

    }
});
