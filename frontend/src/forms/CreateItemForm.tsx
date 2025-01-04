import React from 'react';

interface CreateItemFormProps {
  newItem: {
    name: string;
    description: string | null;
    price: number | null;
  };
  setNewItem: (newItem: CreateItemFormProps['newItem']) => void;
  handleCreateItem: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({
  newItem,
  setNewItem,
  handleCreateItem,
}) => {
  return (
    <form onSubmit={handleCreateItem} className="mt-4 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        className="border p-2 mr-2"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description || ''}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Price"
        value={newItem.price || ''}
        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-red-500 text-white p-2 rounded">
        Create Item
      </button>
    </form>
  );
};

export default CreateItemForm;