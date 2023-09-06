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
    .img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    </style>
    <div>
    <button class="button">Generate Insights</button>
    <img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="200px" height="450px"/>
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

            this._shadowRoot.querySelector('textArea').hidden = true;
        }

        _onButtonClick(event) {
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiR1ZOaGtfdHU2WlR0Z2d3UXZhaW9NdyIsIm5iZiI6MTY5NDAxMjI5OCwiaWF0IjoxNjk0MDEyNTk4LCJleHAiOjE2OTQwMTYxOTgsImp0aSI6IjE1MTA2YTEyMzFiNjdkNjBkOTU3MDJmMjQzOThmOWIzMjIzNGJmM2IifQ.hlz_580xfRtAcTFWjxEqp9qJ5eNHAyHbrAVjXEMKVwcYWmTKpRE6MastuvXOEk6IDfrRdN-v3IVSvCUeEdJq0k5RUxlveb6QRk9JDBOGl0W8uw5L8CjrTkoZAF6ozl3HA_mHwTaXyTshf7lxQMGgE2VnZYP0Z1vg4Kt4BeuW_OghvS_HOCk7-Od3tPnpa9MVuHhcYCrzF8qdimklTvJmpJ2KFGaGle3z2C939iqa9MwlNkDdLSwK7kyYX2C5cqPxNrwyALOXKXOyzuswHSrwE0AXSopv2bsC8mzADsFf0-o6pXG9DoWGE4Z4FxyvQ5NurhNrZQOj-ELt7U-qo014Bw";
            var textArea = this.shadowRoot.getElementById('textArea');
            textArea.value = "Fetching Insights....";
            var image = this.shadowRoot.getElementById('image');
            image.hidden = true;
            // this._shadowRoot.querySelector(".img").style.display = "None";
            image.style.display = "None";
            textArea.hidden = false;
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