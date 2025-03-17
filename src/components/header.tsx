import React from 'react';
import { Button, Input } from 'antd';

interface BookHeaderProps {
  onCreate: () => void;
  onSearch: (value: string) => void;
}

const Header: React.FC<BookHeaderProps> = ({ onCreate, onSearch }) => {
  return (
    <header style={{ display: 'flex', gap: '10px' }}>
      <Button type="primary" onClick={onCreate}>
        Create
      </Button>
      <Input.Search
        placeholder="Search by Book Title"
        onSearch={onSearch}
        style={{ maxWidth: '100%', marginBottom: 16 }}
      />
    </header>
  );
};

export {Header};
