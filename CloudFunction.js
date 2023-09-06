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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSzdmX1lWbkVaRldFZUIta1hwWllNZyIsIm5iZiI6MTY5NDAwMTU3NiwiaWF0IjoxNjk0MDAxODc2LCJleHAiOjE2OTQwMDU0NzYsImp0aSI6ImEyYzZmMDFkZmI2M2NlYjYyNjVhYzZlMmIzMzc5MWViMTU4MGVmYTcifQ.FeMWIm-641nUtwQFvbOzoj7N4wVg6WCUb9yxggZv1NLpYtytGan_5RmG4Df9lYT_-cvzzOLP8_xdaEan8YIzAsN6nUmdXPk6_ZZxc8VHFId0km7tFz-arvfJLu6v-UwYeS-wmqxrol9-T7dhzSK8Lk27zv-zlWIoAPyREjSC3nve45sgKxgWkHzUzNJFF_T0tRo271owC19hrIH5D8LnY1rYjcyCZJWdUZeLrh5IUdHX4zYvgPFKJ7AbpKnSWcBpCHoQiWa4c9ulsvgnSqkeqsBqITMS1MAclr8Ak6bLxc8rc9L5M5OGAgerg0CbQCkH7gmTXRdZNR5WPbkrdm273w";
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