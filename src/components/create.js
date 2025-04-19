import { LitElement, html, css } from "lit";
import { useEmployeeStore } from "../store";
import { Router } from "@vaadin/router";
import { t } from "../locales/i18n.js";

export class Create extends LitElement {
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

  constructor() {
    super();
    this.router = new Router(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employee = Object.fromEntries(formData);
    useEmployeeStore.getState().addEmployee(employee);
    Router.go("/");
  }

  render() {
    return html`
      <div class="container">
        <h1 class="title">${t('add-new-employee')}</h1>
        <form class="form" @submit=${this.handleSubmit}>
          <div class="form-grid">
            <div class="input-group">
              <label class="label">${t('first-name')}</label>
              <input type="text" name="firstName" required />
            </div>
            <div class="input-group">
              <label class="label">${t('last-name')}</label>
              <input type="text" name="lastName" required />
            </div>
            <div class="input-group">
              <label class="label">${t('email')}</label>
              <input type="email" name="email" required />
            </div>
            <div class="input-group">
              <label class="label">${t('phone')}</label>
              <input type="tel" name="phone" required />
            </div>
            <div class="input-group">
              <label class="label">${t('department')}</label>
              <input type="text" name="department" required />
            </div>
            <div class="input-group">
              <label class="label">${t('position')}</label>
              <input type="text" name="position" required />
            </div>
            <div class="input-group">
              <label class="label">${t('date-of-employment')}</label>
              <input type="date" name="dateOfEmployment" required />
            </div>
            <div class="input-group">
              <label class="label">${t('date-of-birth')}</label>
              <input type="date" name="dateOfBirth" required />
            </div>
          </div>
          <button type="submit" class="submit-button">
            ${t('create-employee')}
          </button>
        </form>
      </div>
    `;
  }
}

customElements.define("create-component", Create);
