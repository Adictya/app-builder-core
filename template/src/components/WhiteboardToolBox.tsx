/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/

import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {ApplianceNames} from 'white-web-sdk';
import styles from 'react-native-toast-message/src/components/icon/styles';

const WhiteboardToolBox = ({whiteboardRoom}) => {
  const [selectedTool, setSelectedTool] = useState(ApplianceNames.pencil);

  const handleSelect = (applicanceName: ApplianceNames) => {
    setSelectedTool(applicanceName)
    whiteboardRoom.current.setMemberState({
      currentApplianceName: applicanceName,
    });
  };

  const handleClear = () => {
    whiteboardRoom.current.cleanCurrentScene();
  };

  return (
    <View style={style.toolboxContainer}>
      <View style={style.toolbox}>
        <Pressable
          style={
            selectedTool === ApplianceNames.hand ? style.toolActive : style.tool
          }
          onPress={() => {
            handleSelect(ApplianceNames.hand);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
            />
          </svg>
        </Pressable>
        <Pressable
          style={
            selectedTool === ApplianceNames.pencil ? style.toolActive : style.tool
          }
          onPress={() => {
            handleSelect(ApplianceNames.pencil);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </Pressable>
        <Pressable
          style={
            selectedTool === ApplianceNames.eraser ? style.toolActive : style.tool
          }
          onPress={() => {
            handleSelect(ApplianceNames.eraser);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 437.547 437.547"
            stroke="red"
          >
            <path d="M429.477,257.451L194.339,22.313c-5.212-5.212-12.143-8.083-19.515-8.083c-7.372,0-14.302,2.871-19.514,8.083L9.333,168.294  C3.314,174.312,0,182.314,0,190.824c0,8.511,3.314,16.512,9.333,22.53l209.963,209.963h83.339L429.477,296.48  C440.237,285.719,440.237,268.211,429.477,257.451z M174.825,29.23c3.365,0,6.529,1.31,8.908,3.689l117.264,117.264l-35.677,35.677  L148.056,68.597c-2.379-2.379-3.689-5.543-3.689-8.908c0-3.348,1.299-6.496,3.656-8.871l17.894-17.898  C168.296,30.54,171.46,29.23,174.825,29.23z M15,190.824c0-4.504,1.754-8.738,4.939-11.923l98.143-98.143  c6.605-5.056,16.115-4.581,22.156,1.458L254.602,196.58L134.186,316.995L19.939,202.748C16.754,199.563,15,195.328,15,190.824z   M296.422,408.317h-70.913l-80.716-80.716l120.415-120.415l104.136,104.136c6.575,6.575,6.575,17.272,0,23.847l0.112,0.113  L296.422,408.317z M418.871,285.873l-17.909,17.905c-2.374,2.35-5.517,3.646-8.86,3.646c-3.365,0-6.529-1.31-8.908-3.689  L275.927,196.468l35.677-35.677l107.267,107.267C423.782,272.969,423.782,280.961,418.871,285.873z" />
          </svg>
        </Pressable>
        <Pressable
          style={
            style.tool
          }
          onPress={() => {
            handleClear();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  toolboxContainer: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  toolbox: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 'auto',
    padding: 5,
    height: 320,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.22,

    elevation: 3,
  },
  toolActive: {
    height: 30,
    width: 30,
    borderRadius: 20,
    padding: 3,
    borderColor: $config.PRIMARY_COLOR,
    borderWidth: 2,
  },
  tool: {
    height: 30,
    width: 30,
    borderRadius: 20,
    padding: 3,
  },
});

export default WhiteboardToolBox;
