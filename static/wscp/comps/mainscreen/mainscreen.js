

if(!whitespell.d.isset("$apps")) {
  whitespell.workers.assign("xmr", {

           task: "request",
           params : {
               url: "{@this}/json/sample.json"
           }
       }
       , function(data) {
           var wsSample = JSON.parse(data);
           for(var sample in wsSample.samples) {
               w$("$apps", {
                   "name"   : wsSample.samples[sample].name,
                   "id"   :   sample,
                   "icon"   :   whitespell.parseUrl(wsSample.samples[sample].icon)
               }, sample);
           }
       });
}


var gestures = {

    unique: { // ids

    },

    collective: { //classes

        "AppOption": {
            release: function (el) {
                whitespell.layout.updatePage({
                    components: ["mainscreen", "leftpane"],
                    updates: ["static_content", "leftpane_static"]
                }, true);
            }
        }



    }
}

whitespell.ui.addGestures("{{componentName}}", gestures);
