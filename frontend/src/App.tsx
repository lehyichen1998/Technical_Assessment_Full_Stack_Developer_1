import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateItemForm from './forms/CreateItemForm.tsx';
import UpdateItemForm from './forms/UpdateItemForm.tsx';
import ItemDetailsForm from './forms/ItemDetailsForm.tsx';

interface Item {
  id: number;
  name: string;
  description: string | null;
  price: number;
}

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Omit<Item, 'id'>>({ name: '', description: null, price: 0 });
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showItemDetails, setShowItemDetails] = React.useState(false);
  const [itemId, setItemId] = React.useState<number | null>(null);
  const [itemDetails, setItemDetails] = React.useState<any>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/items');
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/api/items', newItem);
      setNewItem({ name: '', description: null, price: 0 }); // Clear the form
      fetchItems(); // Refresh the item list
      setShowModal(false);
    } catch (error) {
      console.error("Error creating item:", error);
      // toast.error(`Error creating item: ${error}`);
    }
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      try {
        await axios.put(`http://localhost:3005/api/items/${editingItem?.id}`,
          {
            "name": editingItem.name,
            "description": editingItem.description,
            "price": parseFloat(editingItem.price)
          }
        );
        setEditingItem(null); // Clear editing mode
        fetchItems();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const getItemDetails = async (itemId: number): Promise<Item | null> => {
    try {
      const response = await axios.get(`http://localhost:3005/api/items/${itemId}`);
      setItemDetails(response.data.data[0]);
      return response.data;
    } catch (error) {
      console.error("Error fetching item details:", error);
      return null;
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:3005/api/items/${id}`);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Item Management</h1>
        <button type="button" className="bg-blue-500 text-white p-2 rounded" onClick={() => setShowModal(true)}>Create Item</button>
      </div>
      {/* Create Item Form */}
      {
        showModal && (<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center items-center" aria-hidden="true" aria-labelledby="modal-headline" role="dialog" aria-modal="true">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Create Item</h3>
                  <CreateItemForm
                    newItem={newItem}
                    setNewItem={setNewItem}
                    handleCreateItem={handleCreateItem}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-900" onClick={() => setShowModal(false)}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>)
      }

      {/* Edit Item Form */}
      {editingItem && <UpdateItemForm editingItem={editingItem} setEditingItem={setEditingItem} handleUpdateItem={handleUpdateItem} />}

      {/* Item List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">{item.price}</td>
              <td className="border p-2">
                <button onClick={() => setEditingItem(item)} className="bg-yellow-500 text-white p-1 rounded mr-1">Edit</button>
                <button onClick={() => {
                  setItemId(item.id);
                  setShowItemDetails(true);
                  getItemDetails(item.id);
                }} className="bg-green-500 text-white p-1 rounded mr-1">View</button>

                {
                  showItemDetails && (<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center items-center" aria-hidden="true" aria-labelledby="modal-headline" role="dialog" aria-modal="true">
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <ItemDetailsForm itemDetails={itemDetails} onClose={() => setShowItemDetails(false)} />
                      </div>
                    </div>
                  </div>
                  )
                }
                <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;