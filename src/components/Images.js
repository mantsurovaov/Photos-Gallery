import React, { useState, useEffect, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import './Images.css';
import preloader from './../assets/images/giphy.gif';
import Modal from './Modal';
import Image from './Image';

const BASE_PATH = 'https://boiling-refuge-66454.herokuapp.com';
const SEARCH_PATH = '/images';

const Images = () => {
	useEffect(() => {
		fetchImages();
	}, []);

	const [images, setItems] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [idChosen, setIdChosen] = useState(null);

	const fetchImages = async () => {
		setIsFetching(true);
		const data = await fetch(`${BASE_PATH}${SEARCH_PATH}`);
		const images = await data.json();
		setItems(images);
		setIsFetching(false);
	};

	const openModal = id => {
		setIsOpen(true);
		setIdChosen(id);
	};

	const handleCancel = () => {
		setIsOpen(false);
	};

	return (
		<>
			{isFetching ? (
				<img src={preloader} alt="preloader" />
			) : (
				<>
					<h3>TEST APP</h3>
					<div className="container">
						{images.map(({ url, id }) => (
							<Fragment key={id}>
								<Button variant="link" onClick={() => openModal(id)}>
									<img src={url} alt="previewImage" style={{ margin: '3px' }} />
								</Button>
							</Fragment>
						))}
						<Modal isOpen={isOpen} onCancel={handleCancel}>
							<Image id={idChosen} />
						</Modal>
					</div>
				</>
			)}
		</>
	);
};

export default Images;
