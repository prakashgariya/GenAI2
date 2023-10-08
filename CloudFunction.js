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
        height:480px;
        margin-top: 2px !important;
    }
    </style>
    <div>
        <div class="insightsButton">
            <button class="button buttonWithGreen">Insights</button>
        </div>    
    <textarea id="textArea" name="textArea" class="textarea">click insights to get the latest insights provided by your Gen AI agent</textarea>
    </div>
    `;
    //.buttonWithGreen {
    //     border-right-style: solid;
    //     background-color: #9ddd58 !important;
    // }
    // .dropdown {
    //     position: relative;
    //     display: inline-block;
    //     width:50%;
    //     float:right;
    // }
    // .dropdown-content {
    //     display: none;
    //     position: absolute;
    //     background-color: #f1f1f1;
    //     width: 100%;
    //     box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    //     z-index: 1;
    //   }
    // .dropdown-content a {
    //     color: black;
    //     padding: 12px 16px;
    //     text-decoration: none;
    //     display: block;
    // }
    // .dropdown-content a:hover {background-color: #ddd;}
    // .dropdown:hover .dropdown-content {display: block;}
    // .dropdown:hover .button {background-color: #3e8e41;}
    // <div class="dropdown">
    //         <button class="button buttonWithBlue" id="idButtonInsightsType">Expanded</button>
    // </div>

    // <div class="dropdown-content">
    //     <a onclick="_onButtonClick('summary')">Concise</a>
    //     <a onclick="_onButtonClick('expanded')">Expanded</a>
    //</div>
    //<a onclick="_onButtonClick('season')">Seasonality</a>
    //Previous Code
    //Style
    // .button {
    //     background-color: #9ddd58 !important;
    //     border: none;
    //     color: white;
    //     padding: 15px 32px;
    //     text-align: center;
    //     text-decoration: none;
    //     display: inline-block;
    //     font-size: 16px;
    //     margin: 4px 2px;
    //     cursor: pointer;
    //     width:100%;
    // }
    // h2 {
    //     color: white;
    //     border-bottom-style: solid !important;
    //     margin-bottom: unset !important;
    //     margin-top: 0px !important;
    //     background-color: #9ddd58;
    //     border-bottom-color: #9ddd58;
    //     border-top-color: #9ddd58;
    //     height: 30px;
    // }
    // h2{
    //     color: #0088ff;
    //     border-bottom-style: solid !important;
    //     margin-bottom: unset !important;
    //     margin-top: 7px !important;
    // }
    // .img {
    //     display: block;
    //     margin-left: auto;
    //     margin-right: auto;
    //     margin-top: 100px !important;
    // }
    // .img:hover {
    //     transform: scale(0.9) !important;
    // }
    // .bulbIcon{
    //     background: url(https://prakashgariya.github.io/GenAI_Exp/Bulb_Trans.png);
    //     height: auto;
    //     width: auto;
    //     display: block;
    // }
    //HTML
    //<button class="button">Generate Insights</button>
    //<img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="200px" height="450px"/>
    //<h2><i class="bulbIcon"></i>&nbsp&nbsp&nbsp&nbspInsights</h2>
    //<img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="150px" height="175px"/>

    class CloudFunction extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            let buttonList = this._shadowRoot.querySelectorAll('button');
            for(let i in buttonList){
                if(typeof(buttonList[i]) == 'object'){
                    if(buttonList[i].innerText == 'Insights')
                        buttonList[i].addEventListener('click', this._onButtonClick.bind(this));
                    else if(buttonList[i].innerText == 'Expanded')
                        buttonList[i].addEventListener('click', this._onButtonClick.bind(this));
                        // buttonList[i].addEventListener('click', this._onButtonClickDropdown.bind(this));
                }    
            }

            // this._button.addEventListener('click', this._onButtonClick.bind(this));
            //  let aTagList = this._shadowRoot.querySelectorAll('a');
            //  for(let i in aTagList){
            //      if(typeof(aTagList[i]) == 'object')
            //         aTagList[i].addEventListener('click', this._onButtonClickDropdown.bind(this));
            //  }

            this._insightStatus = "";
            //this._image = this._shadowRoot.getElementById('image')
            //this._image.addEventListener('click', this._onButtonClick.bind(this));

            //this._shadowRoot.querySelector('textArea').hidden = true;
        }

        _onButtonClickDropdown(driver){
            if(driver.target.innerText == "Expanded"){
                
            }
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
            }else if(driver.target.innerText == "Insights"){
                summaryType = "General";
                // insightsButton.innerHTML = "Expanded";
            }
            var data = {"type":summaryType};
            // let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNmJ2SFl2M1RuMjVaMmRFWWdBM1FZZyIsIm5iZiI6MTY5NTAzODQxMywiaWF0IjoxNjk1MDM4NzEzLCJleHAiOjE2OTUwNDIzMTMsImp0aSI6ImVmYjg4ZDQxMmY5M2Q2ZmFkNjk2MjMyNzYwNDI2MTk5NmU2Yzg3ZTIifQ.AH2JD9Gm4GglWfqXonLhj3PFzxD9RxpOpUHr-v9qsGhtX-mOvfleFAt65Xd4-yb-6p6LdjnvAcONEMcm-8_jc8H0xecOZ5lkHtA4hspYn1T58GreFFWP9zcZBl3fecoFPeuZVzo0--OyrjFYS9NYhlSjpi36RkerR3UpN5dW6UFEbL-BDt5-BXbqpChdL07aoOiweElY9bAfujJXizrZiXLiL0J86QNVo4EFTZQe3VpE3JxNXfk7qAYjhw1hOohOQexr0FivnJAl46WIsdZyyBvBmiXIsdmiPQwoCjMrUUlWj5HcvwQRnAn7CfF3FuUsmUKslr6j0SA3_0GbJmWqCA";
            var textArea = this.shadowRoot.getElementById('textArea');
            textArea.value = "Fetching Insights from Open AI LLM......";
            this._insightStatus = "Requested";
            //var image = this.shadowRoot.getElementById('image');
            //image.hidden = true;
            // this._shadowRoot.querySelector(".img").style.display = "None";
            //image.style.display = "None";
            //textArea.hidden = false;

            //Typewriter display via JS code
            var i=0, txt = "",speed = 50, that = this;
            jQuery.ajax({
                // url: "https://us-central1-us-gcp-ame-con-e74c9-sbx-1.cloudfunctions.net/GCF_Gen_Analytics_trigger",
                url: "https://generateinsights-nice-gecko-rw.cfapps.us10.hana.ondemand.com/",
                type: "GET",
                crossDomain: true,
                data: data,
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader('Authorization', 'Bearer ' + sToken);
                // },
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

    customElements.define('sac-cloudfunction', CloudFunction);
})();