import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListStorageComponent from './components/ListStorageComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import StorageComponent from './components/StorageComponent'

function App() {


  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* // http://localhost:3000 */}
            <Route path='/' element= { <ListStorageComponent />}></Route>
            {/* // http://localhost:3000/storages */}
            <Route path='/storages' element= {<ListStorageComponent />}></Route>
            {/* // http://localhost:3000/add-storage */}
            <Route path='/add-storage' element= {<StorageComponent />}></Route>
            {/* // http://localhost:3000/edit-storage/1 */}
            <Route path='/edit-storage/:id' element= {<StorageComponent />}></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
