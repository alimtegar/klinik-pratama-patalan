import React from 'react';

// Components
import Alert from './Alert';

const ErrorHandler = (props) => {
    const { res } = props;

    return (
        <div className="mb-3">
            <Alert type={!res.error ? 'success' : 'danger'} message={res.message} dismissible={true} />
        </div>
    );    
};

export default ErrorHandler;