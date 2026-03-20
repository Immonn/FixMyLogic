'use client'
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";


type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);
    
    const languages = ['JavaScript', 'Java', 'C++', 'Python'];
    const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!dropdownRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);
    
    return <div className='h-full overflow-auto bg-dark-layer-2 text-dark-gray-8'>
            <div className='h-11 flex items-center px-4 justify-between border-b border-dark-divider-border-2 text-sm'>
                <div className='relative w-30' ref={dropdownRef}>
                    <button
                        type='button'
                        onClick={() => setIsOpen((prev) => !prev)}
                        className='w-full flex items-center justify-between gap-2 px-3 h-9 rounded-t-md border border-dark-divider-border-2 bg-dark-layer-1 text-white cursor-pointer'
                    >
                        <span className='truncate'>{selectedLanguage}</span>
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                        className={`absolute left-0 top-10 w-full bg-dark-layer-1 border border-dark-divider-border-2 border-t-0 rounded-b-md overflow-hidden transition-all duration-200 z-20 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        {languages.map((language) => (
                            <button
                                key={language}
                                type='button'
                                onClick={() => {
                                    setSelectedLanguage(language);
                                    setIsOpen(false);
                                }}
                                className='w-full text-left px-3 py-2 text-sm text-dark-gray-8 hover:bg-dark-fill-3 cursor-pointer'
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex items-center m-2'>
				<button
					className='preferenceBtn group'
					
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip'>Settings</div>
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					<div className='preferenceBtn-tooltip'>Full Screen</div>
				</button>
			</div>
		</div>

        </div>
}
export default Playground;