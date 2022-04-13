/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and
documentation (the “Materials”) are owned by Agora Lab, Inc. and its licensors.
The Materials may not be accessed, used, modified, or distributed for any
purpose without a license from Agora Lab, Inc. Use without a license or in
violation of any license terms and conditions (including use for any purpose
competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more
 information visit https://appbuilder.agora.io.
*********************************************
*/
/**
 * @format
 */
import {fpeConfig} from 'fpe-api';
import React,{useEffect, useState} from 'react';

import App from './src/App';
import { installFPE } from 'fpe-api/install';

const SDKEvents = {
  eventsMap: {addFpe: () => {}},
  on: function (eventName, cb) {
    this.eventsMap[eventName] = cb;
  },
  emit: function (eventName, ...args) {
    this.eventsMap[eventName](...args);
  },
};

const AppBuilderView = () => {
  const [fpe, setFpe] = useState(fpeConfig);
  useEffect(() => {
    SDKEvents.on('addFpe', (sdkFpeConfig) => {
      setFpe(sdkFpeConfig);
    });
  }, []);
  return (
    <>
      <App fpeOverride={fpe} />
    </>
  );
};

const AppBuilder = {
  View: AppBuilderView,
  addFpe: (fpeConfig) => {
    SDKEvents.emit('addFpe', fpeConfig);
  },
  createFpe: installFPE
};

export default AppBuilder;
