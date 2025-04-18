import { LitElement, html } from "lit";
import "./header";
import "./table";

export class Home extends LitElement {
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
}

customElements.define("home-component", Home);
