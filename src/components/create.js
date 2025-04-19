import { LitElement, html } from "lit";
import { useEmployeeStore } from "../store";
import { Router } from "@vaadin/router";
export class Create extends LitElement {
  constructor() {
    super();
    this.router = new Router(this);
  }
  handleSubmit(e) {
    debugger;
    e.preventDefault();
    const formData = new FormData(e.target);
    const employee = Object.fromEntries(formData);
    useEmployeeStore.getState().addEmployee(employee);
    Router.go("/");
  }
  render() {
    return html`
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <span>ADD NEW EMPLOYEE</span>
        <form @submit=${this.handleSubmit}>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <input type="text" name="firstName" placeholder="First Name" />
            <input type="text" name="lastName" placeholder="Last Name" />
            <input type="text" name="email" placeholder="Email" />
            <input type="text" name="phone" placeholder="Phone" />
            <input type="text" name="department" placeholder="Department" />
            <input type="text" name="position" placeholder="Position" />
            <input
              type="text"
              name="dateOfEmployment"
              placeholder="Date of Employment"
            />
            <input type="text" name="dateOfBirth" placeholder="Date of Birth" />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    `;
  }
}

customElements.define("create-component", Create);
