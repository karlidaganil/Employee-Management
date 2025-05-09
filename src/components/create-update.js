import { LitElement, html, css } from "lit";
import { useEmployeeStore } from "../store.js";
import { Router } from "@vaadin/router";
import { t } from "../locales/i18n.js";

export class CreateUpdate extends LitElement {
  static get properties() {
    return {
      departments: { type: Array },
      positions: { type: Array },
      id: { type: String },
      employee: { type: Object },
    };
  }

  constructor() {
    super();
    this.router = new Router(this);
    this.departments = ["Analytics", "Tech"];
    this.positions = ["Junior", "Medior", "Senior"];
    this.id = "";
    this.employees = useEmployeeStore.getState().employees;

    useEmployeeStore.subscribe((state) => {
      this.employees = state.employees;
    });
  }

  onBeforeEnter(context) {
    this.id = context.params.id;
    this.employee = this.employees.find((e) => e.id === Number(this.id));
  }

  static get styles() {
    return css`
      .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 32px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .title {
        color: #ff6600;
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 24px;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .label {
        font-size: 14px;
        color: #666;
        font-weight: 500;
      }

      input {
        padding: 10px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        transition: all 0.2s ease;
      }

      input:focus {
        outline: none;
        border-color: #ff6600;
        box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.1);
      }

      input::placeholder {
        color: #999;
      }

      .submit-button {
        background-color: #ff6600;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 12px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease;
        margin-top: 12px;
      }

      .submit-button:hover {
        background-color: #ff5500;
      }

      select {
        padding: 10px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        transition: all 0.2s ease;
        background-color: white;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 12px;
        padding-right: 32px;
      }

      select:focus {
        outline: none;
        border-color: #ff6600;
        box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.1);
      }

      select:hover {
        border-color: #ff6600;
      }

      @media (max-width: 768px) {
        .form-grid {
          grid-template-columns: 1fr;
        }

        .container {
          margin: 20px;
          padding: 20px;
        }
      }
    `;
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employee = Object.fromEntries(
      Array.from(formData).map(([key, value]) => [key, value.trimEnd()])
    );

    const phoneRegex = /^(?:\+90|0)?5\d{9}$/;
    if (!phoneRegex.test(employee.phone.replace(/\s/g, ""))) {
      alert(t("invalid-phone-format"));
      return;
    }

    if (
      useEmployeeStore
        .getState()
        .employees.find((e) => e.email === employee.email) &&
      !this.id
    ) {
      alert(t("employee-already-exists-by-email"));
      return;
    }
    if (this.id) {
      useEmployeeStore
        .getState()
        .updateEmployee({ ...employee, id: Number(this.id) });
    } else {
      useEmployeeStore.getState().addEmployee(employee);
    }

    useEmployeeStore.getState().addEmployee(employee);
    Router.go("/");
  }

  render() {
    return html`
      <div style="display: flex; align-items: center; gap: 10px;">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiiYxyG6WVw6-HRXV2zvtycJqYRjP3jxtnWQ&s"
          alt="logo"
          style="width: 30px; height: 30px; border-radius: 8px; cursor: pointer;"
          @click=${() => Router.go("/")}
        />
      </div>
      <div class="container">
        <h1 class="title">
          ${this.id ? t("edit-employee") : t("add-new-employee")}
        </h1>
        <form class="form" @submit=${this.handleSubmit}>
          <div class="form-grid">
            <div class="input-group">
              <label class="label">${t("first-name")}</label>
              <input
                type="text"
                name="firstName"
                required
                value=${this.employee?.firstName}
              />
            </div>
            <div class="input-group">
              <label class="label">${t("last-name")}</label>
              <input
                type="text"
                name="lastName"
                required
                value=${this.employee?.lastName}
              />
            </div>
            <div class="input-group">
              <label class="label">${t("email")}</label>
              <input
                type="email"
                name="email"
                required
                value=${this.employee?.email}
              />
            </div>
            <div class="input-group">
              <label class="label">${t("phone")}</label>
              <input
                type="tel"
                name="phone"
                placeholder="05383976177"
                required
                value=${this.employee?.phone}
              />
            </div>
            <div class="input-group">
              <label class="label">${t("department")}</label>
              <select name="department" required>
                ${this.departments.map(
                  (dept) => html`
                    <option
                      ?selected=${this.employee?.department === dept}
                      value=${dept}
                    >
                      ${t(`${dept.toLowerCase()}`)}
                    </option>
                  `
                )}
              </select>
            </div>
            <div class="input-group">
              <label class="label">${t("position")}</label>
              <select name="position" required>
                ${this.positions.map(
                  (pos) => html`
                    <option
                      ?selected=${this.employee?.position === pos}
                      value=${pos}
                    >
                      ${t(`${pos.toLowerCase()}`)}
                    </option>
                  `
                )}
              </select>
            </div>
            <div class="input-group">
              <label class="label">${t("date-of-employment")}</label>
              <input
                type="date"
                name="dateOfEmployment"
                required
                value=${this.employee?.dateOfEmployment}
              />
            </div>
            <div class="input-group">
              <label class="label">${t("date-of-birth")}</label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value=${this.employee?.dateOfBirth}
              />
            </div>
          </div>
          <button type="submit" class="submit-button">
            ${this.id ? t("update") : t("add-new")}
          </button>
        </form>
      </div>
    `;
  }
}

customElements.define("create-update-component", CreateUpdate);
