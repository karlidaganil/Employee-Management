import { LitElement, html, css } from 'lit-element';

class NotFound extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      font-family: Arial, sans-serif;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #333;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
    }
    a {
      text-decoration: none;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      transition: background-color 0.3s;
    }
    a:hover {
      background-color: #0056b3;
    }
  `;

  render() {
    return html`
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go Back Home</a>
    `;
  }
}

customElements.define('not-found-component', NotFound); 