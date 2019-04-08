import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './hoc/layout';
import Home from './components/Home';
import SelectLocation from './components/LocationPage/';
import ViewChart from './components/DataViz';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/data-viz" exact component={ViewChart}/>
                <Route path="/select-location" exact component={SelectLocation}/>
                <Route path="/" exact component={Home}/>
            </Switch>
        </Layout>
    )
}

export default Routes;