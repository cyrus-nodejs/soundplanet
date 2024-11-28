
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { OverlayTrigger, Overlay, Button,  Form,  TooltipProps } from "react-bootstrap";
import "../../index.css"
import { Link } from "react-router-dom";
import { PLAYLIST } from "../../utils/@types";
import { useEffect,useRef,  useState, RefAttributes } from "react";
import {fetchUpdateTitle, handleOnInput, fetchPlaylist, getMessage, getPlaylist, fetchDeletePlaylist, fetchCreatePlaylist } from "../../redux/features/playlist/playlistSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/hook";
import { getUpdateUser, getIsAuthenticated } from "../../redux/features/auth/authSlice";
import { JSX } from "react/jsx-runtime";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as ContextMenu from "@radix-ui/react-context-menu";

const HomeLeft = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let data;
  
  const dispatch = useAppDispatch()

const updateUser = useAppSelector(getUpdateUser)
const isauthenticated = useAppSelector(getIsAuthenticated)
const Playlist = useAppSelector(getPlaylist)
const message = useAppSelector(getMessage)
 const [title, setTitle]  = useState("")
 const [show, setShow] = useState(false)
 const target = useRef(null);
 
const HandleSelect = (e:Event) =>{
e.preventDefault()
}

const showForm = () => {
  setShow(true)
}
const hideForm = () => {
  setShow(false)
}

useEffect(() => {
  dispatch(fetchPlaylist())
}, [dispatch])
 


const renderTooltip1 = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
  <div id="button-tooltip " {...props}>
    Login to Create Playlist
  </div>
);

const [submitting, setSubmitting] = useState(false);



interface FormValues {
title: string
}




const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Name must be minimum 2').max(100, 'Name must not be more than 100 characters').required('Name is required'),
 })



const handleSubmit = async (values: FormValues) => {
  try {
    setSubmitting(true);
    dispatch(fetchCreatePlaylist(values))
    console.log(values);
    // Set submitting to false after successful submission
    setSubmitting(false);
  } catch (error) {
    // Handle form submission error
    console.error(error);
    setSubmitting(false);
  }
};

const formik = useFormik({
  initialValues: {
    title: '',
  
  },
  validationSchema,
  onSubmit: handleSubmit,
});



  return (

    
    <div  className="mt-3 d-none d-lg-block  homeleft col-2 me-1 rounded  position-relative  text-light ">
    

    <div className="d-flex mb-3">
    <div className="p-2">Your Library</div>
    
    
         <div  className="ms-auto  p-1  " >
        <Button size="sm" variant="" ref={target} onClick={() => setShow(!show)}>
        <i    className='bx text-light bx-plus bx-sm'></i>
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          placement: _placement,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          arrowProps: _arrowProps,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          show: _show,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          popper: _popper,
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: '',
              padding: '0px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
            
          >
            {updateUser ?  (<Form className="p-1" onSubmit={formik.handleSubmit}>
          
  
          <div className="d-flex w-75">
        
          <div className="">  <Form.Control type="text" className=" form-control  rounded-2   border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Create Playlist" value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}  name="title" />
          {formik.touched.title && formik.errors.title && (
                    <div className="error text-light">{formik.errors.title} </div>
                  )}
                 
          </div>
          <div className="" onClick={hideForm} ><Button  type="submit" disabled={submitting} variant="dark" >Save</Button></div>
          </div>
        
         
        
                       
        </Form>
        ) : (<p>Login to Create Playlist</p>) }
             
          </div>
        )}
      </Overlay>
      </div>
        <div className="p-2"><i className='bx  bx-sm bx-right-arrow-alt'></i></div>
      
  </div>

  { updateUser && isauthenticated  ? (
  
    <div  className="">
        {Playlist?.length > 0   ? ( <div>
          <div className="text-start">Playlist</div>
{Playlist?.map((track:PLAYLIST, id:number) =>{
          return (
    <ContextMenu.Root>
			<ContextMenu.Trigger className="ContextMenuTrigger">
     
      <div id={track?._id} key={track?._id}   className="d-flex  mb-2  rounded-2 align-items-center">
            
            <div className="flex-shrink-0">
            <i className='bx bx-music bg-secondary bx-border bx-sm '></i>
            </div>
            <div className="flex-grow-1 rounded ms-3">
      <div key={id} className="d-flex flex-column ">
            <div className="">{track?.title}  </div>
            <div className=" text-light">Playlist. {updateUser?.firstname.toUpperCase() } </div>
            </div>
       
       </div>
     
          </div>
			</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content
					className="ContextMenuContent bg-dark"
					
				>
				
        <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/playlist/${track._id}`} className='text-decoration-none d-block text-success '> Go to {track?.title}  </Link> 
					</ContextMenu.Item>
					<ContextMenu.Item className="ContextMenuItem">
          <Link to={`/allartist`} className='text-decoration-none d-block text-success '> Go to Artist Radio  </Link> 
					</ContextMenu.Item>
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger className="ContextMenuSubTrigger text-white">
							Edit Playlist
              <div className="RightSlot">
              <i className='bx bx-chevron-right text-white '></i>
							</div>
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent
								className="ContextMenuSubContent w-75"
								sideOffset={2}
								alignOffset={-5}
							>
                
								<ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem ">
               
                <div className="d-flex ">
  <div className="">  <input type="text" className="bg-dark  rounded-2  text-light border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Edit title" onChange={e => {setTitle(e.target.value)}} /></div>
  <div className="" ><Button variant="dark" onClick={() => dispatch(fetchUpdateTitle(data={title,track}))}>Save</Button></div>
</div>
								</ContextMenu.Item>
								
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Sub>
          <ContextMenu.Item className="ContextMenuItem">
          <div onClick={() => dispatch(fetchDeletePlaylist(track))} >Delete Playlist</div>
					</ContextMenu.Item>
          <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/report`} className='text-decoration-none d-block text-success '> Report </Link> 
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
  
       
          
              )
       })}

</div>
) : (<div className=" rounded-3  flex-column mb-3">
  <div className="p-2 fs-6  d-inline-flex">Create Your First Playlist</div>
  <div className="p-2 d-inline-flex">It's is easy we will help you </div>
  <div className="d-inline-flex">
  <div className="d-flex ">
  <div onClick={showForm} className={show ? ("p-2  me-1 bg-light text-dark  rounded-3 ") : ("p-2  me-1 bg-light text-dark  rounded-3 ") }>Create Playlist</div>
  {message  &&  (<p className="text-warning" >{message}</p>)}
  {show && ( <div className="d-flex ">
    <Form onSubmit={formik.handleSubmit}>
  <div className="">     <Form.Control size="lg"  required  value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}   name="title"   type="text" placeholder="title" />
      {formik.touched.title && formik.errors.title && (
            <div className="error ">{formik.errors.title} {message}</div>
            
          )}</div>
  <div className="ms-1"     ><Button type="submit" className=""  disabled={submitting} variant="dark" >Save</Button></div></Form>

</div>)}

  </div>
  </div>
</div>)}
    
   
</div>
) : (
 <div className=" rounded-3  flex-column mb-3">
  <div className="p-2 fs-6 d-inline-flex">Create Your First Playlist</div>
  <div className="p-2 d-inline-flex">It's is easy we will help you </div>
  <div  className="ms-auto  p-2  rounded-5" >
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip1}
    >
       <div  className="p-2 bg-light text-dark  rounded-3 d-inline-flex">Create Playlist</div>
    </OverlayTrigger>
          
        </div>

</div>

  
) }  
<ContextMenu.Root>
<ContextMenu.Trigger className="ContextMenuTrigger">
<div className="h-100">

</div>
</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content
					className="ContextMenuContent bg-dark"
					
				>
				
      
					<ContextMenu.Item className="ContextMenuItem">
          <Link to={`/allartists`} className='text-decoration-none d-block text-white '> Go to Artist Radio  </Link> 
					</ContextMenu.Item>
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger className="ContextMenuSubTrigger text-white">
							Create Playlist
              <div className="RightSlot">
              <i className='bx bx-chevron-right '></i>
							</div>
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent
								className="ContextMenuSubContent w-75"
								sideOffset={2}
								alignOffset={-5}
							>
                {message  &&  (<p className="text-warning" >{message}</p>)}
								<ContextMenu.Item onSelect={HandleSelect} className="ContextMenuItem ">
              
                <Form onSubmit={formik.handleSubmit}>
          
  
  <div className="d-flex ">

  <div className="">  <Form.Control type="text" className="bg-dark  rounded-2  text-light border border-0  w-100 h-100  rounded-2  shadow-none " placeholder="Edit title" value={formik.values.title} onChange={formik.handleChange} onInput={() => dispatch(handleOnInput())}  name="title" />
  {formik.touched.title && formik.errors.title && (
            <div className="error text-light">{formik.errors.title} </div>
          )}
         
  </div>
  <div className="" ><Button type="submit" disabled={submitting} variant="success" >Save</Button></div>
  </div>

 

               
</Form>


								</ContextMenu.Item>
								
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Sub>
          
          <ContextMenu.Item className="ContextMenuItem">
          <Link to={`/report`} className='text-decoration-none d-block text-white '> Report </Link> 
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
</div>
  )
}

export default HomeLeft