import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SelectCourse = (props) => {

    console.log('ACCESS TOKEN');
    console.log(props.access_token);
    return (
        <div>
            <h1>Select course</h1>
            <p>Select course</p>
            <Link to='/student/status'>Status page</Link>
        </div>
    );

}
 

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    return { access_token };
};

export default connect(mapStateToProps, { })(SelectCourse);