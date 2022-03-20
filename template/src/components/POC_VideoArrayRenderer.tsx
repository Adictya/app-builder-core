import React, {useContext} from 'react';
import {MinUidContext, MaxUidContext} from '../../agora-rn-uikit';
import RenderComponent from './POC_RenderComponent';
import Layout from '../subComponents/LayoutEnum';
import {useFpe} from 'fpe-api';

const VideoArrayRenderer = ({
  activeLayout,
  children,
}: {
  activeLayout: Layout;
  children: any;
}) => {
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);
  const renderComponent = useFpe(
    (config) => config.components?.videoCall?.renderComponent,
  );

  const minArray: React.FC = (props) => {
    return (
      <>
        {min.map((user, i) =>
          renderComponent
            ? renderComponent(user, i, false, props, activeLayout)
            : RenderComponent(user, i, false, props, activeLayout),
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
          renderComponent
            ? renderComponent(user, i, true, props, activeLayout)
            : RenderComponent(user, i, true, props, activeLayout),
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
          renderComponent
            ? renderComponent(user, i, i===0?true:false, props, activeLayout)
            : RenderComponent(user, i, i===0?true:false, props, activeLayout),
    );
  };

  return <>{children(minArray, maxArray, videoArray)}</>;
};

// Alternative approach, HOOKS
export const useVideoArrays = ({activeLayout}) => {
  const max = useContext(MaxUidContext);
  const min = useContext(MinUidContext);

  const totalUsers = min.length + max.length;

  const renderComponent = useFpe(
    (config) => config.components?.videoCall?.renderComponent,
  );

  const getMinArray: React.FC = (props) => {
    return (
      <>
        {min.map((user, i) =>
          renderComponent
            ? renderComponent(user, i, false, props, activeLayout)
            : RenderComponent(user, i, false, props, activeLayout),
        )}
      </>
    );
  };

  const getMaxArray: React.FC = (props) => {
    return (
      <>
        {max.map((user, i) =>
          renderComponent
            ? renderComponent(user, i, true, props, activeLayout)
            : RenderComponent(user, i, true, props, activeLayout),
        )}
      </>
    );
  };

  const getVideoArray = (props) => {
    return [...max, ...min].map((user, i) =>
          renderComponent
            ? renderComponent(user, i, i===0?true:false, props, activeLayout)
            : RenderComponent(user, i, i===0?true:false, props, activeLayout),
    );
  };

  return {totalUsers, getMinArray, getMaxArray, getVideoArray};
};

export default VideoArrayRenderer;
