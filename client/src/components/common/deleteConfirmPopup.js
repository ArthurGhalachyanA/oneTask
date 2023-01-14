import React from 'react';
import styles from '../../assets/css/styles.module.css';

const DeleteConfirmPopup = ({message, onDialog}) => {
    return (
        <div className={styles.popup_container}>
            <div className={styles.popup_body}>
                <h3>Are you sure delete?</h3>

                <div className={styles.popup_buttons_block}>
                    <button
                        onClick={() => onDialog(true)}
                        className={styles.popup_confirm_button}
                    >Yes</button>
                    <button
                        onClick={() => onDialog(false)}
                        className={styles.popup_deny_button}
                    >No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmPopup;