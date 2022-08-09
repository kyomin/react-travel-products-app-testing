import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import Type from '../Type';

test("update product's total when products change", async () => {
	render(<Type orderType='products' />);

	/*
    option으로 { exact: false }을 사용하면 
    첫번째 파라미터로 문자열을 사용해도 text값이 일부만 일치하는 경우에도 요소를 찾을 수 있다. 
    추가로, 대소문자도 구분하지 하지 않는다.
  */
	const productTotal = screen.getByText('상품 총 가격: ', { exact: false });
	expect(productTotal).toHaveTextContent('0');

	// America 여행 상품 한 개 올리기
	const americaInput = await screen.findByRole('spinbutton', {
		name: 'America',
	});

	userEvent.clear(americaInput);
	userEvent.type(americaInput, '1');

	// America 여행 상품을 한 개 올렸으면 가격은 '1000'원으로 표시될 것으로 예상한다.
	expect(productTotal).toHaveTextContent('1000');
});
