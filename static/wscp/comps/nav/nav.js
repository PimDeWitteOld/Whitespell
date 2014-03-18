var gestures = {

    unique: { // ids

    },

    collective: { //classes
        popLeftPane: {
            release: function(el) {
                whitespell.layout.updatePage({
                    components: ["mainscreen", "leftpane"],
                    updates: ["mainscreen", "leftpane"]
                }, true);

                // whitespell.layout.switchBetween(document.getElementById("leftpane"), "display", "block", "none");
         //   whitespell.layout.switchBetween(document.getElementById("navbutton"), "left", "230px", "10px");

        }
        }
    }
}

whitespell.ui.addGestures("{{componentName}}", gestures);
