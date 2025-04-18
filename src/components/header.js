import { LitElement, html } from "lit";

export class Header extends LitElement {
  render() {
    return html`
      <header style="background-color: #000; color: #fff;">
      <span>HEADER 1</span>
      </header>
    `;
  }
}

window.customElements.define("header-component", Header);
