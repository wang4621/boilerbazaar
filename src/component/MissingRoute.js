import React from 'react'
import { Navigate } from 'react-router-dom';

const MissingRoute = () => {
    return < Navigate to={{pathname: '/404'}} / >
}

export default MissingRoute