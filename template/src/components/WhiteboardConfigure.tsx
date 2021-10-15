import React, {useState, useRef} from 'react';
import {createContext} from 'react';
import {WhiteWebSdk} from 'white-web-sdk';
import useMount from './useMount';

export const WhiteboardContext = createContext({});

const WhiteboardConfigure = (props) => {
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const whiteWebSdkClient = useRef();
  const whiteboardRoom = useRef();
  const whiteBoardProps = {
    wbUuid: '7ff876b02c2311ecb631d7c9baf6f921',
    wbToken:
      'NETLESSROOM_YWs9MWg0VXFXVDR5Yi1RUC1QYyZub25jZT0xNjM0Mjk4MzQzMzQ2MDAmcm9sZT0wJnNpZz05NTI1ODhjYjBlYWY4ZTY2MzVmNTBhYjkzNWYwN2E5MzBkOTA3NDE1Y2U0YTg4ZDkwN2M5MTM4YzdkOTZlNWYyJnV1aWQ9N2ZmODc2YjAyYzIzMTFlY2I2MzFkN2M5YmFmNmY5MjE',
    wbAppIdentifier: ' ',
  };

  const joinWhiteboardRoom = () => {
    setWhiteboardActive(true);
    whiteWebSdkClient.current
      .joinRoom({
        uuid: whiteBoardProps.wbUuid,
        roomToken: whiteBoardProps.wbToken,
      })
      .then((room) => {
        whiteboardRoom.current = room;
        room.bindHtmlElement(document.getElementById('Whiteboard'));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const leaveWhiteboardRoom = () => {
    setWhiteboardActive(false);
    whiteboardRoom.current
      .disconnect()
      .then(() => {
        // setWhiteboardActive(false);
      })
      .catch((err) => {
        console.log(err);
        // setWhiteboardActive(false);
      });
  };

  useMount(() => {
    const appIdentifier = 'sQiiICtvEeyWGfeDVd9B7A/Kbv5q0_GAqx8Nw';
    whiteWebSdkClient.current = new WhiteWebSdk({
      appIdentifier: appIdentifier,
      region: 'cn-hz',
    });
  });

  return (
    <WhiteboardContext.Provider
      value={{whiteboardActive, joinWhiteboardRoom, leaveWhiteboardRoom}}>
      {props.children}
    </WhiteboardContext.Provider>
  );
};

export default WhiteboardConfigure;
