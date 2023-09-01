(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <script
        src="https://cdn.cai.tools.sap/webclient/bootstrap.js"
        data-channel-id="a01796f4-8804-41d8-99c7-32858bd0a29e"
        data-token="bace1ac00562c25447d5c2187cba4f8e"
        data-expander-type="CAI"
        data-expander-preferences="JTdCJTIyZXhwYW5kZXJMb2dvJTIyJTNBJTIyaHR0cHMlM0ElMkYlMkZjZG4uY2FpLnRvb2xzLnNhcCUyRndlYmNoYXQlMkZ3ZWJjaGF0LWxvZ28uc3ZnJTIyJTJDJTIyZXhwYW5kZXJUaXRsZSUyMiUzQSUyMkNsaWNrJTIwb24lMjBtZSElMjIlMkMlMjJvbmJvYXJkaW5nTWVzc2FnZSUyMiUzQSUyMkNoYXQlMjB3aXRoJTIwbWUhJTIyJTJDJTIydGhlbWUlMjIlM0ElMjJERUZBVUxUJTIyJTdE"
        id="cai-webclient-custom">
    </script>
    `;

    class ChatBot extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

        }
    }

    customElements.define('sac-chatbot', ChatBot);
})();