import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';
import '../text/appmiral-text.js';
import '../icon/appmiral-icon.js';


export class AppmiralBar extends LitElement {
  static properties = {
    label: {type: String, reflect: true},
    logo: {type: String, reflect: true},
    mobile: {type: Boolean, reflect: true},
  };

  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      sharedStyles,
      css`
      :host {
        z-index: 3;
        height: 56px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        overflow: hidden;
        background-color: rgb(var(--base-0));
        box-shadow: var(--shadow-1);
        transition: var(--transition-1);
      }
      .logo {
        height: 24px;
        margin-right: 32px;
      }
      .label {
        font: var(--header-1);
        color: var(--text-1);
        max-width: 320px;
        margin-right: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host([mobile]) .label {
        flex: 1;
        max-width: unset;
        margin: 0 16px;
        text-align: center;
      }
      /* slots */
      slot {
        display: flex;
        align-items: center;
      }
      slot:not([name]) {
        flex: 1;
      }
      slot[name='functions']::slotted(*) {
        margin-left: 12px;
      }
      ::slotted(appmiral-tabs) {
        border-bottom: unset;
      }
      slot[name='right'],
      slot[name='left'] {
        min-width: 24px;
      }
      slot[name='right'] {
        margin-left: auto;
      }
      `,
    ]
  }

  constructor() {
    super();
    // Declare reactive properties
  }

  // Render the UI as a function of component state
  render() {
    return html`
      ${!this.mobile
        ? html`
            ${this.logo
            ? html`
                  <img
                    class="logo"
                    src="${this.logo}"
                    @click="${() => this.handleLogoClick()}"
                  />
                `
            : ''}
            ${this.label ? html` <div class="label">${this.label}</div> ` : ''}
            <slot></slot>
            <slot name="functions"></slot>
          `
        : html`
            <slot name="left"></slot>
            ${this.label ? html` <div class="label">${this.label}</div> ` : ''}
            <slot name="right"></slot>
          `}
    `;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  handleLogoClick() {
    this.dispatchEvent(new Event('logo-clicked'));
  }
};

if (!window.customElements.get('appmiral-bar')) {
  customElements.define('appmiral-bar', AppmiralBar);
}