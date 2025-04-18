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
  }

  _onClick() {
    this.count++;
  }

  render() {
    return html`
      <div>
        <header-component></header-component>
        <table-component
          .data=${[
            {
              firstName: "John",
              lastName: "Doe",
              dateOfEmployment: "2020-01-01",
              dateOfBirth: "1990-01-01",
              phone: "1234567890",
              department: "Sales",
              position: "Sales Manager",
            },
            {
              firstName: "Jane",
              lastName: "Doe",
              dateOfEmployment: "2020-01-01",
              dateOfBirth: "1995-02-01",
              phone: "1234567890",
              department: "Sales",
              position: "Sales Manager",
            },
            {
              firstName: "Jim",
              lastName: "Doe",
              dateOfEmployment: "2020-01-01",
              dateOfBirth: "1990-01-01",
              phone: "1234567890",
              department: "Sales",
              position: "Sales Manager",
            },
          ]}
        ></table-component>
      </div>
    `;
  }

  _onClick() {
    this.count++;
  }
}

window.customElements.define("my-element", MyElement);
