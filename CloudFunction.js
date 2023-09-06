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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSzh2QVVQSnhnV25mRURYUVNIOFd5QSIsIm5iZiI6MTY5Mzk4NDk0NiwiaWF0IjoxNjkzOTg1MjQ2LCJleHAiOjE2OTM5ODg4NDYsImp0aSI6ImMyOTk1ODI3ZTNlNDgxMzM4MTM2MzIzOTUyMmNmYWU0MzM3ZjY2YjEifQ.LohMTFfs6EPCI9Y8KTI5x1ZnBq_jpx11XgH55eVVFWhEsk-rt7IHUU4W30-MgCYgdTeaL0P6j4pRhxrX9yJ7wZONqGHVT-lISYOqeWkt0cyypDPElPbVP5eO1JeYba_7xyWzC5zDV_8gKhfo1WJjpsM0XqY5EjIlFLMKIiS8DQ5FSB64o4Qk-fHj6F7s6kRgRhfitWO7qn-TrunyJ8dMk9H8FxVLkk2Ws-6QmQ6U0kc8FTv_fTalgCBILwqdN8YPIErJyCMXj1nYqsGZ7i9Qt6sxh5UrRH3kBlcWfgHp3MS2Lk21t45kuTjfoQzQa8JPvdPQxhTrM8M6q5dM2zXXxA";
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
