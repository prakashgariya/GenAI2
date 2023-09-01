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
    </style>
    <div>
    <button class="button">Generate Insights</button>
    <textarea id="textArea" name="textArea" rows="100" cols="50"></textarea>
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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZHFfMXVJamlIbWxQQnRVUGFWSDFrdyIsIm5iZiI6MTY5MzU1MTk2OSwiaWF0IjoxNjkzNTUyMjY5LCJleHAiOjE2OTM1NTU4NjksImp0aSI6ImJlN2ZiMTNiMmU4ZTFlNDg5OTAzZmI0ZTJkZmQzOTRjOTA2NjU1ODEifQ.iKo_bVjn5Y3rgVlWEyGlY83GrON8-lWja-CNfO7LTlMO2IPCcVfnTS671HAAXbjpebvXYkJKi7OPb8mYioHLwgymf-wDQ0TeW9NSjSpPkIdE9_AmW6oFxVnIgETV-lpDC7aolgKwL_1i9xmiE9thpkyNKGv7XE3pJc7sY9dPq3GucBvRjhlflCXeuqOHxi5lv7JuKfwDC4LhupFfDo2OwOlEHU2KzxZNJ7_Fc9VXEMYat689NdQKmKr6N2OWKG_nnnPXbRy_MAW6ZskFjhFUCeiGUxhcnnNbyS4kq0nbpgillTH-WY5BRuTP68wGW0KQc0QJWzdQ9IXM1Ntc_T7q1Q";
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
                    $("#textArea").val(err);
                },
                success: function (data, textStatus) {
                    console.log("Success");
                    $("#textArea").val(data);
                }
            });
        }
    }

    customElements.define('sac-cloudfunction', CloudFunction);
})();