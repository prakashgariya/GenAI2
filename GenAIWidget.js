(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
    </style>
    <div id="debugging-area" style="display: none;">
          <h2>Debugging Mode</h2>
          <button id="getAccessToken">Get Access Token</button>
          <h3>Messages</h3>
    </div>
    `;

    class GenAIwidget extends HTMLElement {
        constructor() {
            super();
            console.log('Constructor called');
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            // Load Script
            const GenAIScript = document.createElement('script');
            GenAIScript.src = 'https://cdn.cai.tools.sap/webclient/bootstrap.js';
            GenAIScript.onload = () => {
                this._callCloudFunction();
            };
            this._shadowRoot.appendChild(GenAIScript);
        }

        _callCloudFunction(){
            console.log("cloud function called");
        }

    }

    customElements.define('gen-ai-widget', GenAIwidget);
})();
