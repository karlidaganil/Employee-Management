import { LitElement, html, css } from "lit";

export class Table extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      selectedRows: { type: Array, state: true },
      selectAll: { type: Boolean, state: true }
    };
  }

  constructor() {
    super();
    this.data = [];
    this.selectedRows = [];
    this.selectAll = false;
  }

  static get styles() {
    return css`
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      th, td {
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
      this.selectedRows = this.selectedRows.filter(i => i !== index);
    }
    this.selectAll = this.selectedRows.length === this.data.length;
    this.requestUpdate();
  }

  isSelected(index) {
    return this.selectedRows.includes(index);
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
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              (row, index) => html`
                <tr>
                  <td class="checkbox-cell">
                    <input 
                      type="checkbox" 
                      .checked=${this.isSelected(index)}
                      @change=${(e) => this.handleRowSelect(index, e)}
                    />
                  </td>
                  <td>${row.name}</td>
                  <td>${row.age}</td>
                  <td>${row.email}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
        ${this.selectedRows.length > 0 
          ? html`<p>Selected ${this.selectedRows.length} of ${this.data.length} rows</p>` 
          : ''}
      </div>
    `;
  }
}

window.customElements.define("table-component", Table);
