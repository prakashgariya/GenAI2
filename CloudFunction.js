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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDEyNTgwNjczNDIzNTc1MTU3IiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1rYmh1c2hhbkBkZWxvaXR0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkcycnNxaUdDdlYzU3hqclNaZDZWQXciLCJuYmYiOjE2OTM3OTA4NzcsImlhdCI6MTY5Mzc5MTE3NywiZXhwIjoxNjkzNzk0Nzc3LCJqdGkiOiI1YzZhNDkzYzJjM2UwMzk0MTM1OTIyNTc4MWIzZThlMzc1NmQ2NWRmIn0.SgdcbfaOFhenfi_yRy8Cd4g1bGe5p6WX0GJpmDY1cgPi-Psn_N_1V2DslxKlNiiu9IGe0vLhYb5cKwSn2K9c-_yFrRBsCMiJCctJkrhqCkgrN8myYXXM6ER7TWhJWG-WVqhf6TJ4Qt-fL-1dh9G51C2FavRKRsJVsDZGYKQNWIBxXtVrWLO8FQF2YwhB_jiK7FcQRXi1mLVCOB8xsVffwd5XY0KiuA20DnKYyQligxNjTH01AHWdoshMZ4jf7_O5aDzbO06yXqFecAvsQwoVqzMYyktyc28AwAf_SVsEk9fnJAaLW9FMn-Tah7FEswlfhEM8paSuSEHdYbtz2XXrKQ";
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
