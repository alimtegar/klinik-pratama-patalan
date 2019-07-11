import React from 'react';

const Alert = (props) => {
    const { type, message, dismissible } = props;

    return (
        <div className={`alert alert-${type} ${dismissible ? 'alert-dismissible fade show' : ''} mb-0`} role="alert">
            {message}
            {dismissible ? (
                <button type="button" className="close y-plus-1" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            ) : null}
        </div>
    );
};

Alert.defaultProps = {
    dismissible: false,
};

export default Alert;