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
        height:514px;
    }
    </style>
    <div>
    <button class="button">Generate Insights</button>
    <textarea id="textArea" name="textArea" class="textarea">Generated Insights will show up here</textarea>
    </div>
    `;

    class CloudFunction extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            this._button = this._shadowRoot.querySelector('button');
            this._button.addEventListener('click', this._onButtonClick.bind(this));

        }

        _onButtonClick(event) {
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidDRubUZySG8zNDB3T2FUZ2lQSm1XQSIsIm5iZiI6MTY5Mzk4ODM4NSwiaWF0IjoxNjkzOTg4Njg1LCJleHAiOjE2OTM5OTIyODUsImp0aSI6IjEyNDJiMzM5ZmI4OTYzYzM0ZTNjMmY1OTk4ZTY3ZjUzNTM0MzhmYzQifQ.ascshpGsxAIR6vM0nnENWfDUXaGagaFF1f2nqGGPinLJM6IpYMjJtZJD144f6YV5FP7YbN4e4wFOgAU6Hdha9CwVx2dtonZpI9Mdry617OmeP6VdPmL95nfgKGZFZXGUL5K4huW60kb7GX8BqIT8oD05ydGWfmpgboLNc1bZTJSRhtIjQabw_bjQjRks535OqISIOlrI6pEDLVfYgIuNlWJ9A24IS9A9JkAhvba92bA0VS0LGAYeholvNN0BdYNfNUop3S3Dqh9-ugretFnLSa4qDzhCQqWKB6kga6RANV9rT_S3GPZBbQhKlj1SgPL02rUmsilQpWaT_iOv_mWgbw";
            var textArea = this.shadowRoot.getElementById('textArea');
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
