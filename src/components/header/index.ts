class Headerzone extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }
  connectedCallback() {
    const style = document.createElement("style");
    style.innerHTML = `
    .header-cin{
        display: flex;
        background-color:rgb(3, 44, 56);
        height: 70px;
        width:100%;
        color:whitesmoke;
        align-items:center;
        justify-content:center;
        text-align:center;
        font-size: 36px;
      font-family: 'Russo One', sans-serif;
      border-radius:8px;
    }
    `;
    this.shadow.appendChild(style);
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `

      <div class="header-cin">${this.textContent}</div>
      `;

    this.shadow.appendChild(div);
  }
}

customElements.define("header-vue", Headerzone);