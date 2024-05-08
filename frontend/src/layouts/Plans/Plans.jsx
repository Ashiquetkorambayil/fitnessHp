

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Profile from '../../assets/images/team-4.jp
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import classes from './plans.module.css'

import { useEffect, useState } from "react";


import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";


function Tables() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [getPlans, setGetPlans] = useState([])
    const [on, setOn] = useState(false)
    const [getPlansById , setGetPlansById] = useState('')
    const [uid, setUid] = useState('')
    const [showView, setShowView] = useState(false);
    const [plans, setPlans] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL
    const token = localStorage.getItem("tokens");
    // console.log(backendUrl, ' backend url')

    const handleShow = ()=> setShow(true)
    const handleClose = ()=> setShow(false)

   
    const handleNoview = ()=> setShowView(false)

    
    const handleOff = ()=> setOn(false)

    
    const postPlans = async()=>{
        const data = {
            name:name,
            amount:amount,
            duration:duration,
            description:description
        }
        try{
          const token = localStorage.getItem("tokens");
                axios.defaults.headers.common['Authorization'] = token
         await axios.post(`${backendUrl}/admin/postPlan`, data)
         window.location.reload()
        }catch(err){
            console.log(err)
        }
      }

      useEffect(() => {
        const fetch = async()=>{
            try{
                const token = localStorage.getItem("tokens");
                axios.defaults.headers.common['Authorization'] = token
                const response = await axios.get(`${backendUrl}/admin/getplans`)
                const data = response.data
                setGetPlans(data)
            }catch(err){
                console.log(err)
            }
        }
        fetch()
      }, [])

      const  handleOn = async(id)=> {
        setOn(true);
        setUid(id)
        
        try{
          const token = localStorage.getItem("tokens");
                axios.defaults.headers.common['Authorization'] = token
            const response = await axios.get(`${backendUrl}/admin/getplansbyid/${id}`)
            const data = response.data
            setGetPlansById(data)
        }catch(err){
            console.log(err)
        }
    
    }

    const handleView = (plans)=> {
        setShowView(true)
        setPlans(plans)
       
    }

    const handleUpdateChange = (e)=>{
        const {name, value} = e.target
        setGetPlansById((prevstate)=>({...prevstate, [name]:value}))
        
    }

    const updatePlans = async()=>{
        const data = {
            name:getPlansById.name,
            amount:getPlansById.amount,
            duration:getPlansById.duration,
            description:getPlansById.description
        }
        console.log(data, ' tehe dada')
      try{
        const token = localStorage.getItem("tokens");
                axios.defaults.headers.common['Authorization'] = token
        await axios.put(`${backendUrl}/admin/putplans/${uid}`, data)
        window.location.reload()
      }catch(err){
        console.log(err)
      }
    }
    
    const handleDelete = async(id)=>{
        const windowConfirmation = window.confirm('Are you sure to Delete this Plan')
        if(windowConfirmation){
            try{
              const token = localStorage.getItem("tokens");
                axios.defaults.headers.common['Authorization'] = token
                await axios.delete(`${backendUrl}/admin/deleteplan/${id}`)
                window.location.reload()
            }catch(err){
                console.log(err)
            }
        }
        
    }
    if(token){
      return (
        <DashboardLayout>
          <DashboardNavbar />
            <div className={`${classes.plan_banner} p-3 text-light mb-4`}> 
               Plans
               <Tooltip title='Add plan'>
               <button type="button" className="btn btn-outline-dark" onClick={handleShow} >Add</button>
               </Tooltip>
            </div>
            <SoftBox className=' text-dark'>
              <div className="container-fluid">
                <div className={`${classes.seperation} row fs-6`}>
                  
                    <div className={`${classes.plan_title} col-2`} >Plan</div>
                    <div className={`${classes.plan_title} col-2`} >Duration</div>
                    <div className={`${classes.plan_title} col-2`} >Amount</div>
                    <div className={`${classes.plan_title} col-2`} >Edit</div>
                    <div className={`${classes.plan_title} col-2`} >Delete</div>
                </div>
              </div>
            </SoftBox>
            {getPlans.map((items, index)=>(
                 <SoftBox key={index}  className={`${classes.plan_list} p-2 m-1 text-light bg-dark`} >
                 <div className="container-fluid">
                     <div className={`${classes.seperation} row`}>
                        
                         <div className={`${classes.plan_title} col-2 `} style={{cursor:'pointer'}} onClick={()=>handleView(items)}>{items.name}</div>
                         <div className={`${classes.plan_title} col-2`}>{items.duration}</div>
                         <div className={`${classes.plan_title} col-2`}>{items.amount}</div>
                         <div className={`${classes.plan_title} col-2`}><FiEdit onClick={()=> handleOn(items._id)}/></div>
                         <div className={`${classes.plan_title} col-2`}><AiOutlineDelete onClick={()=> handleDelete(items._id)}/></div>
                     </div>
                   </div>
                 </SoftBox>
            ))}
               
    
            
            {/* create plans--- */}
            <Modal show={show} onHide={handleClose}>
           
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Plan name"
                    autoFocus
                    onChange={(e)=> setName(e.target.value)}
                  />
                </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Plan Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the fee amonunt"
                    onChange={(e)=> setAmount(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Plan Duration in month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the duration"
                    
                    onChange={(e)=> setDuration(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Plan Description</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={(e)=> setDescription(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={postPlans}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
    
    
    
            {/* update plans--- */}
            <Modal show={on} onHide={handleOff}>
           
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Plan name"
                    autoFocus
                    name="name"
                    value={getPlansById.name}
                    onChange={handleUpdateChange}
                  />
                </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Plan Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the fee amonunt"
                    autoFocus
                    name="amount"
                    value={getPlansById.amount}
                    onChange={handleUpdateChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Plan Duration in month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the duration"
                    autoFocus
                    name="duration"
                    value={getPlansById.duration}
                    onChange={handleUpdateChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Plan Description</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                  name="description"
                  value={getPlansById.description}
                  onChange={handleUpdateChange}
                   />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleOff}>
                Close
              </Button>
              <Button variant="primary" onClick={updatePlans}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
    
    
          {/* view  */}
          {plans && (
          <Modal
          show={showView}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
              {plans.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <p>
             Amount: {plans.amount}
            </p>
            <p>
             Duration: {plans.duration}
            </p>
            <p>
             Description: {plans.description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleNoview}>Close</Button>
          </Modal.Footer>
        </Modal>
        )}
        </DashboardLayout>
       
      );
    }else{
      window.location.href='/authentication/sign-in'
    }
  
}

export default Tables;
