import React from "react";

const RectangleSkeleton: React.FC = () => {
	return (
		<div className='rounded-full bg-dark-fill-3 animate-pulse shrink-0' style={{ height: '24px', width: '64px' }}></div>
	);
};
export default RectangleSkeleton;