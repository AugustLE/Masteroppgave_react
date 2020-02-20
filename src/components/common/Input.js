import React from 'react';

const Input = (props) => {

    return (
        <input 
            placeholder={props.placeholder}
            onChange={props.onChangeValue} 
            className="input" 
            type="text" 
            value={props.value}
        />
    )
}

export { Input };