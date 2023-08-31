(function()  {
    let _shadowRoot;
    let _id;
    let _date;   

    let tmpl = document.createElement("template");
     tmpl.innerHTML = `
     <style>
     </style>
     <div id="ui5_content" name="ui5_content">
       <slot name="content"></slot>
     </div>

    <script id="oView" name="oView" type="sapui5/xmlview">
    <mvc:View
	    controllerName="myView.Template"
	    xmlns:mvc="sap.ui.core.mvc"
	    xmlns:l="sap.ui.layout"
        xmlns:m="sap.m"
	   >
       <Button id="idButton" press="onButtonPressed" text="Generate Insights"/>
    </mvc:View>
   </script>
     `;
 
     class DatePicker extends HTMLElement {
         constructor() {
            console.log('Inside Constructor');
             super(); 
             _shadowRoot = this.attachShadow({
                 mode: "open"
             });
             _shadowRoot.appendChild(tmpl.content.cloneNode(true));
             _shadowRoot.querySelector("#oView").id = _id + "_oView";
             this.addEventListener("click", event => {
                 console.log('click');
             });
         }

         onCustomWidgetAfterUpdate() {
            loadthis(this);  
        }
         
     }
    customElements.define("com-sap-sac-datepicker", DatePicker);

    // UTILS
    function loadthis(that) {
        var that_ = that;

        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function () {
            "use strict";

            //### Controller ###
            sap.ui.define([
                "jquery.sap.global",
                "sap/ui/core/mvc/Controller"
            ], function (jQuery, Controller) {
                "use strict";

                return Controller.extend("myView.Template", {
                    onButtonPressed: function (oEvent) {}
                });
            });

            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById(_id + "_oView")).html(),
            });
            oView.placeAt(content);
        });
    }
})();