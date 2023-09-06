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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTTZFODA1SHNpY2s3MWttMXdBc3h2QSIsIm5iZiI6MTY5Mzk4MDM3NiwiaWF0IjoxNjkzOTgwNjc2LCJleHAiOjE2OTM5ODQyNzYsImp0aSI6IjgzM2YyNzhmZTlhNzNjODAwZmNkMjAxZDUyYmU2YmJkMTE0OTQ5NmYifQ.aJ5QAlnjYgWHZgSb8D0mPwbaFcSdPz3KuyNtcQDAcHO4smdXqltOBPmyqtictHbGOXHctyxmmUuY5-Icfa8ELJ3AjWjIU8F15Pe0sa1RHCe_nKU95MmHRYkqYqE1o4nA-IvkyD2PtZBIg5CTqMeFp_KvoyPctZkuV1NwT9xRn9v8HnsmyITHwSA2DZ0LJ84U311fwBMaro-1oD1nE3uDxRS4V4l7hq7_zJfQmbO7MFWR1k7Ks-gNMf221yDu4E1s_EzUBbMglgxr3weocVLKA23hN2_uoeagq58BbaETO55PBmF_9JNUaj8dIMCAC3XxTNDESp_mKLBcE3iJwO9J6w";
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
