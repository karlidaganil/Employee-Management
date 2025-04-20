import { LitElement, html, css } from "lit";
import { t } from "../locales/i18n.js";
import { useEmployeeStore } from "../store.js";
import "./modal.js";
import { Router } from "@vaadin/router";

export class Table extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      selectedRows: { type: Array, state: true },
      selectAll: { type: Boolean, state: true },
      currentPage: { type: Number, state: true },
      itemsPerPage: { type: Number },
      totalPages: { type: Number, state: true },
      lang: { type: String, reflect: true },
      showDeleteModal: { type: Boolean, state: true },
      employeeToDelete: { type: Object, state: true },
    };
  }

  constructor() {
    super();
    this.data = [];
    this.selectedRows = [];
    this.selectAll = false;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalPages = 1;
    this.lang = document.documentElement.lang || "en";
    this.deleteEmployee = useEmployeeStore.getState().removeEmployee;
    this.showDeleteModal = false;
    this.employeeToDelete = null;

    window.addEventListener("language-changed", (e) => {
      this.lang = e.detail.language;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("language-changed", this.handleLanguageChange);
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .table-container {
        width: 100%;
        overflow-x: auto;
        margin: 1rem 0;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        background-color: white;
        min-width: 800px;
      }

      thead {
        background-color: #f8f9fa;
      }

      thead tr {
        background-color: white;
        border-bottom: 2px solid #f5f7f9;
      }

      tbody tr {
        background-color: white;
        transition: all 0.2s ease;
      }

      tbody tr:not(:last-child) {
        border-bottom: 1px solid #f5f7f9;
      }

      th,
      td {
        padding: 1rem;
        text-align: left;
        border: none;
        color: #666;
        font-size: 0.875rem;
        white-space: nowrap;
      }

      th {
        font-weight: 600;
        color: #ff6600;
        background: none;
        position: sticky;
        top: 0;
        z-index: 1;
      }

      tr:hover {
        background-color: #f8f9fa;
      }

      .checkbox-cell {
        width: 40px;
        text-align: center;
        padding: 0 0.5rem;
      }

      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 1.125rem;
        height: 1.125rem;
        border: 2px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
        margin: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
      }

      input[type="checkbox"]:checked {
        background-color: #ff6600;
        border-color: #ff6600;
      }

      input[type="checkbox"]:checked::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.25rem 0;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .pagination button {
        padding: 0.5rem 0.75rem;
        border: none;
        background: none;
        cursor: pointer;
        color: #666;
        border-radius: 4px;
        min-width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .pagination button:hover {
        background-color: #f0f0f0;
      }

      .pagination button.active {
        background-color: #ff6600;
        color: white;
        border-radius: 50%;
      }

      .pagination button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .pagination .ellipsis {
        padding: 0.5rem 0.75rem;
        color: #666;
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: flex-start;
      }

      .action-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .action-button:hover {
        background-color: #f0f0f0;
      }

      @media (max-width: 768px) {
        .table-container {
          margin: 0.5rem 0;
          border-radius: 8px;
        }

        th,
        td {
          padding: 0.75rem 0.5rem;
          font-size: 0.813rem;
        }

        .pagination {
          margin: 1rem 0;
        }

        .pagination button {
          padding: 0.375rem 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
        }
      }
    `;
  }

  handleSelectAll(e) {
    const checked = e.target.checked;
    this.selectAll = checked;
    if (checked) {
      this.selectedRows = this.data.map((_, index) => index);
    } else {
      this.selectedRows = [];
    }
    this.requestUpdate();
  }

  handleRowSelect(index, e) {
    const checked = e.target.checked;
    if (checked) {
      this.selectedRows = [...this.selectedRows, index];
    } else {
      this.selectedRows = this.selectedRows.filter((i) => i !== index);
    }
    this.selectAll = this.selectedRows.length === this.data.length;
    this.requestUpdate();
  }

  isSelected(index) {
    return this.selectedRows.includes(index);
  }

  getPaginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
  }

  firstUpdated() {
    this.updateTotalPages();
  }

  updated(changedProperties) {
    if (changedProperties.has("data")) {
      this.updateTotalPages();
    }
  }

  handlePageChange(page) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.selectedRows = [];
    this.selectAll = false;
  }

  renderPaginationButtons() {
    const buttons = [];
    const maxVisiblePages = 5;

    buttons.push(html`
      <button
        @click=${() => this.handlePageChange(this.currentPage - 1)}
        ?disabled=${this.currentPage === 1}
      >
        <
      </button>
    `);

    buttons.push(html`
      <button
        class=${this.currentPage === 1 ? "active" : ""}
        @click=${() => this.handlePageChange(1)}
      >
        1
      </button>
    `);

    let startPage = Math.max(
      2,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(
      this.totalPages - 1,
      startPage + maxVisiblePages - 1
    );

    if (startPage > 2) {
      buttons.push(html`<span class="ellipsis">...</span>`);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(html`
        <button
          class=${this.currentPage === i ? "active" : ""}
          @click=${() => this.handlePageChange(i)}
        >
          ${i}
        </button>
      `);
    }

    if (endPage < this.totalPages - 1) {
      buttons.push(html`<span class="ellipsis">...</span>`);
    }

    if (this.totalPages > 1) {
      buttons.push(html`
        <button
          class=${this.currentPage === this.totalPages ? "active" : ""}
          @click=${() => this.handlePageChange(this.totalPages)}
        >
          ${this.totalPages}
        </button>
      `);
    }

    buttons.push(html`
      <button
        @click=${() => this.handlePageChange(this.currentPage + 1)}
        ?disabled=${this.currentPage === this.totalPages}
      >
        >
      </button>
    `);

    return buttons;
  }

  handleDeleteClick(employee) {
    this.employeeToDelete = employee;
    this.showDeleteModal = true;
  }

  handleDeleteCancel() {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  handleDeleteConfirm() {
    if (this.employeeToDelete) {
      useEmployeeStore.getState().removeEmployee(this.employeeToDelete.id);
      this.showDeleteModal = false;
      this.employeeToDelete = null;
    }
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <input
                  type="checkbox"
                  .checked=${this.selectAll}
                  @change=${this.handleSelectAll}
                />
              </th>
              <th>${t("first-name")}</th>
              <th>${t("last-name")}</th>
              <th>${t("date-of-employment")}</th>
              <th>${t("date-of-birth")}</th>
              <th>${t("phone")}</th>
              <th>${t("email")}</th>
              <th>${t("department")}</th>
              <th>${t("position")}</th>
              <th>${t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            ${this.getPaginatedData().map(
              (row, index) => html`
                <tr>
                  <td class="checkbox-cell">
                    <input
                      type="checkbox"
                      .checked=${this.isSelected(index)}
                      @change=${(e) => this.handleRowSelect(index, e)}
                    />
                  </td>
                  <td style="font-weight: 600;">${row.firstName}</td>
                  <td style="font-weight: 600;">${row.lastName}</td>
                  <td>${row.dateOfEmployment}</td>
                  <td>${row.dateOfBirth}</td>
                  <td>${row.phone}</td>
                  <td>${row.email}</td>
                  <td>${t(row.department.toLowerCase())}</td>
                  <td>${t(row.position.toLowerCase())}</td>
                  <td>
                    <div class="actions">
                      <button
                        class="action-button"
                        title="Edit"
                        @click=${() => Router.go(`/edit/${row.id}`)}
                      >
                        ✏️
                      </button>
                      <button
                        class="action-button"
                        title="Delete"
                        @click=${() => this.handleDeleteClick(row)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
      ${this.selectedRows.length > 0
        ? html`<p>
            Selected ${this.selectedRows.length} of ${this.data.length} rows
          </p>`
        : ""}
      <div class="pagination">${this.renderPaginationButtons()}</div>

      <confirmation-modal
        ?show=${this.showDeleteModal}
        title=${t("are-you-sure")}
        message=${this.employeeToDelete
          ? t("delete-confirmation", {
              name: `${this.employeeToDelete.firstName} ${this.employeeToDelete.lastName}`,
            })
          : ""}
        @cancel=${this.handleDeleteCancel}
        @proceed=${this.handleDeleteConfirm}
      ></confirmation-modal>
    `;
  }
}

customElements.define("table-component", Table);
