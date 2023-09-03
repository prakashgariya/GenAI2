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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NDQ4NTI2NjMzNzY4Nzc5ODMyIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS12aWtpc2hvcmVAZGVsb2l0dGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ3b1h5RTJ1VFVIRlJoZ1pPaUtRbjBnIiwibmJmIjoxNjkzNzU4NTI0LCJpYXQiOjE2OTM3NTg4MjQsImV4cCI6MTY5Mzc2MjQyNCwianRpIjoiN2ZmZGQyMjViOTQ0NzkzY2UwZWY3NzE5NjU3N2EzM2I2Yzg1N2MzYSJ9.FmIVLpOq7tKbwOZczq46nNPtsA-8xtFXQYqMRN9AzezXWBhcc_rm7yokCuFnPzuYNYQElt3Mejzxz21zRKK2KaBT0FMZG4h_mOwb3Oyas-FroZUsdpAOntZeluUNucNLcjrmbnwHjhE4_saofaebZk_nLCS5mDyaNosf-Lv9zIN4Rspy1TKCYrGFtpcLxcVS2l8hIJI7UZqgtr4em-uRcEy_siXaHZGp_NCSX2VzgT0XyI2l6OqdrKEp4C_AG63Tvy2E_F9-AWq1_1NibsxlDl8RNkrsg4ibpVf_Yx--gGafCsezuyYc5Wu3T58UfTAe86-b1m20b_3_b4LUgFGozg";
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
