import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';

function Type({ orderType }) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		loadItems(orderType);
	}, []);

	const loadItems = async (orderType) => {
		try {
			const response = await axios.get(`http://localhost:5000/${orderType}`);
			setItems(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const ItemComponent = orderType === 'products' ? Products : null;

	const optionItems = items.map((item) => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	));

	return <div>{optionItems}</div>;
}

export default Type;
