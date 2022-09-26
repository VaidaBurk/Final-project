import React from 'react';

export default function AddToBasketButton({ itemId, addToBasket }) {
    return (
        <button
            className="px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 transition ease-in-out duration-150"
            onClick={() => {addToBasket(itemId)}}
        >
            Add to basket
        </button>
    );
}
