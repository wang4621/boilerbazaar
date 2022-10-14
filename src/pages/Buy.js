import './Buy.css';
import * as React from 'react';
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