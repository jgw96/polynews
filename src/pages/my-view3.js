/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from '../components/page-view-element.js';

import '../components/headlines-list.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles';
import { View1Styles } from '../styles/view1-styles';

class MyView3 extends PageViewElement {

  static get properties() {
    return {
      // This is the data from the store.
      _headlines: Array
    }
  }

  constructor() {
    super();
    this._headlines = [];
  }

  async _firstRendered() {
    console.log('here');
    const module = await import('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs');
    this._headlines = await module.get('savedItems');
  }

  _render() {
    return html`
       ${SharedStyles}
       ${View1Styles}
      <section>
        <ul>
          <headlines-list articles=${this._headlines}></headlines-list>
        </ul>
      </section>
    `;
  }

}

window.customElements.define('my-view3', MyView3);
