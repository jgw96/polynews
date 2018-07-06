import { LitElement, html } from '@polymer/lit-element';

import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';

import { ListStyles } from '../styles/list-styles'

class HeadlinesList extends LitElement {
  _render(props) {
    return html`
     ${ListStyles} 
     ${props.articles.map((i) => html`
    <paper-card alt=${i.title} heading=${i.title} image=${i.urlToImage}>
      <div class="card-content">
        ${i.description}
      </div>
    
      <div class="card-actions">
        <paper-button on-click="${() => this.read(i.url)}" id='readButton'>Read</paper-button>
        <paper-button on-click="${() => this.saveArticle(i)}" id='readButton'>Save</paper-button>
      </div>
    </paper-card>
    `)}

    <snack-bar active?="${this._snackbarOpened}">
        Article Saved </snack-bar>
    `;
  }

  static get properties() {
    return {
      articles: Array,
      _snackbarOpened: Boolean
    }
  };

  constructor() {
    super();
    this._snackbarOpened = false;
  }

  read(link) {
    window.open(link, '_blank');
  }

  async saveArticle(item) {
    const module = await import('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs');

    const savedItems = await module.get('savedItems');
    if (savedItems !== undefined) {
      savedItems.push(item);
      await module.set('savedItems', savedItems);
    } else {
      await module.set('savedItems', [item])
    }

    this._snackbarOpened = true;
    setTimeout(() => this._snackbarOpened = false, 1000);
  }
}

window.customElements.define('headlines-list', HeadlinesList);
