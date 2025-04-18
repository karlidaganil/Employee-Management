import { LitElement, html } from "lit";
import "./components/header";
import "./components/table";
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
    this.data = [
      { name: "John", age: 30, email: "john@example.com" },
      { name: "Jane", age: 25, email: "jane@example.com" },
      { name: "Jim", age: 35, email: "jim@example.com" },
    ];
  }

  _onClick() {
    this.count++;
  }

  render() {
    return html`
      <div>
        <header-component></header-component>
        <table-component></table-component>
      </div>
    `;
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define("my-element", MyElement);
