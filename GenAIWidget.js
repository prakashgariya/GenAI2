(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
    </style>
    <div id="ui_content" name="ui_content">
        <slot name="content"></slot>
    </div>
    <script
        src="https://cdn.cai.tools.sap/webclient/bootstrap.js"
        data-channel-id="a01796f4-8804-41d8-99c7-32858bd0a29e"
        data-token="bace1ac00562c25447d5c2187cba4f8e"
        data-expander-type="CAI"
        data-expander-preferences="JTdCJTIyZXhwYW5kZXJMb2dvJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZjZG4uY2FpLnRvb2xzLnNhcCUyRndlYmNoYXQlMkZ3ZWJjaGF0LWxvZ28uc3ZnJTIyJTJDJTIyZXhwYW5kZXJUaXRsZSUyMiUzQSUyMkNsaWNrJTIwb24lMjBtZSElMjIlMkMlMjJvbmJvYXJkaW5nTWVzc2FnZSUyMiUzQSUyMkNoYXQlMjB3aXRoJTIwbWUhJTIyJTJDJTIydGhlbWUlMjIlM0ElMjJERUZBVUxUJTIyJTdE"
        id="cai-webclient-custom">
    </script>
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
