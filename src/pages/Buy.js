import './Buy.css';
import { TextField, MenuItem } from '@mui/material';
import $ from 'jquery';
import * as React from 'react';
import {v4 as uuidv4} from 'uuid';
import { Routes, Route, NavLink } from 'react-router-dom';
import SingleListing from './SingleListing';
import BuyMain from './BuyMain';


function Buy() {
    return (
        <div class="buyDisplay">
            <Routes>
                <Route path='/' element={< BuyMain />}/>
                <Route path='listing' element={< SingleListing />}/>
            </Routes>
        </div>
    )
}

export default Buy;