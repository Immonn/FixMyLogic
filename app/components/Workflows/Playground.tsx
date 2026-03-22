'use client'
import React, { useEffect, useRef, useState } from 'react';
import PrefenceNav from './preferenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    return <div className='h-full overflow-auto bg-dark-layer-2 text-dark-gray-8'>
        <PrefenceNav/>
        <Split className="h-[calc(100vh-94px)]" direction='vertical' sizes={[60,40]} minSize={60}>
            <div className="w-full overflow-auto">
                <CodeMirror
                value='const a=1'
                theme={vscodeDark}
                extensions={[javascript()]}
                style={{fontSize:16}}
                />
            </div>
            <div>
                Test cases is gonna be add.
            </div>
        </Split>
    </div>
}
export default Playground;