import { LitElement, html } from "lit";

export class Table extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = [];
  }

  render() {
    return html` <div>
      <table>
        <span>props: ${JSON.stringify(this.data, null, 2)}</span>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${this.data.map(
            (row) =>
              html`<tr>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.email}</td>
              </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }
}

window.customElements.define("table-component", Table);
