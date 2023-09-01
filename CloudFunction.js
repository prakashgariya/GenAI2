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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NDQ4NTI2NjMzNzY4Nzc5ODMyIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS12aWtpc2hvcmVAZGVsb2l0dGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ0Mko0akpvTEhvNkhIdEZYOEd5UnNBIiwibmJmIjoxNjkzNTY2MTU3LCJpYXQiOjE2OTM1NjY0NTcsImV4cCI6MTY5MzU3MDA1NywianRpIjoiYTYyZjBjY2M1NjkxMDVmMzM1NmM1MzE2MWQ5YjJhODU2M2M4MDY5NCJ9.DJDPE6J14ZapUlIhYpXiaXUyPuQiOzGodV1vasQq6hPVeH4k35dT8o_UbPUzj7iWsH9-P5vSFB7Rjo7LpxP2-rySyNQc3ZSv9T5QxA4nEPrA4HidaFAqy0_wO_lx5GdCCDYBJIe2JnDO8wHLQJyU6vKNNzcd3nMCunuYr9nyTKn_QVhIEymvUnpa-ExfZNaQJ48FrDPRLtIuJ8TTaBHdGt7vEuHIyEuCWyT8cQwFV54AdIiPIaF1N9aV4gbiiPXLIjTFf44BSNDyGpy3hjpcPYb_DZp74RxcaNiEOvHwpaPZwfOHoaxZkUR4SBFEHSoZdPqHfa1RVfYRShbZKW_GSg";
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
