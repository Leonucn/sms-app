import React, {useEffect, useState} from 'react'
import { deleteStorage, listStorages, getStorageByNameOrCategory } from '../services/StorageService'
import { useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'


const ListStorageComponent = () => {

    const [storages, setStorages] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [lastSearched, setLastSearched] = useState('')
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const navigator = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault(); 
        setLastSearched(searchQuery);
        try {
            setIsSearching(true);
            if (!searchQuery.trim()) {
                // If search is empty, load all storages
                const response = await listStorages();
                setStorages(response.data);
            } else {
                const response = await getStorageByNameOrCategory(searchQuery, searchQuery);
                setStorages(response.data);
            }
        } catch (error) {
            console.error('Error searching storages:', error);
            setStorages([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        // Remove any characters besides letters, numbers, spaces, hyphens, or periods
        const sanitizedValue = value.replace(/[^a-zA-Z0-9\s.-]/g, '');
        setSearchQuery(sanitizedValue);
    };

    const handleSort = (field) => {
        const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newOrder);

        const sortedStorages = [...storages].sort((a, b) => {
            if (a[field] === null) return 1;
            if (b[field] === null) return -1;
            
            if (field === 'id' || field === 'quantity') {
                return newOrder === 'asc' 
                    ? a[field] - b[field]
                    : b[field] - a[field];
            }
            
            return newOrder === 'asc'
                ? a[field].toString().localeCompare(b[field].toString())
                : b[field].toString().localeCompare(a[field].toString());
        });
        
        setStorages(sortedStorages);
    };

    // Initial load of all storages
    useEffect(() => {
        getAllStorages();
    }, []);

    function getAllStorages() {
        setSearchQuery('');
        setSortField('');
        setSortOrder('asc'); 
        listStorages().then((response) => {
            setStorages(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewStorage() {
        navigator('/add-storage')
    }

    function updateStorage(id) {
        navigator(`/edit-storage/${id}`)
    }

    function removeStorage(id) {
        console.log(id);

        deleteStorage(id).then((response) => {
            getAllStorages();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>

        <h2 className='text-center'>List of Storages</h2>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex gap-2">
                <button className="btn btn-primary d-flex align-items-center gap-2" onClick={addNewStorage}>
                    <i className="bi bi-plus"></i>
                    New
                </button>
                <button 
                    className="btn btn-secondary d-flex align-items-center gap-2" 
                    onClick={getAllStorages}
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>
            
            <form className="d-flex align-items-center gap-2" onSubmit={handleSearch}>
                <div className="position-relative">
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
                    <input
                        id="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="form-control ps-5 rounded-pill"
                        placeholder="Search..."
                        style={{ 
                            width: "250px",
                            boxShadow: "0 1px 6px rgba(32,33,36,.28)",
                            border: "none"
                        }}
                    />
                    {isSearching && (
                        <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                            <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
        {storages.length === 0 ? (
            <div className="alert alert-info" role="alert">
                No storages found for "{lastSearched}"
            </div>
        ) : (
            <table className='table table-striped table-bordered'>
                <thead className="table-dark">
                    <tr>
                        <th style={{width:'10%'}} onClick={() => handleSort('id')} className="cursor-pointer">
                            ID {sortField === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{width:'25%'}} onClick={() => handleSort('name')} className="cursor-pointer">
                            Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{width:'20%'}} onClick={() => handleSort('category')} className="cursor-pointer">
                            Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{width:'14%'}} onClick={() => handleSort('quantity')} className="cursor-pointer">
                            Quantity {sortField === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{width:'20%'}} onClick={() => handleSort('purchaseDate')} className="cursor-pointer">
                            Purchase Date {sortField === 'purchaseDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th style={{width:'11%'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        storages.map(storage =>
                            <tr key={storage.id}>
                                <td>{storage.id}</td>
                                <td>{storage.name}</td>
                                <td>{storage.category}</td>
                                <td>{storage.quantity}</td>
                                <td>{storage.purchaseDate}</td>
                                <td>
                                    <button className='btn btn-outline-primary' onClick={() => updateStorage(storage.id)}
                                        style={{marginLeft: '10px' , borderRadius: '10px'}}
                                        ><i className="bi bi-pen"></i></button>
                                    <button className='btn btn-outline-danger' onClick={() => removeStorage(storage.id)}
                                        style={{marginLeft: '10px' , borderRadius: '10px'}}
                                        ><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )}
    </div>
  )
}

export default ListStorageComponent