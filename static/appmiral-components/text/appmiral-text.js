import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';

export class AppmiralText extends LitElement {
  static properties = {
    size: {type: String, reflect: true},
    color: {type: String, reflect: true},
  };

  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          color: var(--text-1);
          transition: var(--transition-1);
        }
        :host([size='body-1']) {
          font: var(--body-1);
        }
        :host([size='body-2']) {
          font: var(--body-2);
        }
        :host([size='header-1']) {
          font: var(--header-1);
        }
        :host([size='header-2']) {
          font: var(--header-2);
        }
      `,
    ]
  }

  constructor() {
    super();
    // Declare reactive properties
    this.size = 'body-1';
  }

  // Render the UI as a function of component state
  render() {
    return html`<slot></slot>`;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
    if (name == 'color' && this.color) {
      this.style.color = this.color;
    }
  }
};

if (!window.customElements.get('appmiral-text')) {
  customElements.define('appmiral-text', AppmiralText);
}