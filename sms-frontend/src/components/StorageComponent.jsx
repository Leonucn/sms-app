import React, { useEffect, useState } from 'react'
import { createStorage, getStorage, updateStorage } from '../services/StorageService'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';

const StorageComponent = () => {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [purchaseDate, setPurchaseDate] = useState('')

    const [errors, setErrors] = useState({
        name: '',
        category: '',
        quantity: '',
        purchaseDate: ''
    })

    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() => {

        if (id) {
            getStorage(id).then((response) => {
                setName(response.data.name);
                setCategory(response.data.category);
                setQuantity(response.data.quantity);
                setPurchaseDate(response.data.purchaseDate);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    function saveOrUpdateStorage(e) {
        e.preventDefault();

        if (validateFrom()) {

            const storage = {name, category, quantity, purchaseDate}
            console.log(storage);

            if (id) {
                updateStorage(id, storage).then((response) => {
                    console.log(response.data);
                    navigator('/storages')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createStorage(storage).then((response) => {
                    console.log(response.data);
                    navigator('/storages')
                }).catch(error => {
                    console.error(error);
                })
            }
        }

    }

    function validateFrom() {
        let valid = true;

        const errorsCopy = {...errors} //copy errors obj

        const today = new Date().toISOString().split("T")[0];

        if (name.trim()) {
            errorsCopy.name = '';
        }
        else{
            errorsCopy.name = 'Name is required'
            valid = false;
        }

        if (category.trim()) {
            errorsCopy.category = '';
        }
        else{
            errorsCopy.category = 'Category is required'
            valid = false;
        }


        if (!quantity) {
            console.log(quantity);
            errorsCopy.quantity = 'Quantity is required'
            valid = false;
        }
        else if (quantity > 0) {
            errorsCopy.quantity = '';
        }
        else{
            errorsCopy.quantity = 'Quantity must be greater than 0'
            valid = false;
        }

        if (!purchaseDate) {
            errorsCopy.purchaseDate = 'Purchase Date is required'
            valid = false;
        }
        else if (purchaseDate > today){
            errorsCopy.purchaseDate = 'Purchase date cannot be in the future'
            valid = false;
        }
        else{
            errorsCopy.purchaseDate = '';
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(params) {
        if (id) {
            return <h2 className='text-center'>Update Storage</h2>
        }
        else{
            return <h2 className='text-center'>Add Storage</h2>
        }
    }

  return (
    <div className='container'>
        <br /> <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Item Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Storage Name'
                                name='name'
                                value={name}
                                className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </input>
                            { errors.name && <div className='invalid-feedback'> { errors.name}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Category:</label>
                            <input
                                type='text'
                                placeholder='Enter Storage Category'
                                name='category'
                                value={category}
                                className={`form-control ${ errors.category ? 'is-invalid': ''}`}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </input>
                            { errors.category && <div className='invalid-feedback'> { errors.category}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Quantity:</label>
                            <input
                                type='number'
                                placeholder='Enter Item counts'
                                name='quantity'
                                value={quantity}
                                className={`form-control ${ errors.quantity ? 'is-invalid': ''}`}
                                onChange={(e) => setQuantity(e.target.value)}
                            >
                            </input>
                            { errors.quantity && <div className='invalid-feedback'> { errors.quantity}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Purchase Date:</label>
                            <input
                                type='date'
                                placeholder='Enter Purchase Date in format:YYYY-MM-DD'
                                max={moment().format("YYYY-MM-DD")}
                                name='purchaseDate'
                                value={purchaseDate}
                                className={`form-control ${ errors.purchaseDate ? 'is-invalid': ''}`}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                            >
                            </input>
                            { errors.purchaseDate && <div className='invalid-feedback'> { errors.purchaseDate}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateStorage}>Submit</button>
                    </form>

                </div>
            </div>

        </div>



    </div>
  )
}

export default StorageComponent