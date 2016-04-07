import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'
                 defaultPosition='right'
                 defaultSize={ 0.35 }
                 defaultIsVisible={ true }
    >
        <LogMonitor theme='tomorrow'/>
    </DockMonitor>
);
