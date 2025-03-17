import React, { useState, useEffect } from 'react';
import { message, Modal, Form, TablePaginationConfig } from 'antd';
import {BookTable} from '../components/book-table';
import { BookFormModal } from '../components/book-form-modal';
import { Header } from '../components/header';
import type { Book } from '../types/book';
import { fetchBooks, createBook, deleteBookById, updateBookById } from '../api/book';

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);

  useEffect(() => {
    loadBooks(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const loadBooks = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const response = await fetchBooks(query, page);

      setBooks(response.data);
      setTotalBooks(response.total);
    } catch {
      message.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Book, 'id'>) => {
    try {
      setSubmitting(true);
      await createBook(data);

      message.success('Book created successfully');
      setVisible(false);
      loadBooks(searchQuery, currentPage);
      form.resetFields();
    } catch {
      message.error('Failed to create book');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id: number) => {
    const bookToEdit = books.find((book) => book.id === id);
    if (!bookToEdit) return;

    setEditingBookId(id);
    setVisible(true);
    form.setFieldsValue(bookToEdit);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBookById(id);

      loadBooks(searchQuery, currentPage);
      message.success('Book deleted successfully');
    } catch {
      message.error('Failed to delete book');
    }
  };

  const handleSaveEdit = async (data: Omit<Book, 'id'>) => {
    try {
      setSubmitting(true);
      if (editingBookId !== null) {
        await updateBookById(editingBookId, data);
        message.success('Book updated successfully');
      }

      setVisible(false);
      setEditingBookId(null);
      loadBooks(searchQuery, currentPage);
      form.resetFields();
    } catch {
      message.error('Failed to update book');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!submitting) {
      setVisible(false);
      setEditingBookId(null);
      form.resetFields();
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) {
      setCurrentPage(pagination.current);
    }
  };

  const confirmDelete = (id: number) => {
    const modal = Modal.confirm({
      title: 'Are you sure you want to delete this book?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      cancelText: 'Cancel',
      maskClosable: true,
      okButtonProps: { danger: true },
      cancelButtonProps: { disabled: false },
      onOk: async () => {
        modal.update({
          okButtonProps: { danger: true, loading: true },
          cancelButtonProps: { disabled: true },
        });

        await handleDelete(id);
        modal.destroy();
      },
    });
  };

  return (
    <div
      style={{
        height: '100vh',
        minWidth: '97vw',
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}
    >
      <Header onCreate={() => setVisible(true)} onSearch={handleSearch}/>
      <main>
        <BookTable
          books={books}
          loading={loading}
          currentPage={currentPage}
          totalBooks={totalBooks}
          onTableChange={handleTableChange}
          onEdit={handleEdit}
          onDelete={confirmDelete}
        />
        <BookFormModal
          visible={visible}
          editingBookId={editingBookId}
          submitting={submitting}
          form={form}
          onFinish={editingBookId !== null ? handleSaveEdit : handleCreate}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
};

export {BookPage};
