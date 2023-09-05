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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDEyNTgwNjczNDIzNTc1MTU3IiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1rYmh1c2hhbkBkZWxvaXR0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkswVUxTLVNaMVpQblFXOGxjWDh5d0EiLCJuYmYiOjE2OTM5MzEwMTYsImlhdCI6MTY5MzkzMTMxNiwiZXhwIjoxNjkzOTM0OTE2LCJqdGkiOiIxODBhYThhMDI1NjZiZGUwZTNiN2RhNTc2YTFhN2U3ZDMzNDlmMTg2In0.DfiXkco3tX-zobfL72K-BdvcxXDhCjeeMpv52nNNt9DBz1jx9cdjiH5I_TLim94oVngIGoTsGqOsDWwm1r-8ZLI0CBTAIoZJ0lRdfsoFkhzR_Y8sMt2jR_Jw7Anrodqe_AZD7nMhmFuxQALqCIZ-yQobSnltd-VYp7vtg6rB5ObtldTJxexuxb8BkEKFK4cGQT4cOeCJHyzcAyq3jSsBvMYLxQnWbcXnDvXnf-ymKaWAHfb9quGMBXBrAfN-q_T_7txwzcIuvMh5uCbqyM_sQziujUbYPukZcOwA6zxF0aYfjwMDAznOGLXGGEt2NUiY6ARi2qb862r-JzutpKZU4Q";
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
