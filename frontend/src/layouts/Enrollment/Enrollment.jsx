

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Profile from '../../assets/images/team-4.jp
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import classes from './enrollment.module.css'

import { useEffect, useState } from "react";


import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";


function Tables() {
    const [show, setShow] = useState(false)
    // const [name, setName] = useState('')
    // const [amount, setAmount] = useState('')
    // const [duration, setDuration] = useState('')
    // const [description, setDescription] = useState('')
    const [getEnrollment, setGetEnrollment] = useState([])
    const [on, setOn] = useState(false)
    const [getEnrollmentById , setGetEnrollmentById] = useState('')
    const [uid, setUid] = useState('')
    // const [showView, setShowView] = useState(false);
    // const [plans, setPlans] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL
    

    
     

    // console.log(backendUrl, ' backend url')

    const handleShow = ()=> setShow(true)
    const handleClose = ()=> setShow(false)

    const token = localStorage.getItem("tokens");

   
    // const handleNoview = ()=> setShowView(false)

    
    const handleOff = ()=> setOn(false)

    
    // const postEnrollment = async()=>{
    //     const data = {
    //         amount:amount
    //     }
    //     try{
    //      await axios.post(`${backendUrl}/admin/postenrollment`, data)
    //      window.location.reload()
    //     }catch(err){
    //         console.log(err)
    //     }
    //   }

      useEffect(() => {
        const fetch = async()=>{
            try{
              const token = localStorage.getItem("tokens");
              axios.defaults.headers.common['Authorization'] = token
                const response = await axios.get(`${backendUrl}/admin/getenrollment`)
                const data = response.data
                setGetEnrollment(data)
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
            const response = await axios.get(`${backendUrl}/admin/getenrollmentbyid/${id}`)
            const data = response.data
            setGetEnrollmentById(data)
        }catch(err){
            console.log(err)
        }
    
    }

    // const handleView = (plans)=> {
    //     setShowView(true)
    //     setPlans(plans)
       
    // }

    const handleUpdateChange = (e)=>{
        const {name, value} = e.target
        setGetEnrollmentById((prevstate)=>({...prevstate, [name]:value}))
        
    }

    const updateEnrollment = async()=>{
        const data = {
         
            amount:getEnrollmentById.amount
        }
        console.log(data, ' tehe dada')
      try{
        await axios.put(`${backendUrl}/admin/putenrollment/${uid}`, data)
        window.location.reload()
      }catch(err){
        console.log(err)
      }
    }
    
    // const handleDelete = async(id)=>{
    //     const windowConfirmation = window.confirm('Are you sure to Delete this Plan')
    //     if(windowConfirmation){
    //         try{
    //             await axios.delete(`${backendUrl}/admin/deleteplan/${id}`)
    //             window.location.reload()
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
        
    // }
    if(token){
      return (
        <DashboardLayout>
          <DashboardNavbar />
            <div className={`${classes.plan_banner} p-3 text-light mb-4`}> 
               Enrollment Fee
               {/* <Tooltip title='Add plan'>
               <button type="button" className="btn btn-outline-dark"  >Add</button>
               </Tooltip> */}
            </div>
            <SoftBox className=' text-dark'>
              <div className="container-fluid">
                <div className={`${classes.seperation} row fs-6`}>
                  
                    <div className={`${classes.plan_title} col-6`} >Enrollment fee</div>
                    <div className={`${classes.plan_title} col-6`} >Edit</div>
                </div>
              </div>
            </SoftBox>
            {getEnrollment.map((items, index)=>(
                 <SoftBox key={index} className={`${classes.plan_list} p-2 m-1 text-light bg-dark`} >
                 <div className="container-fluid">
                     <div className={`${classes.seperation} row`}>
                        
                         <div className={`${classes.plan_title} col-6 `} style={{cursor:'pointer'}} >{items.amount}</div>
                        
                         <div className={`${classes.plan_title} col-6`}><FiEdit onClick={()=> handleOn(items._id)}/></div>
                         
                     </div>
                   </div>
                 </SoftBox>
             ))} 
               
    
            
            {/* create plans--- */}
            {/* <Modal show={show} onHide={handleClose}>
           
            <Modal.Body>
              <Form>
              
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Plan Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the fee amonunt"
                    autoFocus
                    onChange={(e)=> setAmount(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={postEnrollment}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}
    
    
    
            {/* update plans--- */}
            <Modal show={on} onHide={handleOff}>
           
            <Modal.Body>
              <Form>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Enrollment Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the fee amonunt"
                    autoFocus
                    name="amount"
                    value={getEnrollmentById.amount}
                    onChange={handleUpdateChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleOff}>
                Close
              </Button>
              <Button variant="primary" onClick={updateEnrollment}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
    
    
          {/* view  */}
          {/* {plans && (
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
        )} */}
        </DashboardLayout>
       
      );
    }else{
      window.location.href='/authentication/sign-in'
    }
 
}

export default Tables;
