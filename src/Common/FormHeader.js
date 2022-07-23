import React from 'react';
import '../Pages/Login/index.css';

function FormHeader({hr=true, inline=false}) {
    return (
        <>
            <h2 className='caveatBold'>AraosDev</h2>
            {!inline ? <h2 className='caveatBold'>Social Media Web App</h2> : <span className='caveatBold'>Social Media Web App</span>}
            {hr &&<hr className='my-2' style={{border: '1px solid', width: '100%'}} />}
        </>
    )
}

export default FormHeader
