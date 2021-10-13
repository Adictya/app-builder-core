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

import React, {useContext, useEffect, useRef} from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import icons from '../assets/icons';
import ColorContext from '../components/ColorContext';

import WhiteWebSdk from 'white-web-sdk';
import RtcEngine from 'react-native-agora';
import useMount from '../components/useMount';

const WhiteboardOld = () => {
  // const [whiteBoardParams, setWhiteBoardParams] = useState({
  //   uuid: null,
  // });

  const roomUuid = '7ff876b02c2311ecb631d7c9baf6f921';

  const createRoom = async () => {
    const roomDetails = await fetch('https://api.netless.link/v5/rooms', {
      method: 'POST',
      headers: {
        token: $config.WHITE_SDK_TOKEN,
        region: 'cn-hz',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isRecord: false,
      }),
    });

    return roomDetails.json();
  };

  const printUUID = async () => {
    const roomObject = await createRoom();
    console.log('grood2', roomObject);
  };

  useMount(() => {
    // printUUID();
  });

  return <></>;
};

interface WhiteBoardButtonProps {
  whiteBoardActive: boolean;
  setWhiteBoardActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const WhiteboardButton = (props: WhiteBoardButtonProps) => {
  const {primaryColor} = useContext(ColorContext);
  const {whiteBoardActive, setWhiteBoardActive} = props;

  return (
    <TouchableOpacity>
      <View
        style={
          whiteBoardActive
            ? style.greenLocalButton
            : [style.localButton, {borderColor: primaryColor}]
        }>
        <Image
          source={{
            uri: whiteBoardActive
              ? icons.screenshareOffIcon
              : icons.screenshareIcon,
          }}
          style={[style.buttonIcon, {tintColor: primaryColor}]}
          resizeMode={'contain'}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 5,
          color: $config.PRIMARY_COLOR,
        }}>
        Draw
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  localButton: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    borderRadius: 20,
    borderColor: $config.PRIMARY_COLOR,
    width: 40,
    height: 40,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenLocalButton: {
    backgroundColor: '#4BEB5B',
    borderRadius: 20,
    borderColor: '#F86051',
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: '90%',
    height: '90%',
    tintColor: $config.PRIMARY_COLOR,
  },
});

export default WhiteboardButton;
