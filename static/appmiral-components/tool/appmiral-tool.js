import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';
import '../text/appmiral-text.js';
import '../icon/appmiral-icon.js';


export class AppmiralTool extends LitElement {
  static properties = {
    label: {type: String, reflect: true},
    icon: {type: String, reflect: true},
    size: {type: String, reflect: true},
    href: {type: String, reflect: true},
    toggle: { type: Boolean, reflect: true },
    active: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: max-content;
          padding: 4px;
          box-sizing: border-box;
          transition: var(--transition-1);
          cursor: pointer;
          border-radius: var(--border-radius);
        }
        .label {
          display: -webkit-box;
          width: 100%;
          line-height: 12px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        /* size */
        :host([size='m']) {
          height: 56px;
          width: 56px;
        }
        :host([size='s']) {
          height: 32px;
          width: 32px;
        }
        /* active */
        :host([active]) {
          background-color: rgba(var(--neutral-1), 0.1);
        }
        /* disabled */
        :host([disabled]) {
          pointer-events: none;
          opacity: 0.2;
        }
        /* hover inputs */
        @media (hover: hover) {
          :host(:not(:active):not([active]):hover) {
            background-color: rgba(var(--neutral-1), 0.05);
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
    return html`
      ${this.icon ? html` <appmiral-icon @click="${this.clickHandler}" icon="${this.icon}"></appmiral-icon> ` : ''}
      ${this.label && !(this.icon && this.size == 's')
        ? html` <appmiral-text class="label" size="body-2" @click="${this.clickHandler}">${this.label}</appmiral-text> `
        : ''}
    `;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
    // add toggle click listener
    if (name == 'toggle' && this.toggle) {
      this.addEventListener('click', () => {
        this.active = !this.active;
      });
    }
  }

  clickHandler(e) {
    if(this.href) {
      window.location = this.href;
    }
  }


};

if (!window.customElements.get('appmiral-tool')) {
  customElements.define('appmiral-tool', AppmiralTool);
}