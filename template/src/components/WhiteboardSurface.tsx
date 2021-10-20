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
import {StyleSheet, View, Text} from 'react-native';
import {RoomPhase, ApplianceNames} from 'white-web-sdk';
import WhiteboardToolBox from './WhiteboardToolBox';

const WhiteboardSurface = ({showToolbox}) => {
  const wbSurfaceRef = useRef();
  const {
    whiteboardActive,
    whiteboardState,
    bindRoom,
    unBindRoom,
    whiteboardRoom,
    whiteboardElement,
  } = useContext(WhiteboardContext);

  useEffect(function () {
    // bindRoom();
    whiteboardRoom.current.bindHtmlElement(document.getElementById('whiteboard'));
    return () => {
    whiteboardRoom.current.bindHtmlElement(null);
      // unBindRoom();
    };
  }, []);

  return (
    <View style={style.flex1}>
      <View
        style={style.WhiteBoardContainer}
        ref={whiteboardElement}
        nativeID="whiteboard"
        key="whiteboard"
      ></View>
      {whiteboardState == RoomPhase.Connected ? (
        showToolbox && <WhiteboardToolBox whiteboardRoom={whiteboardRoom} />
      ) : (
        <View style={style.placeholder}>
          <Text>Whiteboard is initializing</Text>
        </View>
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
  placeholder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000008',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolboxContainer: {
    position: 'absolute',
    paddingTop: 50,
    paddingLeft: 20,
  },
});

export default WhiteboardSurface;
