(function () {
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    </style>
    <iframe
      src="https://fpa40-orcamaster-justask-xsc.master.canary.eu10.projectorca.cloud/sap/fpa/ui/app.html#/home"
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