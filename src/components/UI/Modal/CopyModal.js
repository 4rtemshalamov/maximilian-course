import React, { useEffect} from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxs from "../../../hoc/auxs/auxs";

const CopyModal = (props, nextProps) => {

    useEffect(() => {
        return nextProps.show !== props.show;
    })

    return (
        <Auxs>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxs>
    )
}
export default CopyModal;