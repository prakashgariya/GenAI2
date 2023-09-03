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
        height:100%;
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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDEyNTgwNjczNDIzNTc1MTU3IiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1rYmh1c2hhbkBkZWxvaXR0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Inp6NGFtT0N0VmQ1X3FNVDljT1dVNXciLCJuYmYiOjE2OTM3NTE3NjcsImlhdCI6MTY5Mzc1MjA2NywiZXhwIjoxNjkzNzU1NjY3LCJqdGkiOiJiMjM4YTE3MTY4MTQ4YTViNzEzNzVlNTliYTc3Y2NiMDQ0ODE2MzNjIn0.fI11VyRK9aEppME9z_0NWwWkX1bTTdVAQZ_-Yr8UwKLp5KEivWlTSIxehI--7nveDWe--dRxiKXZZW7_M2bFlc_1PVzpGfOr3JG3pfKEckEluhgEFKZuUlSxIybOFG-tTRO6dEfJJosv0PkrAnuZVVAhJb5rR--VZ6THoIQZQkxAmFheppKvAkT61C9UWb6unxoRWcm3_VjqCABC39rZbGRyNMrJwcTwJHaqtLH1iNZB3dSEI6gO1-gxpHAedOmXzHye3L7dQAVRVZQhme3atxwoUc-BaI8olssLR0GgUQFUBD6E6NLrxrkhuPRyTLF1fjm3-ufLlFJw_4YO_oV0jw";
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
