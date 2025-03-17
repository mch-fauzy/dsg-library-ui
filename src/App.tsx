import React from 'react';
import { ConfigProvider } from 'antd';
import { BookPage } from './pages/book-page';

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <BookPage />
    </ConfigProvider>
  );
};

export default App;
