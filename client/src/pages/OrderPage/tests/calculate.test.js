import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import Type from '../Type';
import OrderPage from '../OrderPage';

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
		name: 'America'
	});

	userEvent.clear(americaInput);
	userEvent.type(americaInput, '1');

	// America 여행 상품을 한 개 올렸으면 가격은 '1000'원으로 표시될 것으로 예상한다.
	expect(productTotal).toHaveTextContent('1000');
});

test("update option's total when options change", async () => {
	render(<Type orderType='options' />);

	const optionsTotal = screen.getByText('옵션 총 가격: ', { exact: false });
	expect(optionsTotal).toHaveTextContent('0');

	/* Insurance 옵션 체크 시의 테스트 코드 */
	const insuranceCheckbox = await screen.findByRole('checkbox', {
		name: 'Insurance'
	});

	userEvent.click(insuranceCheckbox);

	// Insurance 체크박스를 체크했다면 가격은 '500'원으로 표시될 것으로 예상한다.
	expect(optionsTotal).toHaveTextContent('500');

	
	/* Dinner 옵션 체크 시의 테스트 코드 */
	const dinnerCheckbox = await screen.findByRole('checkbox', {
		name: 'Dinner'
	});

	userEvent.click(dinnerCheckbox);

	// Dinner 체크박스를 추가로 체크했다면 가격은 '1000'원으로 표시될 것으로 예상한다.
	expect(optionsTotal).toHaveTextContent('1000');

	userEvent.click(dinnerCheckbox);

	// Dinner 체크박스를 다시 체크해 해제했다면 가격은 '500'원으로 표시될 것으로 예상한다.
	expect(optionsTotal).toHaveTextContent('500');
});

// describe로 여러 개의 테스트 그룹을 만든다
describe("total price of goods and options", () => {
	test("total price starts with 0 and Updating total price when adding one product", async () => {
		render(<OrderPage />);

		const total = screen.getByText('최종 가격: ', { exact: false });
		expect(total).toHaveTextContent('0');

		const americaInput = await screen.findByRole('spinbutton', {
			name: 'America'
		});

		userEvent.clear(americaInput);
		userEvent.type(americaInput, '1');

		expect(total).toHaveTextContent('1000');
	});

	test("Updating total price when adding one option", async () => {
		render(<OrderPage />);

		const total = screen.getByText('최종 가격: ', { exact: false });

		const insuranceCheckbox = await screen.findByRole('checkbox', {
			name: 'Insurance'
		});

		userEvent.click(insuranceCheckbox);

		expect(total).toHaveTextContent('500');
	});

	test("Updating total price when removing option and product", async () => {
		render(<OrderPage />);

		const total = screen.getByText('최종 가격: ', { exact: false });

		/* Insurance 체크박스 클릭 */
		const insuranceCheckbox = await screen.findByRole('checkbox', {
			name: 'Insurance'
		});
		userEvent.click(insuranceCheckbox);
		expect(total).toHaveTextContent('500');

		/* America 상품 3개 */
		const americaInput = await screen.findByRole('spinbutton', {
			name: 'America'
		});
		userEvent.clear(americaInput);
		userEvent.type(americaInput, '3');
		
		/* America 상품 1개로 줄임 */
		userEvent.clear(americaInput);
		userEvent.type(americaInput, '1');
		expect(total).toHaveTextContent('1500');
	});
});