import { LitElement, html } from "lit";

export class Create extends LitElement {
  render() {
    return html`
      <header style="background-color: #000; color: #fff;">
        <span>CREATE</span>
      </header>
    `;
  }
}

customElements.define("create-component", Create);
