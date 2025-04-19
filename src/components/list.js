import { LitElement, html, css } from "lit";
import { useEmployeeStore } from "../store";

export class List extends LitElement {
  static get styles() {
    return css`
      .container {
        padding: 20px;
        background-color: #f5f7f9;
      }

      h1 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: 600;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .employee-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .employee-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .employee-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #ff6600;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 600;
        margin-right: 15px;
      }

      .employee-info {
        flex-grow: 1;
      }

      .employee-name {
        color: #333;
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }

      .employee-position {
        color: #666;
        font-size: 14px;
        margin: 4px 0;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-top: 15px;
      }

      .info-item {
        display: flex;
        flex-direction: column;
      }

      .info-label {
        color: #999;
        font-size: 12px;
        margin-bottom: 4px;
      }

      .info-value {
        color: #333;
        font-size: 14px;
        font-weight: 500;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 15px;
        gap: 10px;
      }

      .action-button {
        background: none;
        border: none;
        cursor: pointer;
        color: #ff6600;
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }

      .action-button:hover {
        opacity: 1;
      }
    `;
  }

  static get properties() {
    return {
      employees: { type: Array },
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.unsubscribe = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // Subscribe to store changes
    this.unsubscribe = useEmployeeStore.subscribe(
      (state) => {
        this.employees = state.employees;
        this.requestUpdate();
      }
    );
    // Initialize with current state
    this.employees = useEmployeeStore.getState().employees;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Cleanup subscription
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getInitials(firstName, lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  handleDelete(email) {
    useEmployeeStore.getState().removeEmployee(email);
  }

  render() {
    return html`
      <div class="container">
        <h1>Employee List</h1>
        <div class="card-grid">
          ${this.employees.map(
            (employee) => html`
              <div class="employee-card">
                <div class="employee-header">
                  <div class="avatar">
                    ${this.getInitials(employee.firstName, employee.lastName)}
                  </div>
                  <div class="employee-info">
                    <h3 class="employee-name">
                      ${employee.firstName} ${employee.lastName}
                    </h3>
                    <p class="employee-position">${employee.position}</p>
                  </div>
                </div>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">Department</span>
                    <span class="info-value">${employee.department}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Email</span>
                    <span class="info-value">${employee.email}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Phone</span>
                    <span class="info-value">${employee.phone}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Date of Employment</span>
                    <span class="info-value">${employee.dateOfEmployment}</span>
                  </div>
                </div>
                <div class="actions">
                  <button class="action-button" title="Edit">✏️</button>
                  <button 
                    class="action-button" 
                    title="Delete"
                    @click=${() => this.handleDelete(employee.email)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("list-component", List);
