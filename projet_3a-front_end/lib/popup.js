
// if the module has no dependencies, the above pattern can be simplified to

(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        // The name of namespace
        root.popUp = factory(root);
    }

}(this, function (root) {
    
    if(root) {

        //Create tag style in a HTML document
        var style = root.document.createElement("style");
        style.type= "text/css";

        //Create div in a HTML document
        var css = root.document.createTextNode("div {}");
        
        //Check if style.stylesheet object exist
        //If style.stylesheet exist the css is load
        //Else css element is created
        if(style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(css);
        }
    
        // get head tag to append style 
        root.document.getElementsByTagName("head")[0].appendChild(style);
    }

    /*
    *@returns {div}
    */
    var getMessageFunction = function(message) {
        // Check if the message variable is string
        //if is not string, Error is throw
        if (typeof message!=="string"){
            throw new Error("Message must be string");   
        }
        
        /*
        * Create a element of the popup.
        * Div is the contener
        * P is the contener of the text
        * Close is the close button.
        * buttonComfirm button to comfirm
        * buttonCancel button to canceled  
        */
        var div = root.document.createElement("div");
        var p = root.document.createElement("p");
        var aClose = root.document.createElement("a");
        var buttonConfirm = root.document.createElement("button");
        var buttonCancel = root.document.createElement("button");

        /*
        * Create text nodes
        * pText :add an text node with message
        * close : add a unicode char at this element
        * buttonText : Adding the text at element si dessus
        * buttonTextCancel : Adding the text at element si dessus
        */
        var pText = root.document.createTextNode(message);
        aClose.innerHTML = "&#x274c;"; // The cross html entity
        var buttonConfirmText = root.document.createTextNode("I visit");
        var buttonCancelText = root.document.createTextNode("Cancel");


        /*
        * Adding text nodes and different elements
        */
        p.appendChild(pText);
        buttonConfirm.appendChild(buttonConfirmText);
        buttonCancel.appendChild(buttonCancelText);
        
        /*
         * Adding a style on the div popup element
         */   
        div.appendChild(aClose);
        div.appendChild(p);
        div.appendChild(buttonConfirm);
        div.appendChild(buttonCancel);
        // put the PopUpStyle id on the  style tag
        div.setAttribute("id", "PopUpStyle");
        div.style.boxShadow = "0 75px 100px #black";
       
        
        /*
         *  Onclick event when click on X
         *  Remove the div with event
         */
        aClose.onclick = function () {
            var parent = aClose.parentNode;
            parent.style.left = "0%";
            buttonConfirm.style.background ="#C60800";
            buttonCancel.style.background ="#C60800";
            parent.style.background ="#C60800";
            parent.style.opacity = 0;
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };

        /*
        * Onclick envent when click on this element
        * Remove the div with event
        */
        buttonConfirm.onclick = function () {
            buttonConfirm.onclick = null;
            var parent = buttonConfirm.parentNode;
            buttonConfirm.style.background ="green";
            buttonCancel.style.background ="green";
            parent.style.background ="green";
            parent.style.opacity = 0;
            
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };

        /*
        * Onclick envent when click on this element
        * Remove the div with event
        */
        buttonCancel.onclick = function () {
            var parent = buttonCancel.parentNode;
            parent.style.left = "100%";
            buttonCancel.style.background ="yellow";
            buttonConfirm.style.background ="yellow";
            parent.style.background ="yellow";
            parent.style.opacity = 0;
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };
        // return div
        return div;
    };

    var getErrorMessage = function(message) {
        // Check if the message variable is string
        //if is not string, Error is throw
        if (typeof message!=="string"){
            throw new Error("Message must be string");   
        }
        
        /*
        * Create a element of the popup.
        * Div is the contener
        * P is the contener of the text
        * Close is the close button.
        * buttonComfirm button to comfirm
        * buttonCancel button to canceled  
        */
        var div = root.document.createElement("div");
        var p = root.document.createElement("p");
        var aClose = root.document.createElement("a");
        var buttonConfirm = root.document.createElement("button");
        //var buttonCancel = root.document.createElement("button");

        /*
        * Create text nodes
        * pText :add an text node with message
        * close : add a unicode char at this element
        * buttonText : Adding the text at element si dessus
        * buttonTextCancel : Adding the text at element si dessus
        */
        var pText = root.document.createTextNode(message);
        aClose.innerHTML = "&#x274c;"; // The cross html entity
        var buttonConfirmText = root.document.createTextNode("OK");
        //var buttonCancelText = root.document.createTextNode("Cancel");


        /*
        * Adding text nodes and different elements
        */
        p.appendChild(pText);
        buttonConfirm.appendChild(buttonConfirmText);
        //buttonCancel.appendChild(buttonCancelText);
        
        /*
         * Adding a style on the div popup element
         */   
        div.appendChild(aClose);
        div.appendChild(p);
        div.appendChild(buttonConfirm);
        //div.appendChild(buttonCancel);
        // put the PopUpStyle id on the  style tag
        div.setAttribute("id", "PopUpError");
        div.style.boxShadow = "0 75px 100px #black";
       
        
        /*
         *  Onclick event when click on X
         *  Remove the div with event
         */
        aClose.onclick = function () {
            var parent = aClose.parentNode;
            parent.style.left = "0%";
            buttonConfirm.style.background ="#C60800";
            //buttonCancel.style.background ="#C60800";
            parent.style.background ="#C60800";
            parent.style.opacity = 0;
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };

        /*
        * Onclick envent when click on this element
        * Remove the div with event
        */
        buttonConfirm.onclick = function () {
            buttonConfirm.onclick = null;
            var parent = buttonConfirm.parentNode;
            //buttonConfirm.style.background ="green";
            //buttonCancel.style.background ="green";
            parent.style.background ="green";
            parent.style.opacity = 0;
            
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };

        /*
        * Onclick envent when click on this element
        * Remove the div with event
        */
       /*
        buttonCancel.onclick = function () {
            var parent = buttonCancel.parentNode;
            parent.style.left = "100%";
            buttonCancel.style.background ="yellow";
            buttonConfirm.style.background ="yellow";
            parent.style.background ="yellow";
            parent.style.opacity = 0;
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };
        */
        // return div
        return div;
    };

    
    var getValidMessage = function(message) {
        // Check if the message variable is string
        //if is not string, Error is throw
        if (typeof message!=="string"){
            throw new Error("Message must be string");   
        }
        
        /*
        * Create a element of the popup.
        * Div is the contener
        * P is the contener of the text
        * Close is the close button.
        * buttonComfirm button to comfirm
        * buttonCancel button to canceled  
        */
        var div = root.document.createElement("div");
        var p = root.document.createElement("p");
        var aClose = root.document.createElement("a");
        var buttonConfirm = root.document.createElement("button");
        //var buttonCancel = root.document.createElement("button");

        /*
        * Create text nodes
        * pText :add an text node with message
        * close : add a unicode char at this element
        * buttonText : Adding the text at element si dessus
        * buttonTextCancel : Adding the text at element si dessus
        */
        var pText = root.document.createTextNode(message);
        aClose.innerHTML = "&#x274c;"; // The cross html entity
        var buttonConfirmText = root.document.createTextNode("OK");
        //var buttonCancelText = root.document.createTextNode("Cancel");


        /*
        * Adding text nodes and different elements
        */
        p.appendChild(pText);
        buttonConfirm.appendChild(buttonConfirmText);
        //buttonCancel.appendChild(buttonCancelText);
        
        /*
         * Adding a style on the div popup element
         */   
        div.appendChild(aClose);
        div.appendChild(p);
        div.appendChild(buttonConfirm);
        //div.appendChild(buttonCancel);
        // put the PopUpStyle id on the  style tag
        div.setAttribute("id", "popUpValid");
        div.setAttribute("data-choice", "")
        div.style.boxShadow = "0 75px 100px #black";
       
        
        /*
         *  Onclick event when click on X
         *  Remove the div with event
         */
        aClose.onclick = function () {
            var parent = aClose.parentNode;
            //parent.style.left = "0%";
            parent.style.top = "0%"
            buttonConfirm.style.background ="#C60800";
            //buttonCancel.style.background ="#C60800";
            parent.style.background ="#C60800";
            parent.style.opacity = 0;
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };

        /*
        * Onclick envent when click on this element
        * Remove the div with event
        */
        buttonConfirm.onclick = function () {
            buttonConfirm.onclick = null;
            var parent = buttonConfirm.parentNode;
            //buttonConfirm.style.background ="green";
            //buttonCancel.style.background ="green";
            // //8c9588  | green
            parent.style.background ="#8c9588";
            parent.style.opacity = 0;
            div.setAttribute("data-choice", "true")
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
            return "ok"
        };

        /*
        * Onclick envent when click on this element
        * Remove the div with event
        */
       /*
        buttonCancel.onclick = function () {
            var parent = buttonCancel.parentNode;
            parent.style.left = "100%";
            buttonCancel.style.background ="yellow";
            buttonConfirm.style.background ="yellow";
            parent.style.background ="yellow";
            parent.style.opacity = 0;
            window.setTimeout( function () {
                parent.parentNode.removeChild(parent);
            }, 1000);
        };
        */
        // return div
        return div;
    }

    var redPopUp = function(message) {
        if (typeof message!=="string"){
            throw new Error("Message must be string");   
        }
    
        var div = root.document.createElement("div");
        var h3 = root.document.createElement("h3");

        var h3Text = root.document.createTextNode(message);

        h3.appendChild(h3Text)
        div.appendChild(h3)

        div.setAttribute("id", "popupRed");
        div.style.boxShadow = "0 75px 100px #black";

        return div;

    }

    
    /*
     * log function on the HTML body
     * Check the instance.
     * @param {HTMLElement} messageFunction
     */
    var log = function(messageFunction) {
        // Check the instance, if the current function is already instanced, new error is throw
        if(!(messageFunction instanceof root.HTMLElement) || !root.document.body) {
            throw new Error("require a valid document and a body");
        }
        root.document.body.appendChild(messageFunction);
        messageFunction.clientHeight;
        messageFunction.style.left = "20%";
    };

    var logError = function(messageFunction) {
        // Check the instance, if the current function is already instanced, new error is throw
        if(!(messageFunction instanceof root.HTMLElement) || !root.document.body) {
            throw new Error("require a valid document and a body");
        }
        root.document.body.appendChild(messageFunction);
        messageFunction.clientHeight;
        //messageFunction.style.left = "20%";
        messageFunction.style.left = "75%";
        messageFunction.style.top = "80%";
    };

    var logValid = function(messageFunction) {
        // Check the instance, if the current function is already instanced, new error is throw
        if(!(messageFunction instanceof root.HTMLElement) || !root.document.body) {
            throw new Error("require a valid document and a body");
        }
        root.document.body.appendChild(messageFunction);
        messageFunction.clientHeight;
        //messageFunction.style.left = "20%";
        messageFunction.style.left = "75%";
        messageFunction.style.top = "25%";
    };

    /*
     * Return value
     * You can add other popup, add return value
     * @namespace popUp
     */
    return(function() {
        var self = {};

        self.init = function (window) {
            if (!window || !window.document) {
                throw new Error("popUp requires a window with a document");
            }
            root = window;
        };

        /**
         * popUpDisplay
         * 
         * @memberOf popUp
         * @param {String} message displayed message
         * @returns {Object}popUp module
         * 
         * @throws {Error} invalid argument exception
         */
        self.popUpDisplay = function (message) {
            var messageFunction = getMessageFunction(message);
            log(messageFunction);
        };

        self.popUpError = function (message) {
            var messageFunction = getErrorMessage(message);
            logError(messageFunction);
        };

        self.popUpValid = function (message) {
            var messageFunction = getValidMessage(message);
            logValid(messageFunction);
        };

    return self;

    })();      

}));
