import { LitElement, html, css } from "lit";
import { t } from "../locales/i18n.js";

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
    this.lang = document.documentElement.lang || 'en';
    
    window.addEventListener('language-changed', (e) => {
      this.lang = e.detail.language;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('language-changed', this.handleLanguageChange);
  }

  static get styles() {
    return css`
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-top: 1rem;
        background-color: red;
      }

      thead tr {
        background-color: white;
      }

      tbody tr {
        background-color: white;
      }

      tbody tr:not(:last-child) {
        border-bottom: 1px solid #f5f7f9;
      }

      th,
      td {
        padding: 16px 8px;
        text-align: left;
        border: none;
        color: #666;
        font-size: 14px;
      }

      th {
        font-weight: 600;
        color: #ff6600;
        background: none;
      }

      tr:hover {
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      }

      .checkbox-cell {
        width: 40px;
        text-align: center;
      }

      input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
      }

      input[type="checkbox"]:checked {
        background-color: #ff5722;
        border-color: #ff5722;
      }

      input[type="checkbox"]:checked::after {
        content: '';
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
        margin-top: 20px;
        gap: 8px;
      }

      .pagination button {
        padding: 8px 12px;
        border: none;
        background: none;
        cursor: pointer;
        color: #666;
        border-radius: 4px;
        min-width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .pagination button:hover {
        background-color: #f0f0f0;
      }

      .pagination button.active {
        background-color: #ff5722;
        color: white;
        border-radius: 50%;
      }

      .pagination button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .pagination .ellipsis {
        padding: 8px 12px;
        color: #666;
      }

      .actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .edit-icon, .delete-icon {
        cursor: pointer;
        color: #ff5722;
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }

      .edit-icon:hover, .delete-icon:hover {
        opacity: 1;
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
    if (changedProperties.has('data')) {
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
        ←
      </button>
    `);

    buttons.push(html`
      <button
        class=${this.currentPage === 1 ? 'active' : ''}
        @click=${() => this.handlePageChange(1)}
      >
        1
      </button>
    `);

    let startPage = Math.max(2, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages - 1, startPage + maxVisiblePages - 1);

    if (startPage > 2) {
      buttons.push(html`<span class="ellipsis">...</span>`);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(html`
        <button
          class=${this.currentPage === i ? 'active' : ''}
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
          class=${this.currentPage === this.totalPages ? 'active' : ''}
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
        →
      </button>
    `);

    return buttons;
  }

  render() {
    return html`
      <div>
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
                  <td>${row.department}</td>
                  <td>${row.position}</td>
                  <td>
                    <div class="actions">
                      <span class="edit-icon">✏️</span>
                      <span class="delete-icon">🗑️</span>
                    </div>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
        ${this.selectedRows.length > 0
          ? html`<p>
              Selected ${this.selectedRows.length} of ${this.data.length} rows
            </p>`
          : ""}
        <div class="pagination">
          ${this.renderPaginationButtons()}
        </div>
      </div>
    `;
  }
}

customElements.define("table-component", Table);
