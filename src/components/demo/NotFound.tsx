import React from 'react';

export const NotFound: React.FC = () => {
    return (
        <div className="container h-screen flex flex-col  items-center justify-center">
            <img src="../../../public/notfound.png" alt="404" className='w-[30rem]' />
            <p className="text-gray-600">Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
