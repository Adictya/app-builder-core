/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.
 Use without a license or in violation of any license terms and conditions (including use for
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more
 information visit https://appbuilder.agora.io.
*********************************************
*/
import {AppRegistry} from 'react-native';
import Video from './src/App';

// AppRegistry.runApplication('App', {
//   initialProps: {},
//   rootTag: document.getElementById('react-app'),
// });

export const methods = {
  logger: (wow) => console.log(wow),
};

class AppBuilder extends HTMLElement {
  connectedCallback() {
    this.style.height = '100%';
    this.style.width = '100%';
    this.style.display = 'flex';
    AppRegistry.registerComponent('App', () => Video);
    AppRegistry.runApplication('App', {
      initialProps: {passphrase: this.getAttribute('passphrase')},
      // initialProps: {},
      rootTag: this,
    });
  }
}

customElements.define('app-builder', AppBuilder);
