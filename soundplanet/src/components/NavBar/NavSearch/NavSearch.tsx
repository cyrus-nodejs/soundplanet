
import { Form } from 'react-bootstrap'

import { useAppDispatch, useAppSelector } from '../../../redux/app/hook'
import { fetchSearchResult, handleSearchterm, getSearchTerm } from '../../../redux/features/audio/audioSlice'
import { useEffect } from 'react'
const NavSearch = () => {
  const searchterm = useAppSelector(getSearchTerm)
  const dispatch = useAppDispatch()
   

useEffect(() =>{
  dispatch(fetchSearchResult(searchterm))
      }, [dispatch, searchterm])
       
     
  return (
    <div className="d-flex  " >
        <a href="/" className="text-decoration-none text-light">
          <div className="py-2 ">
          <i className='bx bx-home d-none d-lg-block bx-border-circle bx-sm text-light'></i>
          </div>
          </a>
        <div className="p-2 mx-3 col-12 ">
    
<input onChange = {(e) => dispatch(handleSearchterm(e.target.value))}  type="text" className="text-light navform  w-100 h-100 border rounded-4 border-light shadow-none d-none d-lg-block" placeholder="What do you want to play?" />
<Form.Control onChange = {(e) => dispatch(handleSearchterm(e.target.value))} placeholder="What do you want to play?" type="text"  className="d-lg-none navform shadow-none" />
</div> 


    </div>
  )
}

export default NavSearch