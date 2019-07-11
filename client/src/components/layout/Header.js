import React from 'react';

const Header = (props) => {
    const { title, description, floatingActionButton } = props;

    return (
        <div className="header position-relative bg-white p-4 border-bottom shadow-sm">
            <h5 className="font-weight-bold mb-0">
                {title}
            </h5>
            {floatingActionButton}
        </div>
    );
};

export default Header;