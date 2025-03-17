import React from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import type { FormInstance } from 'antd';

import type { Book } from '../types/book';

interface BookFormModalProps {
  visible: boolean;
  editingBookId: number | null;
  submitting: boolean;
  form: FormInstance;
  onFinish: (data: Omit<Book, 'id'>) => void;
  onCancel: () => void;
}

const BookFormModal: React.FC<BookFormModalProps> = ({
  visible,
  editingBookId,
  submitting,
  form,
  onFinish,
  onCancel,
}) => {
  return (
    <Modal
      title={editingBookId ? 'Edit Book' : 'Create Book'}
      open={visible}
      onCancel={!submitting ? onCancel : undefined}
      maskClosable={!submitting}
      closable={!submitting}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          loading={submitting}
        >
          {editingBookId ? 'Save' : 'Create'}
        </Button>,
      ]}
      styles={{
        body: {
          maxHeight: '70vh',
          overflowY: 'auto',
        },
      }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="isbn" label="ISBN">
          <Input />
        </Form.Item>
        <Form.Item name="issn" label="ISSN">
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="publisher"
          label="Publisher"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, type: 'number' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export {BookFormModal};
