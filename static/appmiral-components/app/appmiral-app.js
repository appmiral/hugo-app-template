import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';

export class AppmiralApp extends LitElement {
  static properties = {
    theme: { type: String, reflect: true },
    padding: { type: String, reflect: true },
    flexDirection: { type: String, attribute: 'flex-direction' },
    flat: { type: Boolean },
    scrollable: { type: Boolean, reflect: true },
  };

  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          background-color: rgb(var(--base-1));
        }
        :host([flat]) {
          background-color: rgb(var(--base-3));
        }
        .center-wrapper,
        slot {
          display: flex;
        }
        .center-wrapper,
        slot:not([name]) {
          flex: 1;
          overflow: hidden;
        }
        :host([scrollable]) slot:not([name]) {
          overflow: auto;
        }
        slot[name='top'],
        slot[name='bottom'],
        :host([flex-direction='column']) slot:not([name]) {
          flex-direction: column;
        }
      `,
    ]
  }

  constructor() {
    super();
    // Declare reactive properties
    this.flexDirection = 'row';
    this.padding = '16px';
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <slot name="top"></slot>
      <div class="center-wrapper">
        <slot name="left"></slot>
        <slot style="padding: ${this.padding}"></slot>
        <slot name="right"></slot>
      </div>
      <slot name="bottom"></slot>
    `;
  }
};

if (!window.customElements.get('appmiral-app')) {
  customElements.define('appmiral-app', AppmiralApp);
}