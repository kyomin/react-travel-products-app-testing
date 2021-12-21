import { render, screen } from '@testing-library/react';
import SummaryPage from '../SummaryPage';

test('checkbox and button', () => {
	render(<SummaryPage />);

	// 처음 렌더 시의 체크 박스는 체크가 해제된 상태인가?
	const checkbox = screen.getByRole('checkbox', {
		name: '주문하려는 것을 확인하셨나요?',
	});
	expect(checkbox.checked).toEqual(false);

	// 체크가 해제된 상태에서 버튼은 비활성화인가?
	const confirmButton = screen.getByRole('button', {
		name: '주문 확인',
	});
	expect(confirmButton.disabled).toBeTruthy();
});
