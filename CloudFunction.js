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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSzRNLTY5M29qUTVIQkVJWnEzS00wUSIsIm5iZiI6MTY5MzQ5NTU4NywiaWF0IjoxNjkzNDk1ODg3LCJleHAiOjE2OTM0OTk0ODcsImp0aSI6Ijc3MTM4MTQ3NjAyZTdjZDU2MTc4ZTZhMDMxYWE1NTJjZWExZTQ3ODcifQ.i8LRV_c4KCFrwauRtiBXraw5KJp6_CSlail6RDLcWjx6r7WpVqWMrVqOt8hYWX7nRAhBNTgYWaXLxo1TEqIZ-BRXzbe9YXaT2b31kBWc2wBKh6BAsxRZIiimRgBjDYWBRZgJG-lUkyPUSNsUQxIBiZ62MBehcWG9M3Yjb5VGdgA-RJLYOQZ49YbrEqNWjP6bDA9QzoexpQNHq4oONlFG4hd8C9mX0ueWEUh0V0LfxfPfrqt3sC33UW09T7sGpQz__A9mriEjxPyTaThoc5nmsnkvO_oOToQsJAoyYvKzXEQuLgVK3uQYiEgGneMjhbOdu1Pq5CLWQiaF4hAQwAAsrw";
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
                },
                success: function () {
                    console.log("Success");
                }
            });
        }
    }

    customElements.define('sac-cloudfunction', CloudFunction);
})();