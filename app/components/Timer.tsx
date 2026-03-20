'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { FiChevronLeft, FiPause, FiPlay, FiRefreshCcw } from 'react-icons/fi';

type TimerProps = {

};

const Timer: React.FC<TimerProps> = () => {
    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

    useEffect(() => {
        if (!showTimer || !isRunning) return;

        const interval = setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [showTimer, isRunning]);

    const formattedTime = useMemo(() => {
        const hours = Math.floor(elapsedSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }, [elapsedSeconds]);

    return <div>
        {showTimer ? (
            <div className='flex items-center px-1.5 space-x-2 text-white bg-dark-fill py-1.5 rounded hover:bg-dark-fill-2'>
                <button
                    type='button'
                    onClick={() => {
                        setShowTimer(false);
                        setIsRunning(false);
                    }}
                    aria-label='Hide timer'
                    className='cursor-pointer'
                >
                    <FiChevronLeft />
                </button>
                <button
                    type='button'
                    onClick={() => setIsRunning((prev) => !prev)}
                    aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
                    className='cursor-pointer'
                >
                    {isRunning ? <FiPause /> : <FiPlay />}
                </button>
                <div className='text-blue-400'>{formattedTime}</div>
                <button
                    type='button'
                    onClick={() => setElapsedSeconds(0)}
                    aria-label='Reset timer'
                    className='cursor-pointer'
                >
                    <FiRefreshCcw />
                </button>
            </div>
        ) : (
            <button
                type='button'
                onClick={() => {
                    setShowTimer(true);
                    setIsRunning(true);
                }}
                className='flex items-center p-1 text-white h-8 hover:bg-dark-fill-3 rounded cursor-pointer'
                aria-label='Start timer'
            >
                <svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='1em'
						height='1em'
						fill='currentColor'
						className='h-6 w-6'
					>
						<path
							fillRule='evenodd'
							d='M12 4a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 1.634a1 1 0 01.993.883l.007.117-.001 3.774 2.111 1.162a1 1 0 01.445 1.253l-.05.105a1 1 0 01-1.254.445l-.105-.05-2.628-1.447a1 1 0 01-.51-.756L11 13V8.634a1 1 0 011-1zM16.235 2.4a1 1 0 011.296-.269l.105.07 4 3 .095.08a1 1 0 01-1.19 1.588l-.105-.069-4-3-.096-.081a1 1 0 01-.105-1.319zM7.8 2.4a1 1 0 01-.104 1.319L7.6 3.8l-4 3a1 1 0 01-1.296-1.518L2.4 5.2l4-3a1 1 0 011.4.2z'
							clipRule='evenodd'
						></path>
					</svg>
            </button>

        )}
    </div>
}
export default Timer;