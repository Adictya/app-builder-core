import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {createContext} from 'react';
import {
  WhiteWebSdk,
  RoomPhase,
  Room,
} from 'white-web-sdk';
// import useMount from './useMount';

export const whiteboardPaper = document.createElement('div');
whiteboardPaper.className = 'whiteboardPaper';

export const whiteboardContext = createContext(
  {} as whiteboardContextInterface,
);

export interface whiteboardContextInterface {
  whiteboardActive: boolean;
  whiteboardRoomState: RoomPhase;
  joinWhiteboardRoom: () => void;
  leaveWhiteboardRoom: () => void;
  whiteboardRoom: React.Ref<Room>;
}

export interface WhiteboardPropsInterface {
  children: React.ReactNode;
}

const WhiteboardConfigure: React.FC<WhiteboardPropsInterface> = (props) => {
  // Defines intent, whether whiteboard should be active or not
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  // Defines whiteboard room state, whether disconnected, Connected, Connecting etc.
  const [whiteboardRoomState, setWhiteboardRoomState] = useState(
    RoomPhase.Disconnected,
  );

  const whiteWebSdkClient = useRef({} as WhiteWebSdk);
  const whiteboardRoom = useRef({} as Room);
  const whiteBoardProps = {
    wbUuid: '7ff876b02c2311ecb631d7c9baf6f921',
    wbToken:
      'NETLESSROOM_YWs9MWg0VXFXVDR5Yi1RUC1QYyZub25jZT0xNjM0Mjk4MzQzMzQ2MDAmcm9sZT0wJnNpZz05NTI1ODhjYjBlYWY4ZTY2MzVmNTBhYjkzNWYwN2E5MzBkOTA3NDE1Y2U0YTg4ZDkwN2M5MTM4YzdkOTZlNWYyJnV1aWQ9N2ZmODc2YjAyYzIzMTFlY2I2MzFkN2M5YmFmNmY5MjE',
    wbAppIdentifier: ' ',
  };

  const _join = () => {
    whiteWebSdkClient.current
      .joinRoom({
        uuid: whiteBoardProps.wbUuid,
        roomToken: whiteBoardProps.wbToken,
        floatBar: true,
        isWritable: true,
      })
      .then((room) => {
        whiteboardRoom.current = room;
        whiteboardRoom.current.bindHtmlElement(whiteboardPaper);
        setWhiteboardRoomState(RoomPhase.Connected);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const _leave = () => {
    try {
      whiteboardRoom.current
        .disconnect()
        .then(() => {
          whiteboardRoom.current.bindHtmlElement(null);
          setWhiteboardRoomState(RoomPhase.Disconnected);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const joinWhiteboardRoom = () => {
    setWhiteboardActive(true);
  };

  const leaveWhiteboardRoom = () => {
    setWhiteboardActive(false);
  };

  useEffect(() => {
    if (!whiteWebSdkClient.current.joinRoom && whiteboardActive) {
      const appIdentifier = 'sQiiICtvEeyWGfeDVd9B7A/Kbv5q0_GAqx8Nw';
      whiteWebSdkClient.current = new WhiteWebSdk({
        appIdentifier: appIdentifier,
        region: 'cn-hz',
      });
      _join();
      setWhiteboardRoomState(RoomPhase.Connecting);
    } else if (whiteboardActive) {
      _join();
      setWhiteboardRoomState(RoomPhase.Connecting);
    } else {
      if (whiteboardRoom.current) {
        _leave();
        setWhiteboardRoomState(RoomPhase.Disconnecting);
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
        whiteboardRoomState,
        joinWhiteboardRoom,
        leaveWhiteboardRoom,
        whiteboardRoom,
      }}
    >
      {props.children}
    </whiteboardContext.Provider>
  );
};

export default WhiteboardConfigure;
