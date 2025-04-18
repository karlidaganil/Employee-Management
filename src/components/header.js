import { LitElement, html } from "lit";

export class Header extends LitElement {
  render() {
    return html`
      <header
        style="background-color: #000; color: #fff;display:flex;justify-content:space-between;align-items:center;"
      >
        <span>HEADER 1</span>
        <a href="/create">+ Add New</a>
      </header>
    `;
  }
}

customElements.define("header-component", Header);
