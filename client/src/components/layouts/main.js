import React from 'react';
import Header from './header';

const LayoutMain =({children}) =>{
    return(
        <>
            <div>
                <Header/>
            </div>
            <main>{children}</main>
        </>
    )
};

export default LayoutMain;