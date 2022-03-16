import React, {useContext} from 'react';
import {MinUidContext, MaxUidContext} from '../../agora-rn-uikit';
import RenderComponent from './POC_RenderComponent';
import Layout from '../subComponents/LayoutEnum';

const VideoArrayRenderer = ({
  activeLayout,
  children,
}: {
  activeLayout: Layout;
  children: any;
}) => {
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);

  const minArray: React.FC = (props) => {
    return (
      <>
        {min.map((user, i) =>
          RenderComponent(user, i, false, props, activeLayout),
        )}
      </>
    );
  };

  /*
  const minArray2 = (props: any) => {
    return min.map((user, i) => RenderComponent(user, i, false, props));
  };
  */

  const maxArray: React.FC = (props) => {
    return (
      <>
        {max.map((user, i) =>
          RenderComponent(user, i, true, props, activeLayout),
        )}
      </>
    );
  };

  /*
  const maxArray = max.map((user, i) => {
    return RenderComponent(user, i + 'minvideo');
  });
  */

  const videoArray = (props) => {
    return [...max, ...min].map((user, i) =>
      RenderComponent(user, i, true, props, activeLayout),
    );
  };

  return <>{children(minArray, maxArray, videoArray)}</>;
};

// Alternative approach, HOOKS
export const useVideoArrays = () => {
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);

  const totalUsers = min.length + max.length;

  const getMinArray: React.FC = (props) => {
    return <>{min.map((user, i) => RenderComponent(user, i, false, props))}</>;
  };

  const getMaxArray: React.FC = (props) => {
    return <>{max.map((user, i) => RenderComponent(user, i, true, props))}</>;
  };

  const getVideoArray = (props) => {
    return [...max, ...min].map((user, i) =>
      RenderComponent(user, i, true, props),
    );
  };

  return {totalUsers, getMinArray, getMaxArray, getVideoArray};
};

export default VideoArrayRenderer;
