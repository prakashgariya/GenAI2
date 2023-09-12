(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    .button {
        background-color: #9ddd58 !important;
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
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
    <button class="button">Generate Insights</button>
    <textarea id="textArea" name="textArea" class="textarea">click generate insights to get the latest insights provided by your Gen AI agent</textarea>
    </div>
    `;
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

            this._button = this._shadowRoot.querySelector('button');
            this._button.addEventListener('click', this._onButtonClick.bind(this));
            //this._image = this._shadowRoot.getElementById('image')
            //this._image.addEventListener('click', this._onButtonClick.bind(this));

            //this._shadowRoot.querySelector('textArea').hidden = true;
        }

        _onButtonClick(event) {
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVmZ0RDJBYmxZZFdNS1ZxRzZpYzAzdyIsIm5iZiI6MTY5NDUwNzU1OCwiaWF0IjoxNjk0NTA3ODU4LCJleHAiOjE2OTQ1MTE0NTgsImp0aSI6IjQ1NmNlMDliNDgzMzQxZGVjMWE0YTA1NjdkNmI0NWY5NzUzNjk1NDYifQ.IAxPDcxuGF51mVJyrS7PBXok4L9Kq4NPdAPnLtZwvvTAtN-8K8F-7nECRhUmYrA0_3y10R8U7ohkAhTy391mJaWVTP0MBM-U5AzlYkV8xOs5JmHy65ljfOfaAG5fXbleAyT4h2YVWW9w5-kHknqfdWYCt0VYvH9iFU6MnIKLqq8f0ZbknTWMufBbASNe9LSPnV_YbLgqVkNpTuoI6_OmUtoMgtVwNzEa02LPJgWoOSs88pgFcfhy_km4pQAMrBRUOP5B5IAegED11sNEMWGutfjrjPaIecHhB4XWOK5ijr61X22mR28zec3B-z0mT5Gd36zDZeLbcyc6r6_6DMIXT";
            var textArea = this.shadowRoot.getElementById('textArea');
            textArea.value = "Fetching Insights from Open AI LLM......";
            //var image = this.shadowRoot.getElementById('image');
            //image.hidden = true;
            // this._shadowRoot.querySelector(".img").style.display = "None";
            //image.style.display = "None";
            //textArea.hidden = false;
            jQuery.ajax({
                url: "https://us-central1-us-gcp-ame-con-e74c9-sbx-1.cloudfunctions.net/GCF_Gen_Analytics_trigger",
                type: "GET",
                crossDomain: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + sToken);
                },
                crossDomain: true,
                error: function (err) {
                    console.log("Error");
                    textArea.value = err.responseText;
                },
                success: function (data, textStatus) {
                    console.log("Success");
                    textArea.value = data;
                }
            });
        }
    }

    customElements.define('sac-cloudfunction', CloudFunction);
})();