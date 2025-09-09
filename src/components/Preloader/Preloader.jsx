import './Preloader.css'
import React from 'react';

function Preloader({}){
    return(
        <div className="circle-preloader">
            <div className="circle-preloader__spin"></div>;
            <p className="circle-preloader__text">Searching for News ...</p>
        </div>
    );
}
export default Preloader;