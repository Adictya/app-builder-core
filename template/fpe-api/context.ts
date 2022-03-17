/**
 * Core contexts
 */
import createHook from './utils';
import {RtcContext, MinUidContext, MaxUidContext, PropsContext, LocalContext} from '../agora-rn-uikit';
import {default as ChatContext} from '../src/components/ChatContext';
import {default as DeviceContext} from '../src/components/DeviceContext';
import {default as StorageContext} from '../src/components/StorageContext';

export const useRtcContext = createHook(RtcContext);
export const useChatContext = createHook(ChatContext);
export const useMinUidContext = createHook(MinUidContext);
export const useMaxUidContext = createHook(MaxUidContext);
export const usePropsContext = createHook(PropsContext);
export const useLocalContext = createHook(LocalContext);
export const useDeviceContext = createHook(DeviceContext);
export const useStorageContext = createHook(StorageContext);

export {LocalUserContext} from '../agora-rn-uikit';

/**
 * UI contexts
 */
export { type PreCallContextInterface, PreCallProvider, usePreCall } from '../src/components/precall/usePreCall';
export { type VideoCallContextInterface, VideoCallProvider, useVideoCall } from '../src/pages/VideoCall/useVideoCall';
export { type ChatUIDataInterface, type privateMsgLastSeenInterface, ChatUIDataProvider, useChatUIData } from '../src/components/useChatUI';
export { type ShareLinkContextInterface, useShareLink, ShareLinkProvider } from '../src/pages/Create/ShareLink';
export { type ScreenShareContextInterface, useScreenShare, ScreenShareProvider  } from '../src/subComponents/screen-share/useScreenShare';
export { type RecordingContextInterface, useRecording, RecordingProvider} from '../src/subComponents/recording/useRecording';