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
import React, {useContext} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {MaxVideoView} from '../../agora-rn-uikit';
import {RtcContext} from '../../agora-rn-uikit';
import chatContext from './ChatContext';
import ColorContext from './ColorContext';
import FallbackLogo from '../subComponents/FallbackLogo';
import Layout from '../subComponents/LayoutEnum';
import ScreenShareNotice from '../subComponents/ScreenShareNotice';
import {RFValue} from 'react-native-responsive-fontsize';
import networkQualityContext from './NetworkQualityContext';
import {NetworkQualityPill} from '../subComponents/NetworkQualityPill';
import {ImageIcon} from '../../agora-rn-uikit';
import TextWithTooltip from '../subComponents/TextWithTooltip';

const GridVideoRenderer = ({user, index, viewProps}) => {
  const {height, width} = useWindowDimensions();
  const {dispatch} = useContext(RtcContext);
  const {primaryColor} = useContext(ColorContext);
  const networkQualityStat = useContext(networkQualityContext);
  const {userList, localUid} = useContext(chatContext);
  const {setLayout, dims} = viewProps;

  return (
    <Pressable
      onPress={() => {
        if (index !== 0) {
          dispatch({
            type: 'SwapVideo',
            value: [user],
          });
        }
        setLayout(Layout.Pinned);
      }}
      style={{
        flex: Platform.OS === 'web' ? 1 / dims.c : 1,
        marginHorizontal: 'auto',
      }}>
      <View style={style.gridVideoContainerInner}>
        <NetworkQualityPill
          networkStat={
            // When no network quality reported and if user has no stream
            // published show "unsupported" else show "loading"
            networkQualityStat[user.uid]
              ? networkQualityStat[user.uid]
              : user.audio || user.video
              ? 8
              : 7
          }
          primaryColor={primaryColor}
          rootStyle={{top: 5, left: 5}}
        />
        <ScreenShareNotice uid={user.uid} />
        <MaxVideoView
          fallback={() => {
            if (user.uid === 'local') {
              return FallbackLogo(userList[localUid]?.name);
            } else if (String(user.uid)[0] === '1') {
              return FallbackLogo('PSTN User');
            } else {
              return FallbackLogo(userList[user?.uid]?.name);
            }
          }}
          user={user}
          key={user.uid}
        />
        <View
          style={{
            zIndex: 5,
            marginTop: -30,
            backgroundColor: $config.SECONDARY_FONT_COLOR + 'bb',
            alignSelf: 'flex-end',
            paddingHorizontal: 8,
            height: 30,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            maxWidth: '100%',
            flexDirection: 'row',
          }}>
          <View style={[style.MicBackdrop]}>
            <ImageIcon
              name={user.audio ? 'mic' : 'micOff'}
              color={user.audio ? primaryColor : 'red'}
              style={style.MicIcon}
            />
          </View>
          <View style={{flex: 1}}>
            <TextWithTooltip
              value={
                user.uid === 'local'
                  ? userList[localUid]
                    ? userList[localUid].name + ' '
                    : 'You '
                  : userList[user.uid]
                  ? userList[user.uid].name + ' '
                  : user.uid === 1
                  ? userList[localUid]?.name + "'s screen "
                  : String(user.uid)[0] === '1'
                  ? 'PSTN User '
                  : 'User '
              }
              style={{
                color: $config.PRIMARY_FONT_COLOR,
                lineHeight: 30,
                fontSize: RFValue(14, height > width ? height : width),
                fontWeight: '700',
                flexShrink: 1,
              }}
            />
          </View>
        </View>
      </View>
    </Pressable>
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
export default GridVideoRenderer;
