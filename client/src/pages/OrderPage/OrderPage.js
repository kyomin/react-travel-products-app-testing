import React, { useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import Type from './Type';

function OrderPage({ setStep }) {
	const [orderDatas] = useContext(OrderContext);

	return (
		<div>
			<h1>여행 상품</h1>
			<div>
				<Type orderType='products' />
			</div>
			<div style={{ display: 'flex', marginTop: 20 }}>
				<div style={{ width: '50%' }}>
					<Type orderType='options' />
				</div>
				<div style={{ width: '50%' }}>
					<h2>최종 가격: { orderDatas.totals.total }</h2>
					<br />
					<button onClick={() => setStep(1)}>주문하기</button>
				</div>
			</div>
		</div>
	);
}

export default OrderPage;
