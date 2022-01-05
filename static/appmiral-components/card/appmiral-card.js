import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';


export class AppmiralCard extends LitElement {
  static properties = {
    label: {type: String, reflect: true},
    icon: {type: String, reflect: true},
    image: {type: String,},
    flexDirection: {type: String, attribute: 'flex-direction'},
    flat: {type: Boolean},

    _emptyHeader: {type: Boolean, state: true},
    _emptyFunctions: {type: Boolean, state: true},
    _emptyFooter: {type: Boolean, state: true},
  };

  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      sharedStyles,
      css`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        border-radius: var(--border-radius);
        box-sizing: border-box;
        overflow: hidden;
      }
      :host(:not([flat])) {
        background-color: rgb(var(--base-3));
        box-shadow: var(--shadow-1);
        padding: 16px;
      }
      /* header */
      slot,
      .header,
      .top {
        display: flex;
        overflow: auto;
      }
      .header,
      slot[name='functions'] {
        height: max-content;
      }
      .header {
        flex: 1;
      }
      .top:not(.empty) {
        padding-bottom: 16px;
      }
      slot[name='footer']:not(.empty) {
        padding-top: 16px;
      }
      .label {
        flex: 1;
        display: flex;
      }
      .label p {
        font: var(--header-1);
        color: var(--text-1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }
      .label appmiral-icon {
        margin-right: 8px;
      }
      slot[name='footer']::slotted(*:not(:first-child)),
      slot[name='functions']::slotted(*) {
        _margin-left: 12px;
      }
      /* content */
      slot:not([name]) {
        flex: 1;
        width: 100%;
        padding: 0 16px;
        margin-right: -16px;
        margin-left: -16px;
      }
      :host([flex-direction='column']) slot:not([name]),
      .header {
        flex-direction: column;
      }
      :host([flex-direction='column'])
        slot:not([name])::slotted(*:not(:last-child)) {
        margin-bottom: 12px;
      }
      :host([flex-direction='row'])
        slot:not([name])::slotted(*:not(:last-child)) {
        margin-right: 12px;
      }
      /* footer */
      slot[name='footer'] {
        justify-content: flex-end;
      }
      slot[name='header'],
      slot[name='functions'],
      slot[name='footer'] {
        align-items: center;
      }
      /* image */
      .image {
        width: calc(100% + 32px);
        margin: -16px -16px 16px -16px;
      }
    `,
    ]
  }

  constructor() {
    super();
    // Declare reactive properties
    this.flexDirection = 'column';

    this._emptyHeader = true;
    this._emptyFunctions = true;
    this._emptyFooter = true;
  }

  // Render the UI as a function of component state
  render() {
    return html`
    ${this.image ? html` <img class="image" src="${this.image}" /> ` : ''}
    <div
      class="top ${this._emptyHeader &&
      this._emptyFunctions &&
      !this.label &&
      !this.icon
      ? 'empty'
      : ''}"
    >
      <div class="header">
        ${this.label || this.icon
      ? html`
              <div class="label">
                ${this.icon
          ? html` <appmiral-icon icon="${this.icon}"></appmiral-icon> `
          : ''}
                <p>${this.label}</p>
              </div>
              ${!this._emptyHeader && (this.label || this.icon)
          ? html` <div style="margin-top: 16px"></div> `
          : ''}
            `
      : ''}
        <slot
          name="header"
          @slotchange="${(e) =>
      (this._emptyHeader = e.target.assignedNodes().length === 0)}"
          class="${this._emptyHeader ? 'empty' : ''}"
        ></slot>
      </div>
      <slot
        name="functions"
        @slotchange="${(e) =>
      (this._emptyFunctions = e.target.assignedNodes().length === 0)}"
      ></slot>
    </div>
    <slot></slot>
    <slot
      name="footer"
      @slotchange="${(e) =>
      (this._emptyFooter = e.target.assignedNodes().length === 0)}"
      class="${this._emptyFooter ? 'empty' : ''}"
    ></slot>
    `;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
};

if (!window.customElements.get('appmiral-card')) {
  customElements.define('appmiral-card', AppmiralCard);
}