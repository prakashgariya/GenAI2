(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    </style>
    <iframe
      src="https://deloitteconsulting.cloud.looker.com/embed/dashboards/1?allow_login_screen=true"
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