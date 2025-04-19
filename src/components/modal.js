import { LitElement, html, css } from "lit";
import { t } from "../locales/i18n.js";

export class Modal extends LitElement {
  static get styles() {
    return css`
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 460px;
        box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .modal-title {
        font-size: 20px;
        font-weight: 600;
        color: #ff6600;
        margin: 0;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        color: #ff6600;
        padding: 4px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-body {
        margin-bottom: 16px;
        color: #666;
        font-size: 14px;
        line-height: 1.5;
      }

      .modal-footer {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .btn {
        width: 100%;
        padding: 8px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;
        text-align: center;
      }

      .btn-primary {
        background-color: #ff6600;
        color: white;
      }

      .btn-primary:hover {
        background-color: #ff5500;
      }

      .btn-secondary {
        background-color: white;
        color: #666;
        outline: 1px solid rgb(26, 24, 24);
      }

      .btn-secondary:hover {
        background-color: #f5f5f5;
      }
    `;
  }

  static get properties() {
    return {
      show: { type: Boolean },
      title: { type: String },
      message: { type: String },
      lang: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.show = false;
    this.title = "";
    this.message = "";
    this.lang = document.documentElement.lang || "en";

    // Listen for language changes
    window.addEventListener("language-changed", (e) => {
      this.lang = e.detail.language;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("language-changed", this.handleLanguageChange);
  }

  render() {
    if (!this.show) return null;

    return html`
      <div class="modal-overlay" @click=${this._handleOverlayClick}>
        <div class="modal-content" @click=${this._stopPropagation}>
          <div class="modal-header">
            <h3 class="modal-title">${this.title}</h3>
            <button class="close-button" @click=${this._handleCancel}>✕</button>
          </div>
          <div class="modal-body">${this.message}</div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click=${this._handleProceed}>
              ${t("proceed")}
            </button>
            <button class="btn btn-secondary" @click=${this._handleCancel}>
              ${t("cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      this._handleCancel();
    }
  }

  _stopPropagation(e) {
    e.stopPropagation();
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent("cancel"));
  }

  _handleProceed() {
    this.dispatchEvent(new CustomEvent("proceed"));
  }
}

customElements.define("confirmation-modal", Modal);
