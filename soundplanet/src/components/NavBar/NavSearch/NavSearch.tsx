


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
        <a href="/">
          <div className="py-2">
          <i className='bx bx-home bx-border-circle bx-sm text-light'></i>
          </div>
          </a>
        <div className="p-2 col-12 ">
    
<input onChange = {(e) => dispatch(handleSearchterm(e.target.value))}  type="text" className="text-light navform  w-100 h-100 border rounded-4 border-light shadow-none " placeholder="What do you want to play?" />
</div> 


    </div>
  )
}

export default NavSearch