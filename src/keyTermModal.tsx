import React from 'react';

interface ModalProps {
    definitions: string[][];
}

export const KeyTermModal: React.FC<ModalProps> = ({
    definitions
}) => {
    return (<>
        <div className='modal fade'
            id='keyTermModal'
            tabIndex={-1}
            aria-labelledby='keyTermModalLabel'
            aria-hidden='true'>
            <div
                className='modal-dialog
                    modal-dialog-scrollable modal-dialog-variable'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'
                            id='keyTermModalLabel'>
                            Key Statistics Terms
                        </h5>
                        <button
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <ul className='list-group list-group-flush'>
                            {definitions.map((term, key) =>
                                <li key={key} className="list-group-item">
                                    <p>
                                        <strong>{term[0]}</strong> - {term[1]}
                                    </p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-secondary'
                            data-bs-dismiss='modal'>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
};