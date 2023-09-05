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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NDQ4NTI2NjMzNzY4Nzc5ODMyIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS12aWtpc2hvcmVAZGVsb2l0dGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJFLTk0RzNodndodHZ0VGZ6RjRhSzlRIiwibmJmIjoxNjkzOTE1ODc4LCJpYXQiOjE2OTM5MTYxNzgsImV4cCI6MTY5MzkxOTc3OCwianRpIjoiZjVlOGIzNTg1ZTNlMWM5MTYwYThlNzRhOTM4NzYzZDI5MWZiMzlkNiJ9.dbomgRB_YZLfvcumWTT_UGKtFKyXTZU3Y6MlPSIPwbY9Ah8bFwGkCb6gqNarcOC_NMfSuS6ug1UyQqUL9ZUWY_zE6l3DBOiI-C3pvNh6q2IL748wLCR-h4ET7A7hPZEG_UL0CzmIltg97d5KNtMTpvS0Pn5XDQGWISP4iw8matGIsGdZQBVMw5PsPkmODYzikAcP-rmb12P2u59cf3fFEYhjh7M-Qhq7JZ7MD3USb-Wy5HPq6FN-P9c-gb2A4pSCI43szX45mDx94wfBW43MbUezBPKKfgIPxFcZOsCzQ6GdzJe1ryVhDvn51XyndMEIrrlgOs6y2QF9Us87zFIW5Q";
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
