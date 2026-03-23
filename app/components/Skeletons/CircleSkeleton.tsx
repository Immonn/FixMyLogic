import React from "react";

const CircleSkeleton: React.FC = () => {
	return (
		<div className='w-6 h-6 rounded-full bg-dark-fill-3 animate-pulse shrink-0'></div>
	);
};
export default CircleSkeleton;
