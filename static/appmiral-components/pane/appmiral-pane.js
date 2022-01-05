import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';
import '../card/appmiral-card.js';

export class AppmiralPane extends LitElement {
  static properties = {
    label: {type: String, reflect: true },
    icon: {type: String, reflect: true },
    flexDirection: {type: String, attribute: 'flex-direction'},
    size: {type: String, reflect: true },

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
        background-color: rgb(var(--base-2));
        display: flex;
        box-shadow: var(--shadow-1);
        transition: 0.1s width ease-out;
      }
      :host([size='l']) {
        width: 320px;
      }
      :host([size='m']) {
        width: 120px;
      }
      :host([size='s']) {
        width: 80px;
      }
      appmiral-card {
        background-color: transparent;
        box-shadow: none;
      }
      `,
    ]
  }

  constructor() {
    super();
    // Declare reactive properties
    this.flexDirection = 'column';
    //this.size = 'l';

    this._emptyHeader = true;
    this._emptyFunctions = true;
    this._emptyFooter = true;
  }

  // Render the UI as a function of component state
  render() {
    return html`
    <appmiral-card
    label="${this.label ? this.label : ''}"
    icon="${this.icon ? this.icon : ''}"
    flex-direction="${this.flexDirection}"
  >
    <slot></slot>
    <slot
      name="header"
      slot="${this._emptyHeader ? '' : 'header'}"
      @slotchange="${(e) =>
    (this._emptyHeader = e.target.assignedNodes().length === 0)}"
    ></slot>
    <slot
      name="functions"
      slot="${this._emptyFunctions ? '' : 'functions'}"
      @slotchange="${(e) =>
    (this._emptyFunctions = e.target.assignedNodes().length === 0)}"
    ></slot>
    <slot
      name="footer"
      slot="${this._emptyFooter ? '' : 'footer'}"
      @slotchange="${(e) =>
    (this._emptyFooter = e.target.assignedNodes().length === 0)}"
    ></slot>
  </appmiral-card>
    `;
  }
};

if (!window.customElements.get('appmiral-pane')) {
  customElements.define('appmiral-pane', AppmiralPane);
}