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


  ////////////////// 주문 확인 페이지 //////////////////
  const summaryHeading = screen.getByRole('heading', {
    name: '주문 확인'
  });
  expect(summaryHeading).toBeInTheDocument();

  const productsHeading = screen.getByRole('heading', {
    name: '여행 상품: 4000'
  });
  expect(productsHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole('heading', {
    name: '옵션: 500'
  });
  expect(optionsHeading).toBeInTheDocument();

  expect(screen.getByText('1 America')).toBeInTheDocument();
  expect(screen.getByText('3 England')).toBeInTheDocument();
  expect(screen.getByText('Insurance')).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole('checkbox', {
    name: '주문하려는 것을 확인하셨나요?'
  });
  userEvent.click(confirmCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: '주문 확인'
  });
  userEvent.click(confirmOrderButton);


  ////////////////// 주문 완료 페이지 //////////////////
  // 서버에서 응답이 올 때까지는 로딩 문구
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // 서버에서 응답 데이터 받은 후에 띄어질 문구
  const completeHeader = await screen.findByRole('heading', {
    name: '주문이 성공했습니다.'
  });
  expect(completeHeader).toBeInTheDocument();

  // 위 문구가 띄어졌으면 로딩 문구가 사라져야 한다.
  const loadingDisappeared = screen.queryByText('loading');
  expect(loadingDisappeared).not.toBeInTheDocument();

  // 첫 번째 페이지로 돌아가는 버튼 테스트
  const firstPageButton = screen.getByRole('button', {
    name: '첫 페이지로'
  });
  userEvent.click(firstPageButton);


  /* 첫 페이지로 버튼 클릭 시 테스트 */
  const productsTotal = screen.getByText('상품 총 가격: 0');
  expect(productsTotal).toBeInTheDocument();

  const optionsTotal = screen.getByText('옵션 총 가격: 0');
  expect(optionsTotal).toBeInTheDocument();
}); 