import { LitElement, html } from "lit";
import "./header/header";
import "./table";
import { useEmployeeStore } from "../store";

export class Home extends LitElement {
  static get properties() {
    return {
      employees: { type: Array },
    };
  }

  constructor() {
    super();
    this.employees = useEmployeeStore.getState().employees;

    useEmployeeStore.subscribe((state) => {
      this.employees = state.employees;
    });
  }

  render() {
    return html`
      <div>
        <header-component></header-component>
        <h1>Employees</h1>
        <div style="padding: 0px 20px;">
          <table-component .data=${this.employees}></table-component>
        </div>
      </div>
    `;
  }
}

customElements.define("home-component", Home);
