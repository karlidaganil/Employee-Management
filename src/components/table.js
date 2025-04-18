import { LitElement, html } from "lit";

export class Table extends LitElement {
  render() {
    return html`<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>30</td>
          <td>john@example.com</td>
        </tr>
      </tbody>
    </table>`;
  }
}

window.customElements.define("table-component", Table);
