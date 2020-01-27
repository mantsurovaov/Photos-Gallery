import React from 'react';
import { Button } from 'react-bootstrap';
import Portal from './Portal';

import './Modal.css';

const Modal = ({ isOpen, onCancel, children }) => (
	<>
		{isOpen && (
			<Portal>
				<div className="modal-overlay">
					<div className="modal-window">
						<Button
							onClick={onCancel}
							style={{
								fontSize: '32px',
								marginLeft: '90%',
								padding: '0px',
							}}
							variant="link"
						>
							×
						</Button>
						<div className="modal-body">{children}</div>
					</div>
				</div>
			</Portal>
		)}
	</>
);

export default Modal;
