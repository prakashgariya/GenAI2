(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    .button {
        background-color: #9ddd58 !important;
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        width:100%;
        height: 32px;
    }
    .textarea {
        width:100%;
        height:480px;
    }
    </style>
    <div>
    <button class="button">Insights</button>
    <textarea id="textArea" name="textArea" class="textarea">click insights button to get the latest insights provided by your Gen AI agent</textarea>
    </div>
    `;
//Previous Code
//Style
// .button {
//     background-color: #9ddd58 !important;
//     border: none;
//     color: white;
//     padding: 15px 32px;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 16px;
//     margin: 4px 2px;
//     cursor: pointer;
//     width:100%;
// }
// h2 {
//     color: white;
//     border-bottom-style: solid !important;
//     margin-bottom: unset !important;
//     margin-top: 0px !important;
//     background-color: #9ddd58;
//     border-bottom-color: #9ddd58;
//     border-top-color: #9ddd58;
//     height: 30px;
// }
// h2{
//     color: #0088ff;
//     border-bottom-style: solid !important;
//     margin-bottom: unset !important;
//     margin-top: 7px !important;
// }
// .img {
//     display: block;
//     margin-left: auto;
//     margin-right: auto;
//     margin-top: 100px !important;
// }
// .img:hover {
//     transform: scale(0.9) !important;
// }
// .bulbIcon{
//     background: url(https://prakashgariya.github.io/GenAI_Exp/Bulb_Trans.png);
//     height: auto;
//     width: auto;
//     display: block;
// }
//HTML
//<button class="button">Generate Insights</button>
//<img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="200px" height="450px"/>
//<h2><i class="bulbIcon"></i>&nbsp&nbsp&nbsp&nbspInsights</h2>
//<img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="150px" height="175px"/>

    class CloudFunction extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            this._button = this._shadowRoot.querySelector('button');
            this._button.addEventListener('click', this._onButtonClick.bind(this));
            //this._image = this._shadowRoot.getElementById('image')
            //this._image.addEventListener('click', this._onButtonClick.bind(this));

            //this._shadowRoot.querySelector('textArea').hidden = true;
        }

        _onButtonClick(event) {
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicHJDRUk5RWU1eUJ3VjIyd3g0MEcydyIsIm5iZiI6MTY5NDI1ODI3NywiaWF0IjoxNjk0MjU4NTc3LCJleHAiOjE2OTQyNjIxNzcsImp0aSI6Ijc5OGViODU0NDg5Y2UyNGZhOTZmN2Y3ODkxODc5YTlhMzY5Mjg2NmUifQ.WEdhHDmMcCiGwpR-sGIms8z7SD4ies0bkNonAnCA_yftRKIQ3THM3M-UL3njxcSrVi6Phl9j2grryNAWxR3xeAkXcI2ymbojPkwp4j1xFKGYrhVn_tGGsK90SXY9_bBbKSz2CQ_Z881KmBRsTMhEz4HHHdKN9n_j6e7gt9OSp4_hwB0Spq9RhKwpgtdund3niGBku0fkXRrqNw1Q3i15WLhf0daBOjIWBQtr-3ESpXU7pGVdJKZh_kU0BFoSPnwFICfNjuOzWgdc0Y6Z5nn6vfrUyc_NVhdy9zuYdlQE8Zqbpx3Vej6toCUo6o-UBusJLbM_1mYtMjO4EhC466hONw";
            var textArea = this.shadowRoot.getElementById('textArea');
            textArea.value = "Fetching Insights from Open AI LLM......";
            //var image = this.shadowRoot.getElementById('image');
            //image.hidden = true;
            // this._shadowRoot.querySelector(".img").style.display = "None";
            //image.style.display = "None";
            //textArea.hidden = false;
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