import { render } from '@testing-library/react';
import { OrderContextProvider } from './contexts/OrderContext';

const customRender = (ui, options) => render(ui, { wrapper: OrderContextProvider, ...options });

// render 메서드 이외에도 tlr에서 제공해주는 모든 것을 다시 export 해주기
export * from '@testing-library/react';

// 원래 tlr에서 제공하는 render 메서드를 customRender로 override 해주기
export { customRender as render };