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
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0px 20px; color: orange;">
          <h1>Employee List</h1>
          <div>
            <span>List Icon</span>
            <span>Table Icon</span>
          </div>
        </div>
        <div style="padding: 0px 20px;">
          <table-component .data=${this.employees}></table-component>
        </div>
      </div>
    `;
  }
}

customElements.define("home-component", Home);
