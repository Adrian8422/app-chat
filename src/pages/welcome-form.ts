class PageForm extends HTMLElement {
  connectedCallback() {
    this.render();

  }

  render() {
    const div = document.createElement("div");
    div.className = "home-page";

    const style = document.createElement("style");
    style.innerHTML = `
    
    .title-page{
      font-size: 28px;
      font-family: 'Russo One', sans-serif;

    }
    .home-page{
      width:100%;
    }
    .sign-up-title{
      font-family: 'Russo One', sans-serif;
      
    }
    .registrarme-a{
      text-decoration:none;
      
    }
    .register{
      
    
      top: 0;
      right: 0;
      left: 0;

    }
    // .register-now{
      
    //   position: fixed;
    //   top: 0;
    //   right: 0;
    //   left: 0;

    // }
    `;
    div.innerHTML = `

    
    <header-vue>App chat</header-vue>
    <h1 class="title-page">Benvenidx</h1>
    
    <sign-up class="register"></sign-up>
    <form-elem></form-elem>
    
    `;
    this.appendChild(style);
    this.appendChild(div);
  }
}
customElements.define("welcome-form", PageForm);

