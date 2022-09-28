import React, { useEffect, useRef, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import NavLink from "@/Components/NavLink";


export default function UploadFromFileField({ auth, header, csrf_token }) {

    const [file, setFile] = useState();
    const [albums, setAlbums] = useState([]);
    const [message, setMessage] = useState('');

    const onFileNameChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const handleAlbumsRead = (albums) => {
        setFile(null);
        setAlbums(albums);
        document.getElementById('upload-file').value = '';
    };

    const onUpload = () => {
        const headers = new Headers();
        const data = new FormData();
        headers.append('X-CSRF-TOKEN', csrf_token);
        data.append('file', file);
        fetch("http://127.0.0.1:8000/readFile", {
            method: "POST",
            headers: headers,
            body: data,
        }).then((response) => {
            response.json().then(albums => {
                handleAlbumsRead(albums.album);
            });
        });
    }

    const onImport = () => {
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append('X-CSRF-TOKEN', csrf_token);
        fetch("http://127.0.0.1:8000/saveToDB", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ "albums": albums }),
        }).then((response) => {
            console.log(response);
            if (response.status == 200){
                setMessage('Successfully imported!');
                setAlbums([]);
            }
        });
    }

    // FileContentReader
    return (
        <div className="mt-5">
            <label className='form-label fw-bold mb-3'>Upload data from file:</label>
            <input id="upload-file"
                type='file'
                name='upload_from_file'
                className='form-control border-gray-300 focus:border-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                onChange={onFileNameChange}
            />
            <button
                className='my-3 btn btn-dark uppercase'
                onClick={() => onUpload()}
            >
                OPEN
            </button>
            <div>
                {albums.length >= 1 &&
                <>
                    <div className="mt-5 p-3 bg-white shadow-sm rounded-lg divide-y">
                        <Row className="p-1 rounded-top mx-1 fw-bolder">
                            <Col sm={3}>Title</Col>
                            <Col sm={3} className='text-center'>Release date</Col>
                            <Col sm={2} className='text-center'>Artist ID</Col>
                            <Col sm={1} className='text-center'>Price</Col>
                            <Col sm={3} className='text-center'>Stock quantity</Col>
                        </Row>
                        {albums.map(album =>
                            <Row className="mx-1 p-1" key={album.title}>
                                <Col sm={3}>{album.title}</Col>
                                <Col sm={3} className='text-center'>{album.release_date}</Col>
                                <Col sm={2} className='text-center'>{album.artist_id}</Col>
                                <Col sm={1} className='text-center'>{album.price}</Col>
                                <Col sm={3} className='text-center'>{album.stock_quantity}</Col>
                            </Row>
                        )}
                    </div>
                        <button
                            className='mt-3 btn btn-dark uppercase'
                            onClick={() => onImport()}
                        >
                            IMPORT
                        </button>
                </>
                }
                {message !== '' && 
                    <Alert variant='success'>
                        {message}
                        <a href='http://127.0.0.1:8000/albums' className='m-2 text-dark'>Back to albums</a>
                    </Alert>
                }
            </div>
        </div>
        
    );
}
