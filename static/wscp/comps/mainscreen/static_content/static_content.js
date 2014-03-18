var editor = ace.edit("editor");

editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");

whitespell.workers.assign("xmr", {
        task: "request",
        params : {
            url: "{@this}/json/cfg.json"
        }
    }
    , function(data) {
      editor.getSession().setValue(data);
    });



var gestures = {

    unique: { // ids

    },

    collective: { //classes


    }
}

whitespell.ui.addGestures("{{componentName}}", gestures);
