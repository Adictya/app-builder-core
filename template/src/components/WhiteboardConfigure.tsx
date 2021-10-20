import React, {useState, useRef, useContext} from 'react';
import {createContext} from 'react';
import {WhiteWebSdk, RoomPhase, DefaultHotKeys, RoomErrorLevel, EventPhase} from 'white-web-sdk';
import useMount from './useMount';
import ToolBox from '@netless/tool-box';
import ChatContext from './ChatContext';

export const WhiteboardContext = createContext({});

const WhiteboardConfigure = (props) => {
  // TODO: Make the state more granular
  const [whiteboardState, setWhiteboardState] = useState(RoomPhase.Disconnected);
  const [whiteboardActive, setWhiteboardActive] = useState(false);

  const whiteWebSdkClient = useRef();
  const whiteboardRoom = useRef();
  const whiteBoardProps = {
    wbUuid: '7ff876b02c2311ecb631d7c9baf6f921',
    wbToken:
      'NETLESSROOM_YWs9MWg0VXFXVDR5Yi1RUC1QYyZub25jZT0xNjM0Mjk4MzQzMzQ2MDAmcm9sZT0wJnNpZz05NTI1ODhjYjBlYWY4ZTY2MzVmNTBhYjkzNWYwN2E5MzBkOTA3NDE1Y2U0YTg4ZDkwN2M5MTM4YzdkOTZlNWYyJnV1aWQ9N2ZmODc2YjAyYzIzMTFlY2I2MzFkN2M5YmFmNmY5MjE',
    wbAppIdentifier: ' ',
  };
  const whiteboardElement = useRef();

  const updateRoomPhase = (phase: RoomPhase) => {
    if(phase !== RoomPhase.Connected){
      setWhiteboardState(phase)
    }
  };

  const bindRoom = () => {
    if(whiteboardRoom.current)
    whiteboardRoom.current.bindHtmlElement(whiteboardElement.current);
  };

  const unBindRoom = () => {
    if(whiteboardRoom.current)
    whiteboardRoom.current.bindHtmlElement();
  };

  const joinWhiteboardRoom = () => {
    setWhiteboardActive(true);
    whiteWebSdkClient.current
      .joinRoom(
        {
          uuid: whiteBoardProps.wbUuid,
          roomToken: whiteBoardProps.wbToken,
          floatBar: true,
          isWritable: true,
          hotKeys: {
            ...DefaultHotKeys,
            changeToSelector: 's',
            changeToLaserPointer: 'z',
            changeToPencil: 'p',
            changeToRectangle: 'r',
            changeToEllipse: 'c',
            changeToEraser: 'e',
            changeToText: 't',
            changeToStraight: 'l',
            changeToArrow: 'a',
            changeToHand: 'h',
          },
        },
        {
          onPhaseChanged: (phase: RoomPhase) => {
            updateRoomPhase(phase);
          },
        },
      )
      .then((room) => {
        whiteboardRoom.current = room;
        setWhiteboardState(RoomPhase.Connected)
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
        unBindRoom()
      })
      .catch((err) => {
        console.log(err);
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
      value={{
        whiteboardActive,
        joinWhiteboardRoom,
        leaveWhiteboardRoom,
        bindRoom,
        unBindRoom,
        whiteboardState,
        whiteboardElement,
      }}
    >
      {props.children}
    </WhiteboardContext.Provider>
  );
};

export default WhiteboardConfigure;
