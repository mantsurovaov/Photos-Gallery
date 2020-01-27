import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Image.css';
import preloader from './../assets/images/giphy.gif';

const BASE_PATH = 'https://boiling-refuge-66454.herokuapp.com';
const SEARCH_PATH = '/images/';

const Image = ({ id }) => {
	useEffect(() => {
		fetchImage();
	});

	const [image, setItem] = useState({ comments: [] });
	const [isFetching, setIsFetching] = useState(false);

	const fetchImage = async () => {
		//debugger;
		setIsFetching(true);
		if (Object.entries(image).length === 1 && image.constructor === Object) {
			const data = await fetch(`${BASE_PATH}${SEARCH_PATH}${id}`);
			const image = await data.json();
			setItem(image);
		}
		setIsFetching(false);
	};

	const sendComment = async e => {
		e.preventDefault();

		const name = document.getElementById('your-name').value;
		const comment = document.getElementById('your-comment').value;

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const options = {
			method: 'POST',
			headers,
			body: JSON.stringify({ name, comment }),
		};
		const request = new Request(
			`${BASE_PATH}${SEARCH_PATH}${id}/comments`,
			options,
		);
		const response = await fetch(request);
		const { status } = response;
		if (status === 204) {
			console.log('Sent');
		} else {
			console.log('Not sent');
		}

		document.getElementById('your-name').value = null;
		document.getElementById('your-comment').value = null;
	};

	const { url, comments: imageComments } = image;

	return (
		<>
			{isFetching ? (
				<img src={preloader} alt="preloader" />
			) : (
				<div className="wrapper">
					<div className="write-comment">
						<img
							className="detailed-img write-comment-item"
							src={url}
							alt="detailed"
						/>
					</div>
					<div className="comments">
						{!imageComments.length ? (
							<div className="comments-item">Нет комментариев</div>
						) : null}
						{imageComments.map(({ id, text, date: seconds }) => {
							const date = new Date(seconds);
							const day = date.getDay();
							const month = date.getMonth() + 1;
							const year = date.getFullYear();
							return (
								<div className="comments-item" key={id}>
									<div className="comments-date" style={{ color: '#999999' }}>
										{day < 10 ? '0' : null}
										{day}.{month < 10 ? '0' : null}
										{month}.{year}
									</div>
									<div className="comments-text">{text}</div>
								</div>
							);
						})}
					</div>
					<div className="write-comment-input">
						<input
							id="your-name"
							className="write-comment-item"
							type="text"
							placeholder=" Ваше имя"
						/>
						<input
							id="your-comment"
							className="write-comment-item"
							type="text"
							placeholder=" Ваш комментарий"
						/>
						<Button variant="primary" onClick={sendComment}>
							Оставить комментарий
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default Image;
