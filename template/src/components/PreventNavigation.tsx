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
import React, { useEffect } from "react";

interface PreventNavigationProps {
  message: string;
}

const PreventNavigation: React.FC<PreventNavigationProps> = ({ message }) => {
  useEffect(() => {
    function stopTabClose(e: BeforeUnloadEvent) {
      //Prevents redirect/tab close
      e.preventDefault();
      //Necessary for some older browsers
      e.returnValue = message;
    }

    window.addEventListener("beforeunload", stopTabClose);

    return () => {
      window.removeEventListener("beforeunload", stopTabClose);
    };
  }, []);

  return <></>;
};

export default PreventNavigation;
