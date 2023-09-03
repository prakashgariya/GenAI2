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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3NDQ4NTI2NjMzNzY4Nzc5ODMyIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS12aWtpc2hvcmVAZGVsb2l0dGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJIaDJCcFJhMy1wdTNXbS15UVBHT0NnIiwibmJmIjoxNjkzNzM2OTk2LCJpYXQiOjE2OTM3MzcyOTYsImV4cCI6MTY5Mzc0MDg5NiwianRpIjoiODlmYzBhYzZlODdlZDg5MjI5OTliNTczYTRiNjgwMTI4NDQxNmNmMSJ9.KwIq9zyUfSH7sRUMOxkWlLUAIuekhV3F6CZB5DuSfTZSm9-EqZZyUgnziHnoqYLK3NgVOIo7VH1j2fNvbc6-TkO_ek6NPOboxzMT2QXlRsNEt8JbmyFP96jOkLjQltvDqOXxE8EXlviYNbZL0Q1okitl7otu0v0D2QcrVczI_NfGhl0mPEzs3yDa65ImTQ0RJzGIufksc368VSSszTYAhGko5va2LyabzxOutRXoQYT8Nm2vmIy6vBBrTjYIFH5K26B7HkIGvgzOllxNxDCf7dfM4hzQX5a_935942tE6pC-Vym_rLxUEjZ7P4qD8cRfQe_zrL7iSHlr-HlEDR57vw";
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