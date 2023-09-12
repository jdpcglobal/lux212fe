import { width } from '@mui/system'
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loader = ({height, width}) => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width={width}
                visible={true}
            />
        </div>
    )
}

export default Loader