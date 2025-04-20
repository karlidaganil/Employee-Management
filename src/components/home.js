import { LitElement, html } from "lit";
import "./header/header";
import "./table";
import "./list";
import { useEmployeeStore } from "../store";
import listIcon from "../assets/list-icon.png";
import tableIcon from "../assets/table-icon.png";
import { t } from "../locales/i18n";
export class Home extends LitElement {
  static get properties() {
    return {
      employees: { type: Array },
      viewType: { type: String },
      searchQuery: { type: String },
      filteredEmployees: { type: Array },
    };
  }

  constructor() {
    super();
    this.employees = useEmployeeStore.getState().employees;
    this.viewType = "table";
    this.searchQuery = "";
    this.filteredEmployees = this.employees;

    useEmployeeStore.subscribe((state) => {
      this.employees = state.employees;
      this.filterEmployees();
    });

    window.addEventListener("language-changed", (e) => {
      this.requestUpdate();
    });
  }

  handleSearch(e) {
    this.searchQuery = e.target.value.toLowerCase();
    this.filterEmployees();
  }

  filterEmployees() {
    if (!this.searchQuery) {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(this.searchQuery) ||
          employee.lastName.toLowerCase().includes(this.searchQuery)
      );
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div>
        <header-component></header-component>
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 0px 20px; color: #FF6600;"
        >
          <h1 style="font-size: 20px; font-weight: 600; margin-top: 25px;">
            ${t("employee-list")}
          </h1>
          <input
            type="text"
            placeholder=${t("search-by-name")}
            style="padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 6px; margin-right: 15px;"
            .value=${this.searchQuery}
            @input=${this.handleSearch}
          />
          <div style="display: flex; gap: 10px;">
            <img
              src=${listIcon}
              style="width: 20px; height: 20px; cursor: pointer; ${this.viewType === "list"
                ? "opacity: 1;" 
                : "opacity: 0.5;"}"
              @click=${() => {
                this.viewType = "list";
                this.requestUpdate();
              }}
            />
            <img
              src=${tableIcon}
              style="width: 20px; height: 20px; cursor: pointer; ${this.viewType === "table"
                ? "opacity: 1;"
                : "opacity: 0.5;"}"
              @click=${() => {
                this.viewType = "table";
                this.requestUpdate();
              }}
            />
          </div>
        </div>
        <div style="padding: 0px 20px;">
          ${this.viewType === "list"
            ? html`<list-component
                .data=${this.filteredEmployees}
              ></list-component>`
            : html`<table-component
                .data=${this.filteredEmployees}
              ></table-component>`}
        </div>
      </div>
    `;
  }
}

customElements.define("home-component", Home);
