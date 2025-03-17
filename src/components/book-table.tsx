import React from 'react';
import { Table, Button, Spin } from 'antd';
import type { TablePaginationConfig } from 'antd';

import type { Book } from '../types/book';

const { Column } = Table;

interface BookTableProps {
  books: Book[];
  loading: boolean;
  currentPage: number;
  totalBooks: number;
  onTableChange: (pagination: TablePaginationConfig) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  loading,
  currentPage,
  totalBooks,
  onTableChange,
  onEdit,
  onDelete,
}) => {
  return (
    <Spin spinning={loading}>
      <Table
        dataSource={books}
        rowKey="id"
        scroll={{ x: true }}
        pagination={{ current: currentPage, total: totalBooks, pageSize: 10 }}
        onChange={onTableChange}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column title="ISBN" dataIndex="isbn" key="isbn" />
        <Column title="ISSN" dataIndex="issn" key="issn" />
        <Column title="Category" dataIndex="category" key="category" />
        <Column title="Publisher" dataIndex="publisher" key="publisher" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column title="Year" dataIndex="year" key="year" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record: Book) => (
            <>
              <Button type="link" onClick={() => onEdit(record.id)}>
                Edit
              </Button>
              <Button danger type="link" onClick={() => onDelete(record.id)}>
                Delete
              </Button>
            </>
          )}
        />
      </Table>
    </Spin>
  );
};

export {BookTable};
