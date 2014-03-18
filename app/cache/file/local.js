/*


 TODO:
 COMPONENTS ONLY NEED TO BE LOADED ONCE. ONCE THEY HAVE BEEN LOADED, WE PUT THEM IN THE CACHE AND WE WILL ALWAYS REQUEST ALL THE CONTENT FROM THERE UNLESS THE INITIAL VERSIONING CHANGES
 SUPER FAST EXPERIENCE AS A RESULT.
 */
(function () {
    if (!window.console) {
        window.console = {};
    }
    // union of Chrome, FF, IE, and Safari console methods
    var m = [
        "log", "info", "warn", "error", "debug", "trace", "dir", "group",
        "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
        "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
    ];
    // define undefined methods as noops to prevent errors
    for (var i = 0; i < m.length; i++) {
        if (!window.console[m[i]]) {
            window.console[m[i]] = function () {
            };
        }
    }
})();


/*

 Wilhelmus de Witte, 2013

 */

var globals = [];

/*

 Wilhelmus de Witte, 2013

 */

function UIDefinitions() {

    "use strict";

    var mem = C.addMemory("UIDefinitions");

    return {

        unique: { // ids


        },


        collective: { //classes


        }
    }
}
/**
 * Created by pimdewitte on 11/9/13.
 */

/**
 * Created by pimdewitte on 11/8/13.
 */

var DOM = {
    transform: function (element, name, value) {
        element.style[name] = value;
    }
}


function Cache() {
    "use strict";

    Cache.Instance = function () {
        return this;
    };

    Cache.Instance.prototype = {

        //todo LOAD ALL SAVED FILES ON MACHINE FROM BROWSER STORAGE / DEVICE IF POSSIBLE

        storage: [],

        get: function (container, id, name) {
            if(this.storage[container] === undefined || this.storage[container][id] === undefined || this.storage[container][id][name] === undefined) {
                return null;
            }
            return name !== undefined ? this.storage[container][id][name] : this.storage[container][id];
        },
        set: function (container, id, name, val) {

            if (this.storage[container][id] === undefined) {
                this.storage[container][id] = [];
            }

            this.storage[container][id][name] = val;
        },
        remove: function (container, id, name) {

            if (this.storage[container][id] === undefined) {
                this.storage[container][id] = [];
            }

            this.storage[container][id][name] = undefined;
        },

        addMemory: function (container) {
            if (this.storage[container] === undefined) {
                this.storage[container] = [];
            } else {
                var b = Math.random() * 10000;
                return C.addMemory(container + b);
            }
            return container;
        }
    }

    return new Cache.Instance();
}
/*
 Whitespell client 2013 (c)
 */

//4282613


var grabApp = {

    /*

     We declare the configuration to later be overwritten by the JSON data.

     */

    configuration: null,

    /*

     We declare the version to be checked with the configuration's lastVersion that we load through JSON

     */

    myVersion: 12,

    /*

     The initialization function calls all the functions that are mandatory to display the app on your screen

     */

    initialize: function () {
        // outputAction.displayLoader();
        this.versionCheck();
        // this.loadContent();
    },

    /*

     The getJSONData function grabs the configuration data from the given URL and declares the json data as configuration.
     Dependencies: jQuery

     */

    versionCheck: function () {
        var version = this.myVersion;
        var configurationData = $.getJSON("/httpserver/cfg/json/cfg.json", function (data) {
            if (data.lastFunctional > version) {
                alert("You are using an outdated version (" + version + ") of this application. Please update your application to " + data.lastVersion + " and launch the application again.");
                return null;
            }
            if (data.lastVersion > version) {
                alert("The latest version is " + data.lastVersion + ". We recommend you to update your application.");
            }
            console.log("Launched application with current version " + version + " with latest functional " + data.lastFunctional);
            whitespell.initialize();
        })
            .fail(function () {
                console.log("There was an error processing your version check.");
            });
    }
};
/**
 * @author wwadewitte on 11/6/13.
 * Copyright Wilhelmus de Witte
 * This file is not meant to be distributed yet
 * When finding this file on any device please contact +1 786 201 9489
 * p.dwitte@soulsplit.com | WhiteSpell Project 2013
 */

function HistoryController() {

    "use strict";

    var mem = C.addMemory("HistoryController");

    var loadFunction = null;

    var pageStructures = [];

    var previousPages = [];


    HistoryController.Instance = function () {
        return this;
    }

    HistoryController.Instance.prototype = {

        initialize: function () {
        },

        setOnPageLoad: function (pageName, pageData, onLoad) {
            pageStructures[pageName] = pageData;

            if (loadFunction !== null) {
                return;
            }

            loadFunction = onLoad;
        },
        pushState: function (data, randomNotImportantVariable, url) {

            try {
                if (window.history !== undefined) {
                    history.pushState(data, randomNotImportantVariable, url);
                }
            } catch (e) {
                console.log(e.message);
            }

        },

        setStartState: function (data) {
            whitespell.history.pushState(data, "", "#home");
        },


        startHistory: function() {

            var toPut = {
                components: [],
                updates: []
            };
            for (var i in whitespell.config.components) {
                if(whitespell.config.components[i].active === true) {
                    toPut.components.push(i);
                    toPut.updates.push(i);
                    // console.log("ADD ALL COMPONENTS AND DEVICE-SPECIFIC SUBCOMPONENTS AS IDS IN THE INTELLIGENCE FEED");
                    for (var b in whitespell.config.components[i].remote_html) {
                        //console.log(i + "->" + b);
                    }
                } // todo create proper start state with new structure
            }
            this.setStartState(toPut);
        },

        restorePage: function (data, url) {

            if (url !== undefined) {
                // restore data from url todo
            }

            var toRestore = data;


            if (toRestore === undefined || toRestore === null) {
                return;
            }

            whitespell.layout.updatePage({
                components: toRestore.components,
                updates: toRestore.updates
            }, false);


        }


    }

    HistoryController.handleResponse = function (worker, response) {

        switch (worker) {

        }

    }


    return new HistoryController.Instance();
}
/*
 Copyright (c) Wilhelmus ("Pim") de Witte 2013 for the WhiteSpell Web Server Project (whitespell.com)
 */


function DynamicStream(ViewDeclaration) {

    "use strict";


    var currentCache = [];

    var lists = [];

    var reloadJavascriptOnUpdate = [];

    var variableCache = [];


    DynamicStream.Instance = function () {
        return this;
    };

    DynamicStream.Interaction = {

    }


    DynamicStream.Instance.prototype = {



        variables: [],
        on: function (variable, functionToExecute) {
            // add queue to listen for variable and execute function when occcurs
        },

        fillTemplate: function (data, template) {
            for (var parts in data) {
                if (template.indexOf(parts) !== -1) {
                    template = template.replace(new RegExp("{" + parts + "}", 'g'), data[parts]);
                }
            }
            return template;
        },

        updateValue: function (variable, data, index) {
            if (index === undefined) {
                index = 0;
                console.log("Index not set for " + variable);
            }

            try {
                if (this.variables[variable] === undefined) {
                    this.declareVariable(variable);
                }

                this.variables[variable].values[index] = data;

                /*
                 Are there elements that depend on this variable?
                 */


                if (this.variables[variable].linkTo.length > 0) {
                    for (var i = 0; i < this.variables[variable].linkTo.length; i++) {
                        this.updateValue(this.variables[variable].linkTo[i], data, index);
                    }
                }


                if (this.variables[variable].subElements.length > 0) {
                    for (var element in this.variables[variable].subElements) {
                        if (document.getElementById(this.variables[variable].subElements[element]) === null) {
                            this.clearSubElements(variable, element);
                            continue;
                        }
                        if (document.getElementById(this.variables[variable].subElements[element]).innerHTML === this.variables[variable].defaultValue) {
                            document.getElementById(this.variables[variable].subElements[element]).innerHTML =
                                this.fillTemplate(data, this.variables[variable].template);
                        } else {

                            switch (this.variables[variable].update) {
                                case "addBefore" :
                                {
                                    document.getElementById(this.variables[variable].subElements[element]).innerHTML =
                                        this.fillTemplate(data, this.variables[variable].template) + document.getElementById(this.variables[variable].subElements[element]).innerHTML;
                                    break;
                                }
                                case "addAfter" :
                                {

                                    /*var i = document.createElement(document.getElementById(this.variables[variable].subElements[element]).tagName);

                                     i.innerHTML = (document.getElementById(this.variables[variable].subElements[element]).innerHTML + this.fillTemplate(data,this.variables[variable].template));

                                     if(document.getElementById(this.variables[variable].subElements[element]).replaceNode){
                                     document.getElementById(this.variables[variable].subElements[element]).replaceNode(i);
                                     }else {
                                     */
                                    document.getElementById(this.variables[variable].subElements[element]).innerHTML += this.fillTemplate(data, this.variables[variable].template);
                                    /*}*/
                                    break;
                                }
                                case "replace" :
                                {
                                    document.getElementById(this.variables[variable].subElements[element]).innerHTML =
                                        this.fillTemplate(data, this.variables[variable].template);
                                    break;
                                }
                                default:
                                {
                                    console.log("update not defined for var " + variable);
                                    break;
                                }
                            }
                        }

                    }

                }

                if (this.variables[variable].javascripted !== undefined) {
                    whitespell.ui.addGestures(this.variables[variable].javascripted);
                }
            } catch (e) {
                this.clearSubElements(variable, element);
                alert(e.message);
            }
        },

        declareVariable: function (varname) {
            if (this.variables[varname] === undefined) {
                this.variables[varname] = {
                    subElements: [],
                    vartype: null,
                    values: [],
                    template: undefined,
                    update: null,
                    linkTo: [],
                    defaultValue: null,
                    javascripted: undefined

                };
            }


        },

        addSubElement: function (varname, idname) {
            if (this.variables[varname] !== undefined) {
                this.variables[varname].subElements.push(idname);
            }
        },
        clearSubElements: function (varname, idname) {
            if (this.variables[varname] !== undefined) {
                this.variables[varname].subElements[idname] = undefined;
            }
        },

        isset: function (varName) {
            return this.variables[varName].values.length > 0;
        },

        issetParam: function (varName, param) {
            return this.variables[varName][param] !== undefined;
        },

        getValues: function (varName) {
            return this.variables[varName].values;

        },
        getTemplate: function (varName) {
            return this.variables[varName].template;

        },
        getType: function (varName) {
            return this.variables[varName].type;

        },

        pushVariable: function (varname, paramName, value) {
            if (this.variables[varname] !== undefined) {

                this.variables[varname][paramName] = value;
            }
        },

        pushLinkedVariable: function (mainvar, linkedvar) {

            if (this.variables[mainvar] !== undefined) {
                this.variables[mainvar].linkTo.push(linkedvar);
            }
        },

        removeVar: function (varname) {

        },

        clearPageVars: function (page) {

        },

        clearAllVars: function () {

        },

        generateUniqueId: function (varName) {

            if (this.variables[varName] === undefined || this.variables[varName].subElements.length == 0) {
                return 0;
            }
            return ((this.variables[varName].subElements.length + 1));
        }

    }


    return new DynamicStream.Instance();

}


var C = new Cache();
var w$ = function (varname, data, index) {
    whitespell.d.updateValue(varname, data, index);
}


window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
    window.MozBlobBuilder || window.MSBlobBuilder;
window.URL = window.URL || window.webkitURL;

/*

 SEO
 http://blog.alexmaccaw.com/seo-in-js-web-apps

 */

var whitespell = {

    ui: null,
    workers: null,
    layout: null,
    d: null,
    errorController: null,
    config: null,
    xmrWorker: null,
    websocketWorker: null,
    spinner: null,
    snapper: null,
    devicetype: "dT:desktop",
    includedJavascript: [],


    initialize: function () {


        /* window.onbeforeunload = function () {
         return "Are you sure you wish to exit the application?";
         };*/


        try {
            window.addEventListener("popstate", function (e) {
                whitespell.history.restorePage(e.state, e.URL);
            }, false);
        } catch (er) {
            console.log(er.message);
        }


        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
            window.MozBlobBuilder || window.MSBlobBuilder;

        window.URL = window.URL || window.webkitURL;

        whitespell.ui = new UIHandler(new UIDefinitions);
        whitespell.workers = new WorkerHandler([]);
        whitespell.d = new DynamicStream();
        whitespell.errorController = new ErrorController();
        whitespell.layout = new Layout();
        whitespell.history = new HistoryController();


        whitespell.workers.initialize();

        whitespell.workers.assign("xmr", {
            task: "request",
            params: {
                url: globalConfig.STATIC_CONTENT_URL + globalConfig.CONFIG_FILE // load from json later
            }
        }, function (data) {
            try {
                whitespell.config = JSON.parse(whitespell.parseUrl(data));

                whitespell.config.dT = whitespell.parseUrl(whitespell.config.dT);

                whitespell.workers.assign("xmr", {
                    task: "request",
                    params: {
                        url: whitespell.config.dT // load from json later
                    }

                }, function (data) {
                    whitespell.layout.addScriptsToDom("dT", data);
                    whitespell.ui.initialize();
                    whitespell.layout.initialize();
                });
            } catch (er) {
                console.log(er.message);
            }
        });

    },


    parseUrl: function (url) {
        return url.replace(new RegExp("{@this}", 'g'), globalConfig.STATIC_CONTENT_URL).replace(new RegExp("@this", 'g'), globalConfig.STATIC_CONTENT_URL);

    }
}
/**
 * @author wwadewitte on 11/6/13.
 * Copyright Wilhelmus de Witte
 * This file is not meant to be distributed yet
 * When finding this file on any device please contact +1 786 201 9489
 * p.dwitte@soulsplit.com | WhiteSpell Project 2013
 */

function ErrorController(Configuration) {

    "use strict";

    var mem = C.addMemory("ErrorController");

    ErrorController.Instance = function () {
        return this;
    }

    ErrorController.Instance.prototype = {

        initialize: function () {
        },

        crashPage: function (type) {
            document.getElementById("application").innerHTML = "<p style='font-: Helvetica Neue'><center><img src='cache/file/img/logo/wslogo_lightbg.png' height='100px'/><h1>The function you have requested is not suported by your browser. We strongly recommend downloading our app on your smartphone here, or using a different browser.</h1></center></p>";
        }


    }


    return new ErrorController.Instance();
}
/*
 Copyright (c) Wilhelmus ("Pim") de Witte 2013 for the WhiteSpell Web Server Project (whitespell.com)
 */


function UIHandler(ViewDeclaration) {

    "use strict";

    var mem = C.addMemory("UIHandler");

    var d = ViewDeclaration;

    var isTouch = (typeof window.ontouchstart !== "undefined");

    var releaseId = (isTouch ? "touchend" : "mouseup");

    var cancelId = ("mouseout");
    var startId = (isTouch ? "touchstart" : "mousedown");

    var currentInterface = "home";

    var backButtonInterface = "home";

    var gesturesDefined = [];

    UIHandler.Instance = function () {
        return this;
    };

    UIHandler.Interaction = {


        bindActions: function (element, actions, flush) {


            if (element === null) {
                throw new Error("You have an element that is not initialized in the UI Definitions.");
            }

            /* flush all active event listeners */
            /*
             if(flush === true) {
             var oldElement = element;
             var new_element = element.cloneNode(true);
             element.parentNode.replaceChild(new_element, oldElement);
             element = new_element;
             }

             if(element.getAttribute("gestures") === "1") {
             return;
             }
             */


            element.style.cursor = "pointer";

            /* Hammer.JS support for cool gestures */

            if (actions.hammer !== undefined) {
                for (var gesture in actions.hammer) {
                    Hammer(element).on(gesture, function (ev) {
                        actions.hammer[gesture](ev, element);
                    });
                }
            }

            if (actions.touch === undefined) {
                actions.touch = UIHandler.defaultEffects.TouchEffectTask;
            }

            if (actions.after === undefined) {
                actions.after = UIHandler.defaultEffects.ReturnToDefault;
            }

            if (actions.release === undefined) {
            }


            var cancel = function (e) {
                e.preventDefault();
                actions.after(element);
                element.removeEventListener(releaseId, release);
            };


            var release = function (e) {

                if (C.get(mem, "TouchEvents", e) !== window.pageYOffset) {
                    e.preventDefault();
                    actions.after(element);
                    element.removeEventListener(cancelId, cancel);
                    return;
                }
                e.preventDefault();
                actions.release(element);
                actions.after(element);
                element.removeEventListener(cancelId, cancel);
            };

            var start = function (e) {

                //e.preventDefault();
                C.set(mem, "TouchEvents", e, window.pageYOffset);
                actions.touch(element);
                element.addEventListener(cancelId, cancel, false);
                element.addEventListener(releaseId, release, false);

            }

            if (window.attachEvent) {

                if (actions.release !== undefined) {
                    element.attachEvent('onclick', actions.release);

                } else if (actions.start !== undefined) {
                    element.attachEvent('onclick', actions.start);
                }
            } else {
                element.addEventListener(startId, start, false);
            }
            // element.setAttribute("gestures", "1");

        }


    }


    UIHandler.Instance.prototype = {



        getBackButtonInterface: function () {
            return backButtonInterface;
        },

        setCurrentInterface: function (str, cid, cat) {
            if (str !== currentInterface) {
                backButtonInterface = currentInterface;
            }
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            currentInterface = str;
        },

        getIUValue: function (page, val) {

            var res = C.get(mem, "Select-" + page);
            if (res === undefined) {
                console.log(page);
                return "Invalid page specified or not declared";
            }

            var result = C.get(mem, "Select-" + page, val);

            if (result === undefined) {
                console.log(val);
                return "Invalid page specified or not declared";
            } else {
                result = result.selected;
            }

            if (result.indexOf("val:") !== -1) {
                result = document.getElementById(result.split(":")[1]).value;
            }

            return result;
        },

        handleIU: function (e) {

            var data = e.getAttribute("data-options").split(",");
            var c = C.get(mem, "Select-" + data[0]);
            if (c === undefined) {
                C.set(mem, "Select-" + data[0], data[1], {
                    selected: "none",
                    el: null
                });
            }

            var v = C.get(mem, "Select-" + data[0], data[1]);

            if (v === undefined) {
                C.set(mem, "Select-" + data[0], data[1], {
                    selected: "none",
                    el: null
                });
            }

            var p = C.get(mem, "Select-" + data[0], data[1])['el'];
            if (p != null && v.selected != data[2]) {
                p.style.background = "#ffffff"
                p.style.color = "#212121"
            }
            //C.get(mem, "Select-"+data[0],data[1]).el.style.background = "#ffffff";

            C.set(mem, "Select-" + data[0], data[1], {
                selected: data[2],
                el: e
            });


        },


        setRequestMode: function (str) {

            whitespell.mode = str;

        },

        initialize: function () {

            if (releaseId in window) {
                alert("alert");
            }


        },

        addGestures: function (name, gs) {



            /*

             todo: make it so elements that are added by WSIF are updated independently, currently the whole list gets re-initialized.
             */


            if (gesturesDefined[name] !== undefined) {
                if (gs === undefined) {
                    gs = gesturesDefined[name];
                }
            }

            gesturesDefined[name] = gs;

            if (gs === undefined) {

                return;
            }


            for (var element in gs.unique) {

                var targetElement = document.getElementById(element);

                UIHandler.gestures.add(UIHandler.Interaction.bindActions(targetElement, gs.unique[element]));

            }

            for (var className in gs.collective) {


                var elements = document.getElementsByClassName ? document.getElementsByClassName(className) : document.querySelectorAll("." + className + "");

                for (var i = 0; i < elements.length; i++) {
                     UIHandler.gestures.add(name, UIHandler.Interaction.bindActions(elements[i], gs.collective[className]));

                }

            }

        }
    }


    UIHandler.defaultEffects = {

        TouchEffectTask: function (e) {

            DOM.transform(e, "opacity", ".3");

        },

        ReturnToDefault: function (e) {

            DOM.transform(e, "opacity", "1");

        }


    };

    UIHandler.gestures = {

        container: [],

        add: function (name, task) {
            if (this.container[name] !== undefined) {
                this.container[name] = [];
            } else {
                this.container[name] = [];
            }
            this.container[name].push(task);
        }
    }

    UIHandler.DOMController = {

    }

    return new UIHandler.Instance();

}


/**
 * Created by pimdewitte on 11/23/13.
 */
/**
 * @author wwadewitte on 11/6/13.
 * Copyright Wilhelmus de Witte
 * This file is not meant to be distributed yet
 * When finding this file on any device please contact +1 786 201 9489
 * p.dwitte@soulsplit.com | WhiteSpell Project 2013
 */


function WorkerHandler(Configuration) {

    "use strict";

    var mem = C.addMemory("WorkerHandler");

    var usingWorkers = true;

    WorkerHandler.Instance = function () {
        return this;
    }

    WorkerHandler.Instance.prototype = {

        initialize: function () {
            // usingWorkers = (typeof(Worker) !== "undefined");
            this.add("xmr");
            // this.add("websocket");
        },

        add: function (name) {

            if (usingWorkers === false) {
                return;
            }

            if (!window.Worker) {
                usingWorkers = false;
                //whitespell.errorController.crashPage();
                return;
            }

            try {

                var blob = null;

                if (window.BlobBuilder !== undefined) {
                    var bb = new BlobBuilder();
                    bb.append(document.getElementById(name).innerHTML);
                    blob = bb.getBlob('text/javascript');
                    blob = window.URL.createObjectURL(blob);
                } else if (window.Blob) {
                    blob = window.URL.createObjectURL(new Blob([document.getElementById(name).innerHTML]));
                }

                /*

                 todo: if worker is is not supported, rewrite to add the scripts to the DOM using the layout.addScriptsToDom method
                 */
                var w = new Worker(blob);
                C.set(mem, "Workers", name, w);
                var worker = this.getWorker(name);


            } catch (e) {
                try {
                    var w = new Worker("workers/" + name + ".js");

                    C.set(mem, "Workers", name, w);
                    var worker = this.getWorker(name);


                } catch (er) {
                    usingWorkers = false;
                }
            }
            if(usingWorkers) {
            worker.addEventListener("message", function (event) {
                if(event.data.task === "request") {
                    var url = C.get(mem, "PageCache", event.data.uid);
                    if(url !== null) {
                        C.remove(mem, "PageCache", event.data.uid);
                        C.set(mem, "PageCache", url, event.data.content);

                    }
                }
                C.get(mem, "WorkersCallbacks", event.data.task + "-" + event.data.uid)(event.data.content);
            }, false);
            }


        },

        handleManualResponse: function (worker, event) {
            if(event.task === "request") {
                var url = C.get(mem, "PageCache", event.uid);
                if(url !== null) {
                    C.remove(mem, "PageCache", event.uid);
                    C.set(mem, "PageCache", url, event.content);

                }
            }
            C.get(mem, "WorkersCallbacks", event.task + "-" + event.uid)(event.content);
        },

        getWorker: function (name) {
            if (name === undefined) {
                console.log("Invalid worker requested");
                return;
            }

            return C.get(mem, "Workers", name);
        },

        assign: function (workerName, data, callback) {

            if (data.params.method === "post") {
                data.params.method = "get";
            }

            data["uid"] = (Math.random() * 1000); // todo change unique algorithm


            if(data.cacheResult === true) {
                var pageContent = C.get(mem, "PageCache", data.params.url);
                if(pageContent !== null) {
                    setTimeout(function() {callback(pageContent);}, 1);
                    return;
                } else {
                    C.set(mem, "PageCache", data.uid, data.params.url);
                }
            }


            C.set(mem, "WorkersCallbacks", data.task + "-" + data.uid, callback);



            if (usingWorkers) {
                var worker = this.getWorker(workerName);
                worker.postMessage(data);
            } else {
                workerMitigator(workerName, data);
            }


        }
    }

    WorkerHandler.handleResponse = function (worker, response) {

        switch (worker) {

        }

    }


    return new WorkerHandler.Instance();
}
/*
 Copyright (c) Wilhelmus ("Pim") de Witte 2013 for the WhiteSpell Web Server Project (whitespell.com)
 */


function Collector(name) {

    "use strict";

    var parentElement = name;

    var mem = C.addMemory(parentElement + "Collector");

    var page = "No data";


    C.set(mem, "dynamic", "variables", []);


    Collector.Instance = function () {
        return this;
    };

    Collector.Interaction = {

    }


    Collector.Instance.prototype = {



        addStatic: function (input, javascripted) {


            // get variables out of content, put them in cache as separate indicies, return page without variables but with default values
            input = whitespell.parseUrl(input);
            var result = retrieveVariables(input, javascripted, parentElement);
            //result = retrieveLists(result);
            C.set(mem, "static", parentElement, result);
            page = result;

        },

        getCurrentPage: function () {
            return page;
        }

    }


    return new Collector.Instance();

}


var retrieveVariables = function (input, javascripted, parentElement) {

    if (input.indexOf("<var") === -1) {
        return input;
    }

    /*
     We position the next variable in the full input string
     */

    var declarationStart = input.indexOf("<var");
    var declarationEnd = input.indexOf("</var>");
    var completeVar = input.substring(declarationStart, declarationEnd + "</var>".length);
    var parameterString = completeVar.substring(0, ((completeVar.indexOf(">") + ">".length)));

    var varName = getParameterFromString("name", parameterString, true);

    var uid = whitespell.d.generateUniqueId(varName);

    var elementName = varName + "-" + uid;

    var defaultValue = getParameterFromString("default", parameterString, true);

    if (uid === 0) {
        whitespell.d.declareVariable(varName);
        whitespell.d.pushVariable(varName, "defaultValue", parameterString);
        whitespell.d.pushVariable(varName, "update", getParameterFromString("update", parameterString, true));
        /* if (parameterString.indexOf("linkTo") !== -1) {
         whitespell.d.pushLinkedVariable(varName, getParameterFromString("linkTo", parameterString, true));
         }*/
        whitespell.d.pushVariable(varName, "template", getTemplateFromString(completeVar));
        if (javascripted) {
            whitespell.d.pushVariable(varName, "javascripted", parentElement);
        }
    }

    var currentOutput = "";

    if (whitespell.d.isset(varName)) {
        currentOutput += "<wsv id=\"" + elementName + "\">";
        var a = whitespell.d.getValues(varName);
        for (var single in a) {
            currentOutput += whitespell.d.fillTemplate(a[single], whitespell.d.getTemplate(varName))
        }
        currentOutput += "</wsv>";
    } else {
        currentOutput = "<wsv id=\"" + elementName + "\">" + defaultValue + "</wsv>";
    }

    whitespell.d.clearSubElements(varName, elementName);
    whitespell.d.addSubElement(varName, elementName);


    input = input.replace(completeVar, currentOutput);


    return retrieveVariables(input, javascripted, parentElement);
}
window.retrieveVariables = retrieveVariables;


var getParameterFromString = function (parameter, input, replaceQuotes) {

    if (input.indexOf(parameter) === -1) {
        return "";
    }

    if (replaceQuotes) {
        if (input.indexOf('"') !== -1) {
            input = input.replace(/"/g, "");
        }
    }

    input = input.substr(input.indexOf(parameter + "="));

    if (input.indexOf(' ') > 0) {
        input = input.substr(0, input.indexOf(' '));
    } else {
        input = input.substr(0, input.indexOf(">"));
    }

    input = input.replace(parameter + "=", "");
    window.getParameterFromString = getParameterFromString;

    return input;
}

var getTemplateFromString = function (input) {
    var input = input.substr(input.indexOf(">") + 1);
    window.getTemplateFromString = getTemplateFromString;
    return input.substr(0, input.indexOf("</var>"));
}


/**
 * Created by pimdewitte on 11/8/13.
 */

function Layout() {
    "use strict";

    var structure = [];

    var pageStructures = []


    Layout.Instance = function () {
        return this;
    }

    Layout.Instance.prototype = {

        setPageStructure: function (component, data) {
            pageStructures[component] = data;
        },

        toggleVisibility: function (el) {
            var displayCSSValue = null;
            if (el.style.display === undefined || el.style.display.display === null || el.style.display.length < 1) {
                var style = window.getComputedStyle(el);
                displayCSSValue = style.getPropertyValue('top');
            } else {
                displayCSSValue = el.style.display;
            }

            return el.style.display = (displayCSSValue.indexOf("none") !== -1 ? "block" : "none");
        },
        switchBetween: function (el, property, value1, value2) {
            var displayCSSValue = null;
            if (el.style[property] === undefined || el.style[property] === null || el.style[property].length < 1) {
                var style = window.getComputedStyle(el);
                displayCSSValue = style.getPropertyValue(property);
            } else {
                displayCSSValue = el.style[property];
            }

            return el.style[property] = (displayCSSValue.indexOf(value1) !== -1 ? value2 : value1);
        },

        updatePage: function (data, history) {

            var urlBuilder = "";
            for (var i in data.components) {
                if (urlBuilder.length === 0) {
                    urlBuilder += data.components[i] + ":" + data.updates[i];
                } else {
                    urlBuilder += "," + data.components[i] + ":" + data.updates[i];
                }

                var type = "update";

                if (data.components[i] === data.updates[i]) {
                    type = "main";
                }

                structure[data.components[i]].destruct();


                var comp = new Component(type, data.updates[i], data.components[i]);
                document.getElementById(data.components[i]).innerHTML = comp.update; //whitespell.parseUrl(whitespell.config.updates[fillInName].remote_html)
                structure[data.components[i]] = comp;
            }

            if (history) {
                whitespell.history.pushState(data, "", "#" + urlBuilder);
            }

        },

        deactivateComponent: function(name) {
            // delete from dom
            whitespell.config.components[name].active = false;
            document.getElementById(whitespell.config.components[name].position).removeChild(document.getElementById(name));
            structure[name].destruct();
            structure[name] = null;
        },
        activateComponent: function(name) {
            whitespell.config.components[name].active = true;
            this.loadComponent(name);
        },

        toggleComponent: function(name) {
            if(whitespell.config.components[name].active === true) {
                this.deactivateComponent(name);
            } else {
                this.activateComponent(name);
            }
        },


        loadComponent: function (name) {
            var comp = new Component("main", name, name);
            document.getElementById(whitespell.config.components[name].position).innerHTML += comp.update;
            structure[name] = comp;
        },

        initialize: function () {

            for (var compz in whitespell.config.components) {
                if(whitespell.config.components[compz].active === true) {
                    this.loadComponent(compz);
                }
            }


        },

        newElement: function (name, attributes, content, parent) {

            if (parent !== undefined) {

            }
        },

        addScriptsToDom: function (name, content, mainComponent) {


            if (content === undefined || content.length <= 0) {
                return;
            }


            var fileref = document.createElement('script');
            var generatedId = "script"+Math.random() * 1000; // todo real algorithm
            fileref.setAttribute("id",generatedId);
            fileref.setAttribute("defer", "true");

            fileref.setAttribute("type", "text/javascript");

            fileref.text = content;
            //fileref.innerHTML = content; // t

            if (typeof fileref !== "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
                if(structure[mainComponent] !== undefined && structure[mainComponent] !== null) {
                    structure[mainComponent].addRemovableChild("js", generatedId);
                }
            }


        },

        addStyleToDom: function (name, content, mainComponent) {


            if (content === undefined || content.length <= 0) {
                return;
            }



            var style = document.createElement('style');
            var generatedId = "style"+Math.random() * 1000; // todo real algorithm
            style.setAttribute("id",generatedId);
            style.type = 'text/css';

            if (style.styleSheet) {
                // IE
                style.styleSheet.cssText = content;
            } else {
                // Other browsers
                style.innerHTML = content;
            }


            if (typeof style !== "undefined") {
                document.getElementsByTagName("head")[0].appendChild(style);
                if(structure[mainComponent] !== undefined  && structure[mainComponent] !== null) {
                    structure[mainComponent].addRemovableChild("css", generatedId);
                }
            }


        },

        getUrl: function (page) {
            if (whitespell.config === null) {
                return "Config is null";
            } else if (whitespell.config.components[page] === undefined) {
                return "Page is not defined in config";
            }

            return whitespell.config.components[page].remote_html;
        },
        getId: function (page) {
            if (whitespell.config === null) {
                return "Config is null";
            } else if (whitespell.config.components[page] === undefined) {
                return "Page is not defined in config";
            }

            return whitespell.config.domain[page].id;
        },

        curlCast: function (target, curl) {
            this.displaySpinner(target, "#e8e8e8");
            curl();
        },

        displaySpinner: function (target, color) {

            if (color === undefined) {
                color = "#e8e8e8";
            }
            var opts = {
                lines: 13, // The number of lines to draw
                length: 7, // The length of each line
                width: 4, // The line thickness
                radius: 10, // The radius of the inner circle
                rotate: 0, // The rotation offset
                color: color, // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            };

            var spinner = new Spinner(opts).spin(target);
        }

    }

    function getUrl(page) {

        if (whitespell.config === null) {
            return "Config is null";
        } else if (whitespell.config.components[page] === undefined) {
            return "Page is not defined in config";
        }

        return whitespell.config.components[page].remote_html;
    }

    function getId(page) {

        if (whitespell.config === null) {
            return "Config is null";
        } else if (whitespell.config.components[page] === undefined) {
            return "Page is not defined in config";
        }

        return whitespell.config.components[page].id;
    }


    return new Layout.Instance();
}


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        whitespell.initialize();
        //this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        whitespell.initialize();
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
    }
};
/*

 Wilhelmus de Witte, 2013

 */

function Component(updateType, componentName, mainComponent) {

    "use strict"



    var url = updateType === "update" ? (whitespell.config.components[mainComponent].updates[componentName].remote_html[deviceType].src) : (whitespell.config.components[componentName].remote_html[deviceType].src);
    var incl_css = updateType === "update" ? (whitespell.config.components[mainComponent].updates[componentName].remote_css[deviceType].src) : (whitespell.config.components[componentName].remote_css[deviceType].src);
    var incl_js = updateType === "update" ? (whitespell.config.components[mainComponent].updates[componentName].remote_js[deviceType].src) : (whitespell.config.components[componentName].remote_js[deviceType].src);

    var constructedPage = false;
    var collects = {
        html_content: "",
        css_content: "",
        js_content: ""
    }

    var finishedJavascript = false;
    var finishedCSS = false;
    var finishedHTML = false;

    var childJavascript = [];
    var childCSS = [];

    var componentName = componentName; // has to be unique

    var incl_scripts = [];

    var checkStyle = updateType === "update" ? undefined : whitespell.config.components[componentName].defaultStyle;
    var defaultStyle =  checkStyle !== undefined ? checkStyle[deviceType] : "";

    var content = "<div id=\"" + componentName + "\" style=\""+defaultStyle+"\"></div>";

    var collector = new Collector(componentName);


    if (incl_js !== undefined) {
        var totalExpectedJS = incl_js.length;
        var receivedJS = 0;
        for (var i = 0; i < incl_js.length; i++) {
            whitespell.workers.assign("xmr", {
                task: "request",
                cacheResult: true,
                params: {
                    url: (incl_js[i]) // load from json later
                }
            }, function (data) {

                if (data.length <= 0) {
                    return;
                }
                collects.js_content += whitespell.parseUrl(data);
                receivedJS++;
                if(receivedJS === totalExpectedJS){
                    finishedJavascript = true;
                notifyReceival();

                }
            });
        }
    }
    if (incl_css !== undefined) {
        var totalExpectedCSS = incl_css.length;
        var receivedCSS = 0;
        for (var i = 0; i < incl_css.length; i++) {
            whitespell.workers.assign("xmr", {
                task: "request",
                cacheResult: true,
                params: {
                    url: (incl_css[i]) // load from json later
                }
            }, function (data) {

                if (data.length <= 0) {
                    return;
                }

                collects.css_content += whitespell.parseUrl(data);
                receivedCSS++;

                if(receivedCSS === totalExpectedCSS){
                    finishedCSS = true;
                    notifyReceival();

                }
            });
        }
    }
    whitespell.workers.assign("xmr", {
        task: "request",
        cacheResult: true,
        params: {
            url: url // load from json later
        }
    }, function (data) {

        collects.html_content += data;
        notifyReceival();

    }, { element: document.getElementById("navigation"), type: "spinner" });

    function notifyReceival() {
        if (collects.html_content.length > 0
            && finishedJavascript === true
            && finishedCSS === true
            ) {
            if (!constructedPage) {
                constructedPage = true;
                constructPage();
            }
        }
    }

    function constructPage() {


        var z = function (data, compName, mainComponent) {

            whitespell.layout.addStyleToDom(mainComponent, collects.css_content, mainComponent);

            var javascripted = (incl_js !== undefined);

            if (collects.js_content.indexOf("{{componentName}}") !== -1) {
                collects.js_content = collects.js_content.replace(new RegExp("{{componentName}}", 'g'), compName);
            }
            collector.addStatic(data, javascripted);
            document.getElementById(compName).innerHTML = collector.getCurrentPage();

            if (javascripted) {
                whitespell.layout.addScriptsToDom(mainComponent, collects.js_content, mainComponent);
            }
        };

        //whitespell.history.setOnPageLoad(componentName, collects.html_content, z);

        z(collects.html_content, componentName, mainComponent);
    }

    return {

        addRemovableChild: function(type, id) {

            if(type === "css") {
                childCSS.push((id))
            } else if(type === "js") {
                childJavascript.push(id);
            }
            console.log(childJavascript);
        },

        destruct: function() {

            for(var i in childJavascript) {
                document.getElementsByTagName("head")[0].removeChild(document.getElementById(childJavascript[i]));
                console.log("removed" + i);
            }

            for(var i in childCSS) {
                document.getElementsByTagName("head")[0].removeChild(document.getElementById(childCSS[i]));
                console.log("removed" + i);
            }
        },

        update: content
    };
}


