import { LitElement, html, css } from "lit";

export class Header extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background-color: red;
      color: orange;
      padding: 15px 10px;
      border-radius: 8px;
    }
  `;

  render() {
    return html`
      <header>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span>ICON</span>
          <span>ING</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <a href="/create">+ Add New</a>
        </div>
      </header>
    `;
  }
}

customElements.define("header-component", Header);
