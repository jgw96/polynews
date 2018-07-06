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

import '../components/sources-list.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles';
import { View2Styles } from '../styles/view2-styles';

class MyView2 extends PageViewElement {

  static get properties() {
    return {
      sources: Array
    }
  }

  constructor() {
    super();
    this.sources = [];
  }

  _firstRendered() {
    this.fetchSources();
  }

  async fetchSources() {
    const key = '3f03728668574e6794634e6244b18091';
    const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${key}`);
    const data = await response.json();

    this.sources = data.sources;

    console.log(data.sources);
  }
  
  _render() {
    return html`
      ${SharedStyles}
      ${View2Styles}
      <section>
        <ul>
          <sources-list sources=${this.sources}></sources-list>
        </ul>
      </section>
    `;
  }
}

window.customElements.define('my-view2', MyView2);
