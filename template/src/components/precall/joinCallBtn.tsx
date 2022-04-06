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

import React, { useContext, useEffect } from 'react';
import PrimaryButton from '../../atoms/PrimaryButton';
import { usePreCall } from 'fpe-api';
import { useString } from '../../utils/useString';
import { PropsContext } from '../../../agora-rn-uikit';

const joinCallBtn: React.FC = () => {

  const {rtcProps} = useContext(PropsContext);
  const [buttonText, setButtonText] = React.useState('Join Room');

  useEffect(() => {
    let clientRole = '';
    if (rtcProps?.role == 1) {
      clientRole = 'Host';
    }
    if (rtcProps?.role == 2) {
      clientRole = 'Audience';
    }
    setButtonText(
      $config.EVENT_MODE ? `Join Room as ${clientRole}` : `Join Room`,
    );
  }, [rtcProps?.role]);
  
  const { setCallActive, queryComplete, username, error } = usePreCall(data => data)
  //const joinRoomButton = useString('joinRoomButton');

  return (
    <PrimaryButton
      onPress={() => setCallActive(true)}
      disabled={!queryComplete || username === '' || error}
      text={queryComplete ? buttonText : 'Loading...'}      
    />
  )
}

export default joinCallBtn;