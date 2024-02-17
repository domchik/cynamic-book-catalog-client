import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 py-4 text-center text-white">
            &copy; {currentYear} Cynamics
        </footer>
    );
};

export default Footer;
