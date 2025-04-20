import { LitElement, html, css } from "lit";

import { t } from "../locales/i18n.js";

export class Header extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background-color: #fff;
      color: #ff6600;
      padding: 12px 10px;
      border-radius: 8px;
    }
  `;
  toggleLanguage() {
    debugger;
    const currentLang = document.documentElement.lang;

    const newLang = currentLang === "en" ? "tr" : "en";

    document.documentElement.lang = newLang;
    this.requestUpdate();
    window.dispatchEvent(new CustomEvent("language-changed", {
      detail: {
        language: newLang,
      },
    }));
  }

  get isTurkish() {
    return document.documentElement.lang === "tr";
  }

  render() {
    return html`
      <header>
        <div style="display: flex; align-items: center; gap: 10px;">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiiYxyG6WVw6-HRXV2zvtycJqYRjP3jxtnWQ&s"
            alt="logo"
            style="width: 30px; height: 30px; border-radius: 8px;"
          />
          <span style="font-size: 20px; color: black; font-weight: bold;"
            >ING</span
          >
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <img
            src="https://cdn.pixabay.com/photo/2012/04/26/19/47/man-42934_1280.png"
            style="width: 30px; height: 30px; border-radius: 8px;"
          />
          <span style="font-weight: 600;">${t("employees")}</span>
          <a
            href="/create"
            style="color: #FF6600; font-size: 14px; text-decoration: none;"
            >+ ${t("add-new")}</a
          >
          <img
            @click=${this.toggleLanguage}
            src=${this.isTurkish
              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Turkey_%28physical_colors%29.svg/270px-Flag_of_Turkey_%28physical_colors%29.svg.png"
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1200px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"}
            style="width: 30px; height: 25px; border-radius: 8px;"
          />
        </div>
      </header>
    `;
  }
}

customElements.define("header-component", Header);
