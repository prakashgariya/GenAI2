(function () {
    let template = document.createElement("template");
    let _id;
    template.innerHTML = `
        <style>
        </style>
        <div id="ui5_content" name="ui5_content">
         <slot name="content"></slot>
        </div>
        <script id="oView" name="oView" type="sapui5/xmlview">
        <mvc:View
            controllerName="chatbot.Template"
            xmlns:mvc="sap.ui.core.mvc"
            xmlns:l="sap.ui.layout"
            xmlns:m="sap.m"
	    >
        <Button text="Hello" id="idButton" press="onButtonPress"></Button>
        </mvc:View>
        </script>
    `;

    class ChatBot extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            _id = createGuid();
            this._shadowRoot.querySelector("#oView").id = _id + "_oView";
            loadthis(this);
        }

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){}

        //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback() {}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function first
        onCustomWidgetBeforeUpdate(oChangedProperties) {}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
        onCustomWidgetAfterUpdate(oChangedProperties) {}

    }

    customElements.define('sac-chatbot', ChatBot);

    function loadthis(that){
        var that_ = that;
        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function () {
            "use strict";

            sap.ui.define([
                "jquery.sap.global",
                "sap/ui/core/mvc/Controller"
            ], function (jQuery, Controller) {
                "use strict";

                return Controller.extend("chatbot.Template", {
                    onButtonPress : function (oEvent) {
                        console.log("Button pressed");
                        alert("Button Pressed");
                    }
                });
            });

            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
            });
            oView.placeAt(content);
        });
    }

    function createGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0,
                v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})();