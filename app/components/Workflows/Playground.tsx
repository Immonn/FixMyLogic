'use client'
import React, { useEffect, useRef, useState } from 'react';
import PrefenceNav from './preferenceNav';



type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    return <div className='h-full overflow-auto bg-dark-layer-2 text-dark-gray-8'>
        <PrefenceNav/>
    </div>
}
export default Playground;