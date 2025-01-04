import React from 'react';

interface ItemDetailsProps {
    itemDetails: any;
    onClose: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsProps> = ({ itemDetails, onClose }) => {


    return (
        <>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            Item Details
                        </h3>
                        <div className="mt-2">
                            <p>Item Name: {itemDetails?.name}</p>
                            <p>Item Description: {itemDetails?.description}</p>
                            <p>Item price: {itemDetails?.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </>
    );
};

export default ItemDetailsModal;