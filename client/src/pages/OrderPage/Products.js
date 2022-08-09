import React from 'react';

function Products({ name, imagePath, updateItemCount }) {
	const handleChange = (e) => {
		const currentValue = e.target.value;
		updateItemCount(name, currentValue);
	}

	return (
		<div style={{ textAlign: 'center' }}>
			<img
				style={{ width: '75%' }}
				src={`http://localhost:5000/${imagePath}`}
				alt={`${name} product`}
			/>
			<form style={{ marginTop: '10px' }}>
				<label style={{ textAlign: 'right' }}>{name}</label>
				<input
					style={{ marginLeft: 7 }}
					type='number'
					name='quantity'
					min='0'
					defaultValue={0}
					onChange={handleChange}
				/>
			</form>
		</div>
	);
}

export default Products;
