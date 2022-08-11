import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test("From order to order completion", async () => {
  render(<App />);

  /* 상품 선택 */
  const americaInput = await screen.findByRole('spinbutton', {
		name: 'America'
	});
  userEvent.clear(americaInput);
	userEvent.type(americaInput, '1');

  const englandInput = await screen.findByRole('spinbutton', {
		name: 'England'
	});
  userEvent.clear(englandInput);
	userEvent.type(englandInput, '3');


  /* 옵션 선택 */
  const insuranceCheckbox = await screen.findByRole('checkbox', {
		name: 'Insurance'
	});
	userEvent.click(insuranceCheckbox);

  /* 주문 버튼 클릭 */
  const orderButton = await screen.findByRole('button', {
    name: '주문하기'
  });
  userEvent.click(orderButton);
}); 