import React, {useState, useRef, useContext, useEffect, createElement} from 'react';
import {createContext} from 'react';
import {
  WhiteWebSdk,
  RoomPhase,
  DefaultHotKeys,
  RoomErrorLevel,
  EventPhase,
} from 'white-web-sdk';
import useMount from './useMount';
import ToolBox from '@netless/tool-box';
import ChatContext from './ChatContext';

export const whiteboardContext = createContext({});

export const whiteboardPaper = document.createElement('div');
whiteboardPaper.className = "whiteboardPaper"

const WhiteboardConfigure = (props) => {
  // TODO: Make the state more granular
  const [whiteboardState, setWhiteboardState] = useState(
    RoomPhase.Disconnected,
  );
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const [whiteboardRoomActive, setWhiteboardRoomActive] = useState(0);

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
    if (phase !== RoomPhase.Connected) {
      setWhiteboardState(phase);
    }
  };

  const testFunc = () => {
    whiteboardRoom.current.cleanCurrentScene();
  };

  /*
  const bindRoom = () => {
    if(whiteboardState == RoomPhase.Disconnected || whiteboardState == RoomPhase.Disconnecting )
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
        // whiteboardRoom.current.bindHtmlElement(whiteboardElement.current);
        whiteboardRoom.current.bindHtmlElement(
            document.getElementById('whiteboard'),
            );
      })
      .catch((err) => {
        console.log(err);
      });
    // if(whiteboardRoom.current)
    // whiteboardRoom.current.bindHtmlElement(whiteboardElement.current);
    // whiteboardRoom.current.refreshViewSize();
    // joinWhiteboardRoom();
  };

  const unBindRoom = () => {
    if(whiteboardState == RoomPhase.Connected || whiteboardState == RoomPhase.Connecting )
    if(whiteboardRoom.current)
    whiteboardRoom.current
      .disconnect()
      .then(() => {
        // unBindRoom()
          whiteboardRoom.current.bindHtmlElement(null);
      })
      .catch((err) => {
        console.log(err);
      });
    // whiteboardRoom.current.bindHtmlElement();
  };

  const joinWhiteboardRoom = () => {
    if(!whiteboardActive){
    setWhiteboardActive(true);
    bindRoom();}
  };

  const leaveWhiteboardRoom = () => {
    // whiteboardRoom.current
    //   .disconnect()
    //   .then(() => {
    //     // unBindRoom()
    //       whiteboardRoom.current.bindHtmlElement();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    if(whiteboardActive){
    setWhiteboardActive(false);
    unBindRoom();}
  };
  */

  // /*
  const bindRoom = () => {
    if (whiteboardRoom.current)
      whiteboardRoom.current.bindHtmlElement(
        document.getElementById('whiteboard'),
      );
  };

  const unBindRoom = () => {
    if (whiteboardRoom.current) {
      whiteboardRoom.current.bindHtmlElement(null);
      whiteboardRoom.current = null;
    }
  };

  const _joinWhiteboardRoom = () => {
    // setWhiteboardActive(true);
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
          window.room = room;
          whiteboardRoom.current = room;
          whiteboardRoom.current.bindHtmlElement(whiteboardPaper);
          setWhiteboardState(RoomPhase.Connected);
          setWhiteboardRoomActive(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _leaveWhiteboardRoom = () => {
    // setWhiteboardActive(false);
    whiteboardRoom.current
      .disconnect()
      .then(() => {
        // unBindRoom()
        whiteboardRoom.current.bindHtmlElement();
        setWhiteboardRoomActive(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // */
  const joinWhiteboardRoom = () => {
          // whiteboardRoomActive !== 1
    setWhiteboardActive(true);
  };

  const leaveWhiteboardRoom = () => {
    setWhiteboardActive(false);
  };

  useEffect(() => {
    console.log('WHITECONFIGURE:', whiteboardActive);
    if (!whiteWebSdkClient.current && whiteboardActive) {
      const appIdentifier = 'sQiiICtvEeyWGfeDVd9B7A/Kbv5q0_GAqx8Nw';
      whiteWebSdkClient.current = new WhiteWebSdk({
        appIdentifier: appIdentifier,
        region: 'cn-hz',
      });
      _joinWhiteboardRoom();
      setWhiteboardRoomActive(1);
    } else if (whiteboardActive && whiteWebSdkClient.current) {
      _joinWhiteboardRoom();
      setWhiteboardRoomActive(1);
    } else {
      if (whiteboardRoom.current) {
        _leaveWhiteboardRoom();
        setWhiteboardRoomActive(1);
      }
    }
  }, [whiteboardActive]);

  // useMount(() => {
  //   const appIdentifier = 'sQiiICtvEeyWGfeDVd9B7A/Kbv5q0_GAqx8Nw';
  //   whiteWebSdkClient.current = new WhiteWebSdk({
  //     appIdentifier: appIdentifier,
  //     region: 'cn-hz',
  //   });
  // });

  return (
    <whiteboardContext.Provider
      value={{
        whiteboardActive,
        whiteboardRoomActive,
        joinWhiteboardRoom,
        leaveWhiteboardRoom,
        whiteboardRoom,
        bindRoom,
        unBindRoom,
        whiteboardState,
        whiteboardElement,
        testFunc,
      }}
    >
      {props.children}
    </whiteboardContext.Provider>
  );
};

export default WhiteboardConfigure;
