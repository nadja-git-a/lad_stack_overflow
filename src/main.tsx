import ReactDOM from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

ReactDOM.createRoot(rootElement).render(<App />);

// 1.  Добавь husky который будет запускать lint fix  на пре коммит
// 2. Сделай так чтобы ошибки prettier отображались в коде редактора
