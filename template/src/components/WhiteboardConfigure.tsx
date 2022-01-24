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
    wbUuid: '5492e4307c3011ec906e57d8020de2f6',
    wbToken:
      'NETLESSROOM_YWs9dF9YQ1lpdXhmTVFqaVhjUiZub25jZT0xNjQyOTMwNzY5MzAyMDAmcm9sZT0wJnNpZz00ZWVmNDNmOTMxNGU3MWNjMzY0ZGFlODk5YjBmNDhkZmQ2NGZhNjhhOWVlNGExMWYyMDA5MjFlODcxZTI5YWQxJnV1aWQ9NTQ5MmU0MzA3YzMwMTFlYzkwNmU1N2Q4MDIwZGUyZjY',
    wbAppIdentifier: ' ',
  };

  const _join = () => {
    whiteWebSdkClient.current
      .joinRoom({
        uuid: whiteBoardProps.wbUuid,
        uid:`${Date.now()}`,
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
      const appIdentifier = 'tuffUHwrEeyRoMGwMgqdqg/ToNGlh32hZPCiA';
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
