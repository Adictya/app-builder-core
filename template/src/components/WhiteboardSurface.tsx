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

import React, {useRef, useEffect, useContext} from 'react';
import {WhiteboardContext} from '../components/WhiteboardConfigure';
import {StyleSheet, View} from 'react-native';
import {RoomPhase, ApplianceNames} from 'white-web-sdk';
import WhiteboardToolBox from './WhiteboardToolBox';
import ToolBox from '@netless/tool-box';

const WhiteboardSurface = () => {
  const wbSurfaceRef = useRef();
  const {
    whiteboardActive,
    whiteboardState,
    bindRoom,
    unBindRoom,
    whiteboardRoom,
    whiteboardElement,
  } = useContext(WhiteboardContext);

  useEffect(
    function () {
      if (whiteboardActive) {
        bindRoom();
      }
      return () => {
        unBindRoom();
      };
    },
    [whiteboardState],
  );

  return (
    <View style={style.flex1}>
      <View
        style={style.WhiteBoardContainer}
        ref={whiteboardElement}
        key="whiteboard"
      ></View>
      {whiteboardState == RoomPhase.Connected && (
          <WhiteboardToolBox whiteboardRoom={whiteboardRoom}/>
      )}
    </View>
  );
};
          // <View style={style.toolboxContainer}>
          // <ToolBox room={whiteboardRoom.current} />

const style = StyleSheet.create({
  flex1: {flex: 1, position: 'relative'},
  WhiteBoardContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    border: `2px solid ${$config.PRIMARY_COLOR}`,
    borderRadius: 10,
  },
  toolboxContainer: {
    position: 'absolute',
    paddingTop: 50,
    paddingLeft: 20,
  },
});

export default WhiteboardSurface;
