import React from 'react';

const Form = (props) => {

    const onSubmit = (event) => {
        event.preventDefault();
        props.onSubmit();
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            {props.children}
        </form>
    );
}

export { Form };