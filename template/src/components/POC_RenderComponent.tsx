import React from 'react';
import {UidInterface} from '../../agora-rn-uikit';
import {MinVideoRenderer, MaxVideoRenderer} from './POC_PinnedVideoRenderer';
import GridVideoRenderer from './POC_GridVideoRenderer';
import Layout from '../subComponents/LayoutEnum';

export type RenderComponentType = (
  data: UidInterface,
  index: number,
  isMax: boolean,
  props: any,
  activeLayout: Layout,
) => Element | undefined | JSX.Element;

const RenderComponent: RenderComponentType = (
  data,
  index,
  isMax,
  props,
  activeLayout,
) => {
  switch (data.type) {
    case 'RemoteVideo':
    case 'LocalVideo':
      return activeLayout === Layout.Pinned ? (
        isMax ? (
          <MaxVideoRenderer
            user={data}
            key={`maxVideo${index}`}
            viewProps={props}
            index={index}
          />
        ) : (
          <MinVideoRenderer
            user={data}
            key={`minVideo${index}`}
            viewProps={props}
            index={index}
          />
        )
      ) : (
        <GridVideoRenderer
          user={data}
          key={`gridVideo${index}`}
          viewProps={props}
          index={index}
        />
      );
  }
};

export default RenderComponent;
