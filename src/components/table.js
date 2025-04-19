import { LitElement, html, css } from "lit";

export class Table extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      selectedRows: { type: Array, state: true },
      selectAll: { type: Boolean, state: true },
      currentPage: { type: Number, state: true },
      itemsPerPage: { type: Number },
      totalPages: { type: Number, state: true },
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
  }

  static get styles() {
    return css`
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      th,
      td {
        padding: 8px;
        text-align: left;
        border: 1px solid #ddd;
      }
      th {
        background-color: #f5f5f5;
      }
      tr:hover {
        background-color: #f9f9f9;
      }
      .checkbox-cell {
        width: 40px;
        text-align: center;
      }
      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
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
    
    // Previous button
    buttons.push(html`
      <button
        @click=${() => this.handlePageChange(this.currentPage - 1)}
        ?disabled=${this.currentPage === 1}
      >
        ←
      </button>
    `);

    // First page
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

    // Last page
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

    // Next button
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Employment</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
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
                  <td>${row.firstName}</td>
                  <td>${row.lastName}</td>
                  <td>${row.dateOfEmployment}</td>
                  <td>${row.dateOfBirth}</td>
                  <td>${row.phone}</td>
                  <td>${row.email}</td>
                  <td>${row.department}</td>
                  <td>${row.position}</td>
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
