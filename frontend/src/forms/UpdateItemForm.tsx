// UpdateItemModal.tsx

import React from 'react';

interface UpdateItemModalProps {
    editingItem: any;
    setEditingItem: (item: any) => void;
    handleUpdateItem: (event: React.FormEvent) => void;
}

const UpdateItemForm: React.FC<UpdateItemModalProps> = ({
    editingItem,
    setEditingItem,
    handleUpdateItem,
}) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex justify-center items-center" aria-hidden="true" aria-labelledby="modal-headline" role="dialog" aria-modal="true">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Update Item</h3>
                            <form onSubmit={handleUpdateItem} className="mb-4">
                                <div className='flex flex-col gap-4'>
                                    <input type="text" placeholder="Name" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} className="border p-2 mr-2" required />
                                    <input type="text" placeholder="Description" value={editingItem.description || ''} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} className="border p-2 mr-2" />
                                    <input type="text" placeholder="Price" value={editingItem.price} onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })} className="border p-2 mr-2" required />
                                </div>
                                <button type="submit" className="bg-green-500 text-white p-2 rounded">Update Item</button>
                                <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" onClick={() => setEditingItem(null)} className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-900">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateItemForm;