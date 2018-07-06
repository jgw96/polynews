import { LitElement, html } from '@polymer/lit-element';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';

import { ListStyles } from '../styles/list-styles'

class SourcesList extends LitElement {
  _render(props) {
    return html`
     ${ListStyles} ${props.sources.map((i) => html`
    <a href='/sourceHeadlinesView#${i.id}' tabindex="-1">
      <paper-item>
        <paper-item-body two-line>
          <div>${i.name}</div>
          <div secondary>${i.description}</div>
        </paper-item-body>
      </paper-item>
    </a>
    `)}
    `;
  }

  static get properties() {
    return {
      sources: Array
    }
  };
}

window.customElements.define('sources-list', SourcesList);
