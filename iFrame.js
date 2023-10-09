(function () {
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    </style>
    <iframe
      src="https://www2.deloitte.com/us/en.html"
      width="1000"
      height="2000"
      frameborder="0">
    </iframe>
    `;

    class iFrameExt extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }

    customElements.define('sac-iframe', iFrameExt);
})();