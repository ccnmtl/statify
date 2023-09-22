import React from 'react';

interface ModalProps {
    objectives: string[];
}

export const ObjectiveModal: React.FC<ModalProps> = ({
    objectives
}) => {
    return (<>
        <div className='modal fade'
            id='objectiveModal'
            tabIndex={-1}
            aria-labelledby='objectiveModalLabel'
            aria-hidden='true'>
            <div
                className='modal-dialog
                    modal-dialog-scrollable modal-dialog-variable'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'
                            id='objectiveModalLabel'>
                            Learning Objectives
                        </h5>
                        <button
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <ul className='list-group list-group-flush'>
                            {objectives.map((objective, key) =>
                                <li key={key} className="list-group-item">
                                    <p>
                                        {objective}
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