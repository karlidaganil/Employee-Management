import { LitElement, html } from "lit";

export class Header extends LitElement {
  render() {
    return html`
      <header style="background-color: #000; color: #fff; padding: 1rem;">
        <h1>Header</h1>
        <p>This is a header</p>
      </header>
    `;
  }
}

window.customElements.define("header-component", Header);
