import { LitElement, html, css } from "lit";

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
        padding: 24px;
        border-radius: 8px;
        width: 400px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
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
        font-size: 24px;
        cursor: pointer;
        color: #999;
        padding: 0;
      }

      .modal-body {
        margin-bottom: 24px;
        color: #666;
      }

      .modal-footer {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      .btn {
        padding: 10px 24px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: all 0.2s ease;
      }

      .btn-primary {
        background-color: #ff6600;
        color: white;
      }

      .btn-primary:hover {
        background-color: #ff5500;
      }

      .btn-secondary {
        background-color: #f5f5f5;
        color: #666;
      }

      .btn-secondary:hover {
        background-color: #eeeeee;
      }
    `;
  }

  static get properties() {
    return {
      show: { type: Boolean },
      title: { type: String },
      message: { type: String },
    };
  }

  constructor() {
    super();
    this.show = false;
    this.title = '';
    this.message = '';
  }

  render() {
    if (!this.show) return null;

    return html`
      <div class="modal-overlay" @click=${this._handleOverlayClick}>
        <div class="modal-content" @click=${this._stopPropagation}>
          <div class="modal-header">
            <h3 class="modal-title">${this.title}</h3>
            <button class="close-button" @click=${this._handleCancel}>×</button>
          </div>
          <div class="modal-body">
            ${this.message}
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click=${this._handleCancel}>
              Cancel
            </button>
            <button class="btn btn-primary" @click=${this._handleProceed}>
              Proceed
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
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  _handleProceed() {
    this.dispatchEvent(new CustomEvent('proceed'));
  }
}

customElements.define('confirmation-modal', Modal); 