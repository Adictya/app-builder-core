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

export const whiteboardPaper = document.createElement('iframe');
whiteboardPaper.className = 'whiteboardPaper';
whiteboardPaper.src="https://www.study.com/"

export const whiteboardContext = createContext(
  {} as whiteboardContextInterface,
);

export interface whiteboardContextInterface {
  whiteboardActive: boolean;
  whiteboardRoomState: RoomPhase;
  joinWhiteboardRoom: () => void;
  leaveWhiteboardRoom: () => void;
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

  const _join = () => {
  };

  const _leave = () => {
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
      setWhiteboardRoomState(RoomPhase.Connected);
    } else if (whiteboardActive) {
      _join();
      setWhiteboardRoomState(RoomPhase.Connected);
    } else {
      _leave();
      setWhiteboardRoomState(RoomPhase.Disconnected);
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
      }}
    >
      {props.children}
    </whiteboardContext.Provider>
  );
};

export default WhiteboardConfigure;
