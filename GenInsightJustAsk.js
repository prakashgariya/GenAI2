(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    .insightsButton{
        display: inline-block;
        width:100%;
    }
    .buttonWithBlue {
        background-color: rgb(0, 151, 169) !important;
    }
    .buttonWithBlue:hover {
        background-color: #9ddd58 !important;
    }
    .buttonWithGreen {
        background-color: #9ddd58 !important;
    }
    .buttonWithGreen:hover {
        background-color: rgb(0, 151, 169) !important;
    }
    .button {
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 18px;
        cursor: pointer;
        width:100%;
        height: 32px;
    }
    .textarea {
        width:100%;
        height:684px;
        margin-top: 2px !important;
    }
    </style>        
    <div>
        <div class="insightsButton">
            <button class="button buttonWithGreen">Generate Insights</button>
        </div>    
    <textarea id="textArea" name="textArea" class="textarea">click generate insights to get the latest insights provided by your Gen AI agent</textarea>
    </div>
    `;

    class InsightsJustAsk extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            let buttonList = this._shadowRoot.querySelectorAll('button');
            for(let i in buttonList){
                if(typeof(buttonList[i]) == 'object'){
                    if(buttonList[i].innerText == 'Generate Insights')
                        buttonList[i].addEventListener('click', this._onButtonClick.bind(this));
                }
            }

            this._insightStatus = "";
        }
        _onButtonClick(driver) {
            console.log(driver)
            var summaryType = "";
            var insightsButton = this.shadowRoot.getElementById('idButtonInsightsType');
            if(driver.target.innerText == "Expanded"){
                summaryType = "Expanded";
                insightsButton.innerHTML = "Concise";
            }else if(driver.target.innerText == "Concise"){
                summaryType = "Concise";
                insightsButton.innerHTML = "Expanded";
            }else if(driver.target.innerText == "Generate Insights"){
                summaryType = "JustAsk";
            }
            var data = {"type":summaryType};
            var textArea = this.shadowRoot.getElementById('textArea');
            textArea.value = "Fetching Insights from Open AI LLM......";
            this._insightStatus = "Requested";
            var i=0, txt = "",speed = 50, that = this;
            jQuery.ajax({
                url: "https://generateinsights-nice-gecko-rw.cfapps.us10.hana.ondemand.com/",
                type: "GET",
                crossDomain: true,
                data: data,
                crossDomain: true,
                error: function (err) {
                    console.log("Error");
                    textArea.value = err.responseText;
                },
                success: function (data, textStatus) {
                    console.log("Success");
                    textArea.value = "";
                    txt = data;
                    that._insightStatus = "Received";
                    _setTypeWriterEffect();
                    function _setTypeWriterEffect(){
                        if(that._insightStatus == "Requested"){
                            textArea.value = "Fetching Insights from Open AI LLM......";
                        }
                        else if(i < txt.length && that._insightStatus == "Received"){
                            textArea.value += txt.charAt(i);
                            i++;
                            setTimeout(_setTypeWriterEffect, speed);
                        }
                    }
                }
            });
        }
    }

    customElements.define('sac-insightjustask', InsightsJustAsk);
})();