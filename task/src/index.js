import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';

import {BrowserRouter} from 'react-router-dom';
import Routes from "./routes";

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
, document.getElementById('root'));
