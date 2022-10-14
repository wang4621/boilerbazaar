import './Buy.css';
import * as React from 'react';
import { Outlet } from 'react-router-dom';


function Buy() {
    return (
        <div class="buyDisplay">
           <Outlet/>
        </div>
    )
}

export default Buy;