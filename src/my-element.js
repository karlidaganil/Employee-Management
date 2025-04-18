import { LitElement, css, html } from "lit";
import litLogo from "./assets/lit.svg";
import viteLogo from "/vite.svg";
import "./components/header";

export class MyElement extends LitElement {
  static get properties() {
    return {
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.docsHint = "Click on the Vite and Lit logos to learn more";
    this.count = 0;
  }

  render() {
    return html`
      <div>
        <header-component />
      </div>
    `;
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define("my-element", MyElement);
