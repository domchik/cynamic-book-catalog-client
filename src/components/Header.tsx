import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold">
                    My Books Catalog
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    isActive ? 'active' : 'inactive'
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/add"
                                className={({isActive}) =>
                                    isActive ? 'active' : 'inactive'
                                }
                            >
                                Add book
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
