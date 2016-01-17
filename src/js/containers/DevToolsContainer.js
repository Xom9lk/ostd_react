/**
 * Created by Игорь on 03.01.2016.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// createDevTools takes a monitor and produces a DevTools component
var DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'>
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
);


class DevToolsComponent extends Component {
    render () {
        return process.env.NODE_ENV === 'production'? null : <DevTools />;
    }
}

export default connect()(DevToolsComponent);
export {DevTools};