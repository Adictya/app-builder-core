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
import {whiteboardContext} from '../components/WhiteboardConfigure';
import {StyleSheet, View, Text} from 'react-native';
import {RoomPhase, ApplianceNames} from 'white-web-sdk';
import WhiteboardToolBox from './WhiteboardToolBox';
import WhiteboardCanvas from './WhiteboardCanvas';

interface WhiteboardViewInterface{
  showToolbox?: boolean
}

const WhiteboardView:React.FC<WhiteboardViewInterface> = ({showToolbox}) => {
  const wbSurfaceRef = useRef();
  const {
    whiteboardRoomState,
  } = useContext(whiteboardContext);


  return (
    <View style={style.flex1}>
      {whiteboardRoomState == RoomPhase.Connected ? (
        <WhiteboardCanvas showToolbox={showToolbox}/>
      ) : (
        <View style={style.placeholder}>
          <Text>Whiteboard is initializing</Text>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  flex1: {flex: 1, position: 'relative'},
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

export default WhiteboardView;
