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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NDQ4NTI2NjMzNzY4Nzc5ODMyIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS12aWtpc2hvcmVAZGVsb2l0dGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJKdy1IRzJaaGVmbTJzeEwxT0RjNGdnIiwibmJmIjoxNjkzNzI0MzgyLCJpYXQiOjE2OTM3MjQ2ODIsImV4cCI6MTY5MzcyODI4MiwianRpIjoiNjVlNmU2NTU1M2NhMDZkMGY1NjhjMjBhYTkzYzQ1NGVlMjlmMDBjOCJ9.HV0ODJHz7eLwDOBHc9mn9GBDggGU3yb-fHnTOE3u1l4qPYK3LGzfQbt4U0Mv1yppCSNE9dvJHZUw3yGizhg99G-6a9xNVQA-qdQTgdpga0AIaPdhoi-PZtXPgw7bpfhS5pxoWmRotIfzp5pzc8f9MPaQfe0WnNL0h5dBCsy7hTQQw6-AiTzqaLHv7Et5RIUpgUAX6ebhnum6dye1qAHv7SrBYgd7DsqytKcRJtGvRTwJnedS8TUylPyTjOsqN0vziT7Um08dtXPSwt7d_JwkDlg-EY4CHZ0wF4xwa1h2gPoCUFPis5AJksTcch3bXOvHLZmWnZFbH2OJIKF_E0JemA";
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