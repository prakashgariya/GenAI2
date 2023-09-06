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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDEyNTgwNjczNDIzNTc1MTU3IiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1rYmh1c2hhbkBkZWxvaXR0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkF5RVNIWjdiempRYWFoTXE4OHhzQ3ciLCJuYmYiOjE2OTQwMDY0NjAsImlhdCI6MTY5NDAwNjc2MCwiZXhwIjoxNjk0MDEwMzYwLCJqdGkiOiI4NWU4M2FmNDgxNjkwNmE3ODI2ZjVkMjc5OTMyM2FmYzU4ZTUxN2VlIn0.BRrDVYQzGkxdyjzR1hFNmbi_-G1Ytxq-Ay0YV_4UPh_851dzDOlFXqtvZhxP38YnRG7lzReAfGg7mz7jWquxXGQzbex_vXImVn7YGZ7JCRfXHmwgV_DsAyB63rU2pvylfEklTkUaxfFL-VH-cO5mjd0n84G3p9xDYDzD7GBe2tphEpdlDS6NQqop_pwY5ZVMo2LnLS_Jz6q-nvDkjQd490fkFO2lpVNKaUeWoAA0GnbclK0bZAp6LOv9N_qQn44ZEGul9ibeSlN2_dMmlDhtgpV03qOtzamuCT5kHDmV844gV2FlDGHi44Cv2FINRtfdXaAyBh4Co9TWwu4YLPU5RQ";
            var textArea = this.shadowRoot.getElementById('textArea');
            textArea.value = "Fetching Insights....";
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
