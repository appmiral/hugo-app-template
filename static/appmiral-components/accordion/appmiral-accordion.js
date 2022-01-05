import { html, css, LitElement } from 'https://unpkg.com/lit?module';
import { sharedStyles } from '../shared-styles.js';
import '../icon/appmiral-icon.js';
import '../card/appmiral-card.js';

export class AppmiralAccordion extends LitElement {
  static properties = {
    label: {type: String, reflect: true},
    icon: {type: String, reflect: true},
    expanded: {type: Boolean, reflect: true},
    disabled: {type: Boolean, reflect: true},

    _emptyHeader: {type: Boolean, state: true},
    _emptyFunctions: {type: Boolean, state: true},
    _emptyBody: {type: Boolean, state: true},
    _emptyFooter: {type: Boolean, state: true},
  };

  // Define scoped styles right with your component, in plain CSS
  static get styles() {
    return [
      sharedStyles,
      css`
      :host(:not([expanded])) appmiral-card {
        cursor: pointer;
      }
      appmiral-card {
        padding: 8px 16px;
      }
      slot:not([name]) {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        transition: var(--transition-1);
      }
      /* expanded */
      :host(:not([expanded])) slot:not([name]) {
        margin-top: 0;
        max-height: 0px;
        opacity: 0;
        overflow: hidden;
      }
      .header {
        overflow: hidden;
        cursor: pointer;
        display: flex;
        flex: 1;
      }
      .icon {
        margin-right: 8px;
      }
      slot[name='header'] p {
        margin-right: 8px;
        font: var(--header-1);
        color: var(--text-1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        flex: 1;
      }
      :host([expanded]) .expand {
        transform: rotate(180deg);
      }
      /* disabled */
      :host([disabled]) .header {
        opacity: 0.2;
      }
      :host([disabled]) appmiral-card {
        pointer-events: none;
      }
      `,
    ]
  }

  constructor() {
    super();
    // Declare reactive properties
    this.label = 'Label';

    this._emptyHeader = true;
    this._emptyFunctions = true;
    this._emptyBody = true;
    this._emptyFooter = true;
  }

  // Render the UI as a function of component state
  render() {
    return html`
    <appmiral-card
    @click="${() => (!this.expanded ? (this.expanded = true) : '')}"
  >
    <slot
      name="header"
      slot="header"
      @click="${(e) => this.handleCollapse(e)}"
    >
      <div class="header">
        ${this.icon
          ? html` <appmiral-icon class="icon" icon="${this.icon}"></appmiral-icon> `
          : ''}
        <p>${this.label}</p>
        <appmiral-icon
          button
          class="expand"
          icon="keyboard_arrow_down"
        ></appmiral-icon>
      </div>
    </slot>
    <slot></slot>
    <slot name="functions" slot="functions"></slot>
    ${this.expanded
      ? html`
          <slot
            name="footer"
            slot="${this._emptyFooter ? 'hidden' : 'footer'}"
            @slotchange="${(e) =>
              (this._emptyFooter = e.target.assignedNodes().length === 0)}"
          ></slot>
        `
      : ''}
  </appmiral-card>
    `;
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  connectedCallback() {
    super.connectedCallback();
    // remove card padding
    setTimeout(() => {
      const topNode = this.shadowRoot
        ?.querySelector('appmiral-card')
        ?.shadowRoot?.querySelector('.top');
      if (topNode) {
        topNode.style.padding = '0';
      }
    }, 0);
  }

  handleCollapse(e) {
    if (this.expanded) {
      this.expanded = false;
      e.stopPropagation();
    }
  }
};

if (!window.customElements.get('appmiral-accordion')) {
  customElements.define('appmiral-accordion', AppmiralAccordion);
}