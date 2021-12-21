import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';
import Options from './Options';
import ErrorBanner from '../../components/ErrorBanner';

function Type({ orderType }) {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		loadItems(orderType);
	}, []);

	const loadItems = async (orderType) => {
		try {
			const response = await axios.get(`http://localhost:5000/${orderType}`);
			setItems(response.data);
		} catch (error) {
			setError(true);
		}
	};

	if (error) {
		return <ErrorBanner message='에러가 발생했습니다.' />;
	}

	const ItemComponent = orderType === 'products' ? Products : Options;

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
