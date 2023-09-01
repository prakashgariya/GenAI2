(function(){
    
    let template = document.createElement("template");
    template.innerHTML = `
    <a href="https://us-central1-us-gcp-ame-con-e74c9-sbx-1.cloudfunctions.net/GCF_Gen_Analytics_trigger" target="_blank">CLick this link</a>
    `;

    class CloudFunction extends HTMLElement{
        constructor(){
            super();
            this._shadowRoot = this.attachShadow({mode:"open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }

    customElements.define('sac-cloudfunction', CloudFunction);
})();