import React from 'react';
import { Table } from 'react-bootstrap';

export default function TotalPrice({totalPrice}) {
    return (
        <Table className="font-monospace">
            <tbody>
                <tr>
                    <td>Total price {totalPrice} EUR</td>
                </tr>
            </tbody>
        </Table>
    );
}
