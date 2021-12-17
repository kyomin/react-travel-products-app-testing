import { render, screen } from '@testing-library/react';
import Type from '../Type';

test('displays product images from server', async () => {
	render(<Type orderType='products' />);

	// 이미지 찾기
	const productImages = await screen.findAllByRole('img', {
		name: /product$/i,
	});

	// 가져온 이미지 배열의 길이는 '2'가 되어야 한다.
	expect(productImages).toHaveLength(2);

	const altText = productImages.map((element) => {
		return element.alt;
	});
	expect(altText).toEqual(['America product', 'England product']);
});
