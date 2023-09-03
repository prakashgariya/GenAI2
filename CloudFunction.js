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
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZUxBWWx5bzI4SURUM0NDdU1NR3kwQSIsIm5iZiI6MTY5Mzc1MzUxOSwiaWF0IjoxNjkzNzUzODE5LCJleHAiOjE2OTM3NTc0MTksImp0aSI6IjAyY2FlMWUzMDNjMjQyM2Q5MTIxNjZjNDhjOTc5YTQxZDI0MzkxZDIifQ.nPpt4ZepRJzp7CcwetJcCXRn6AU707PWFVhhDVova_Vra8Bu4WzR8z0lWA7E_WHmprbOs6P3l4Eca12Kpni18QsklnZJPaB1nXieK-zCPUAil5za3xrZn0vWATueStMBsG7bLR8oDn8vfcPHDyUdyFTv4XKPYRHVSB597e80Y_STHGIohrU11qE9LbLD2hF_FXXQwLFhutX3FNh4wWaFTO0dBjENnSetGPzGfVlboAd54lSVm4_GVZn6WDtRvCqfnxOPEKT2li6osZD7wUQ6GchA6typ5tdwoe7rDjwk6mR6LPfZeG1fx2KRTMBT0Qab4UC4aqM0tEMH40hKSLclOA";
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