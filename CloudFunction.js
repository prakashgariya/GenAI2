(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    .button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        width:100%;
    }
    .textarea {
        width:100%;
        height:460px;
    }
    .img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    </style>
    <div>
    <button class="button">Generate Insights</button>
    <img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="200px" height="450px"/>
    <textarea id="textArea" name="textArea" class="textarea">click generate insights to get the latest insights provided by your Gen AI agent</textarea>
    </div>
    `;

    class CloudFunction extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            this._button = this._shadowRoot.querySelector('button');
            this._button.addEventListener('click', this._onButtonClick.bind(this));

            this._shadowRoot.querySelector('textArea').hidden = true;
        }

        _onButtonClick(event) {
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUHN1Qk1pTWtlU2hVdXhNWGhlZEo2ZyIsIm5iZiI6MTY5NDA4ODg1NywiaWF0IjoxNjk0MDg5MTU3LCJleHAiOjE2OTQwOTI3NTcsImp0aSI6IjBhMTZjYWZiNGZjMzdlYmIwOGMxZTA4YzFlYmMwZDY4NzliZjM1YTkifQ.ODZXV1VcJr2q9sf5ARKDPXO6sXB7_aM85U0CH0WxweoRpBkpq3k0te_d8MFWPvULGi40QNp7YN7UjWgF9MH6sa8ZniF47Is3eTfpCQFnOylWOLJvmoNupyS-OBwIjwlR8AmMUlKatoSzM2B-_Xt-lw8xrnPVRl3izwUEj_duERKVgw6SorHudjGCTUObj8unqnJFtEaGiqTHp_RcTRLbAl5d0iBBnt0gSj5sEI27fsLUaqZEsssdKFYyxPmhDpssXK0jXppvUq6wJm82WptB0hzziCifrA69ZdFRlmOhdBAkQLV6F9ti_tGHYnVxwsNfj8Ibt4xQfBnmw9mFMOivyw";
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