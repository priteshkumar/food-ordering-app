import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Controller from './screens/Controller';
import 'typeface-roboto';
//import ListTest from './common/ListTest';
//import TableTest from './common/TableTest';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <Controller />
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
