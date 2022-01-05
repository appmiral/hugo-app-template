import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';

export class AppmiralIcon extends LitElement {
  static properties = {
    icon: {type: String, reflect: true},
    color: {type: String, reflect: true},
    size: {type: String, reflect: true},

    button: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      sharedStyles,
      css`
      
      :host {
        font-family: 'md-icons';
        line-height: 1;
        -webkit-font-smoothing: auto;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'liga';
        opacity: 0.9;
        color: var(--text-1);
        transition: var(--transition-1);
        height: max-content;
        width: max-content;
        min-height: max-content;
        min-width: max-content;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      :host([button]) {
        opacity: 0.6;
        cursor: pointer;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.2;
      }
      /* size */
      :host([size='xl']) {
        height: 48px;
        width: 48px;
        font-size: 48px;
      }
      :host([size='l']) {
        height: 32px;
        width: 32px;
        font-size: 32px;
      }
      :host([size='m']) {
        height: 24px;
        width: 24px;
        font-size: 24px;
      }
      :host([size='s']) {
        height: 16px;
        width: 16px;
        font-size: 16px;
      }
      /* hover inputs */
      @media (hover: hover) {
        :host([button]:hover:not(:active)) {
          opacity: 0.9;
        }
      }
      `,
    ]
  }

  constructor() {
    super();
    // Declare reactive properties
    this.size = 'm';
  }

  // Render the UI as a function of component state
  render() {
    return html` ${this.icon?.indexOf('url') ? html` ${this.icon} ` : ''}`;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
    if (name == 'color' && this.color) {
      this.style.color = this.color;
    } else if (name == 'icon' && newval.indexOf('url') > -1) {
      this.setBackgroundImage(newval);
    }
  }
};

if (!window.customElements.get('appmiral-icon')) {
  customElements.define('appmiral-icon', AppmiralIcon);
}