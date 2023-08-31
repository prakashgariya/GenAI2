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
	    controllerName="sap.m.sample.DatePicker.Group"
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
 
         //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
         connectedCallback() {
             loadthis(this);  
         }

         onCustomWidgetAfterUpdate(oChangedProperties) {
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

                return Controller.extend("sap.m.sample.DatePicker.Group", {
                    onButtonPressed: function (oEvent) {

                        this.settings = {};
                        this.settings.date = "";

                        const sToken = "Dummy";
                        jQuery.ajax({
                            url: "https://us-central1-us-gcp-ame-con-e74c9-sbx-1.cloudfunctions.net/GCF_Gen_Analytics_trigger",
                            type: "GET",
                            crossDomain: true,
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader('Authorization', 'Bearer ' + sToken );
                            },
                            crossDomain: true,
                            error: function (err) {
                                console.log("Error");
                            },
                            success: function () {
                                console.log("Success");
                            }
                        });
                        
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
})();