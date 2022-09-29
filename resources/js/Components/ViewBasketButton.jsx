import React from 'react';

export default function ViewBasketButton() {
    return (
        <a className='btn btn-outline-dark btn-sm mr-2 uppercase' href={route('basket')}>View Basket</a>
    );
}
