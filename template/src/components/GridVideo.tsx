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
import React, {useMemo, useContext, useState} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {MinUidContext} from '../../agora-rn-uikit';
import {MaxUidContext} from '../../agora-rn-uikit';
import {MaxVideoView} from '../../agora-rn-uikit';
import {RtcContext} from '../../agora-rn-uikit';
import chatContext from './ChatContext';
import icons from '../assets/icons';
import ColorContext from './ColorContext';
import FallbackLogo from '../subComponents/FallbackLogo';
import Layout from '../subComponents/LayoutEnum';
import ScreenShareNotice from '../subComponents/ScreenShareNotice';
import {RFValue} from 'react-native-responsive-fontsize';
import networkQualityContext from './NetworkQualityContext';
import {NetworkQualityPill} from '../subComponents/NetworkQualityPill';
import {ImageIcon} from '../../agora-rn-uikit';
import TextWithTooltip from '../subComponents/TextWithTooltip';

const layout = (len: number, isDesktop: boolean = true) => {
  const rows = Math.round(Math.sqrt(len));
  const cols = Math.ceil(len / rows);
  let [r, c] = isDesktop ? [rows, cols] : [cols, rows];
  return {
    matrix:
      len > 0
        ? [
            ...Array(r - 1)
              .fill(null)
              .map(() => Array(c).fill('X')),
            Array(len - (r - 1) * c).fill('X'),
          ]
        : [],
    dims: {r, c},
  };
};

// const isDesktop = Platform.OS === 'web';

interface GridVideoProps {
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
  Videos: any;
}

const GridVideo = ({setLayout, Videos}: GridVideoProps) => {
  const {height, width} = useWindowDimensions();
  const {dispatch} = useContext(RtcContext);
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);
  const {primaryColor} = useContext(ColorContext);
  const networkQualityStat = useContext(networkQualityContext);
  const {userList, localUid} = useContext(chatContext);
  const users = [...max, ...min];
  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isDesktop = dim[0] > dim[1] + 100;

  let {matrix, dims} = useMemo(
    () => layout(users.length, isDesktop),
    [users.length, isDesktop],
  );

  const videoArray = Videos({setLayout, dims, layout: Layout.Grid});
  return (
    <View
      style={[style.full, {paddingHorizontal: isDesktop ? 50 : 0}]}
      onLayout={onLayout}>
      {matrix.map((r, ridx) => (
        <View style={style.gridRow} key={ridx}>
          {r.map((c, cidx) => videoArray[ridx * dims.c + cidx])}
        </View>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  full: {
    flex: 1,
    // padding: 20,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
  },
  gridVideoContainerInner: {
    // borderColor: '#fff',
    // borderWidth:2,
    // width: '100%',
    borderRadius: 15,
    flex: 1,
    overflow: 'hidden',
    // margin: 1,
    marginHorizontal: 10,
  },
  MicBackdrop: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginRight: 20,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    display: 'flex',
    justifyContent: 'center',
  },
  MicIcon: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});
export default GridVideo;
