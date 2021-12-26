import { useState, useEffect, createContext, useMemo } from 'react';

const OrderContext = createContext();

/* 
  상품은 각각 1000원,
  옵션은 각각 500원으로 고정한다.
*/
const pricePerItem = {
	products: 1000,
	options: 500,
};

function calculateSubTotal(orderType, orderCounts) {
	let optionCount = 0;

	/*
    Map 순회!
    보통은 다음과 같은 문법으로 순회 가능하다.
    
    for (const [key, value] of maxInfoMap) {
        console.log(key, value);
    }
  */
	for (const count of orderCounts[orderType].values()) {
		optionCount += count;
	}

	return optionCount * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
	/* 
    Map 자료구조를 사용하면
    자바스크립트의 Object와는 달리
    문자열 외에도 key로서 사용할 수 있는 장점이 있다.
  */
	const [orderCounts, setOrderCounts] = useState({
		products: new Map(), // key: 나라 이름, value: 갯수
		options: new Map(), // key: 옵션 이름, value: 갯수
	});

	const [totals, setTotals] = useState({
		products: 0,
		options: 0,
		total: 0,
	});

	useEffect(() => {
		const productsTotal = calculateSubTotal('products', orderCounts);
		const optionsTotal = calculateSubTotal('options', orderCounts);
		const total = productsTotal + optionsTotal;
		setTotals({
			products: productsTotal,
			options: optionsTotal,
			total,
		});
	}, [orderCounts]);

	/*
    useMemo를 이용해 orderCounts, totals의 값을 캐싱해 둔다.
    orderCounts, totals에 변화가 생겼을 때에만 콜백 함수를 실행한다.
  */
	const value = useMemo(() => {
		function updateItemCount(itemName, newItemCount, orderType) {
			/*
        리액트에서는 불변성으로 인해 직접 state를 변경하지 못하므로
        새롭게 복사한 데이터로 작업 후에 대입해줘야 한다.
      */
			const newOrderCounts = { ...orderCounts };

			const orderCountsMap = orderCounts[orderType];
			orderCountsMap.set(itemName, parseInt(newItemCount));

			setOrderCounts(newOrderCounts);
		}

		/*
      const [a, b] = [1, 2];  // a=1, b=2
      와 같은 배열의 구조 분해 할당을 의도한다.
    */
		return [{ ...orderCounts, totals }, updateItemCount];
	}, [orderCounts, totals]);

	return <OrderContext.Provider value={value} {...props} />;
}
