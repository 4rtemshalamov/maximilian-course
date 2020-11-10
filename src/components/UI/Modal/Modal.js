import React, { Component } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxs from "../../../hoc/auxs/auxs";

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate () {
        console.log('[Modal] WillUpdate');
    }

    render () {
        return (
            <Auxs>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxs>
        )
    }
}

export default Modal;