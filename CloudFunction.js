(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    .textarea {
        width:100%;
        height:480px;
    }
    .img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px !important;
    }
    .img:hover {
        transform: scale(0.9) !important;
    }
    .bulbIcon{
        background: url(https://prakashgariya.github.io/GenAI_Exp/Bulb_Trans.png);
        height: auto;
        width: auto;
        display: block;
    }
    </style>
    <div>
    <img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="150px" height="175px"/>
    <textarea id="textArea" name="textArea" class="textarea">click generate insights to get the latest insights provided by your Gen AI agent</textarea>
    </div>
    `;
//Previous Code
//Style
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
// .button {
//     background-color: #4CAF50;
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
//HTML
//<button class="button">Generate Insights</button>
//<img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="200px" height="450px"/>
//<h2><i class="bulbIcon"></i>&nbsp&nbsp&nbsp&nbspInsights</h2>

    class CloudFunction extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            //this._button = this._shadowRoot.querySelector('button');
            //this._button.addEventListener('click', this._onButtonClick.bind(this));
            this._image = this._shadowRoot.getElementById('image')
            this._image.addEventListener('click', this._onButtonClick.bind(this));

            this._shadowRoot.querySelector('textArea').hidden = true;
        }

        _onButtonClick(event) {
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiS1ltbzBhZFpWWTF3LWJUYTJ5YnhIQSIsIm5iZiI6MTY5NDE3ODc3MCwiaWF0IjoxNjk0MTc5MDcwLCJleHAiOjE2OTQxODI2NzAsImp0aSI6ImIwZmM4ZTE3ZjU1OGIxMTNkYzhhMzE1ZWViZGI2Y2E2ZjI1ZjYzNmQifQ.aLtl_oc9MesYIUNCJHVqDdxne7_RkaV0nudNVrYM5ngave63b4DoHKCmg3maFgHmYnKR1ZksbtyCSCK_vb1_ejJxG2tEnfLHEJdHhBghSJwMWIgudRe8-Wn6XeQek9N89jlNIERblEe_yMaF0VAzrrSk6DdWVJAke6PNSuppF-ISqYE5hY2ow7VLCN7ApHnrbF9_BWFjpnybJabsixLl4Jb8B9mR4-tsBox0tYgd9m4jbrnLpoux34n78ypbiQY6A0nfNkeehxEJsLKSURwWmIfPYPAm70JGG3WtlL5_s9B8mrql8hzUV8dzqtRVwPc1A3qsczxvzAwBwqdIrI5JKg";
            var textArea = this.shadowRoot.getElementById('textArea');
            textArea.value = "Fetching Insights from Open AI LLM......";
            var image = this.shadowRoot.getElementById('image');
            image.hidden = true;
            // this._shadowRoot.querySelector(".img").style.display = "None";
            image.style.display = "None";
            textArea.hidden = false;
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