import React, { useEffect, useState } from 'react'
import Classes from './home.module.css'
import Profile from '../../assets/images/team-3.jpg'
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    const [getPlans, setGetPlans] = useState([])
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const handleOff = () => setView(false);
    const handleOn = () => setView(true);
    const backendUrl = process.env.REACT_APP_BACKEND_URL

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetch = async()=>{
        try{
            const token = localStorage.getItem("userToken");
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${backendUrl}/admin/getplans`)
            const data = response.data
            setGetPlans(data)
            console.log(data,"the data of ")
        }catch(err){
            console.log(err)
            navigate('/landingpage')
        }
    }
    fetch()
  }, [])
  
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(token);
    } else {
      console.log("Token not found in localStorage");
    }
  }, []);
  
  const token = localStorage.getItem("userToken");
  const users = JSON.parse(localStorage.getItem("users",));
 
  
  const handleLogOut =()=>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('users');
    window.location.href="/landingpage"
  }

if(token){
  return (
    <div className={Classes.banner}>
        <nav className="container py-4">
            <div className='row'>
                <div className='col-6 '>
                    <div className={Classes.profile_holder}>
                        <img className={Classes.profile_image} src={`${backendUrl}/images/${users.image}`} alt="profile" onClick={handleOn} />
                    </div>
                </div>
                <div className={`${Classes.nav2} col-6`}>
                    <Button className='bg-dark text-light border-danger' onClick={handleShow}>Select plan</Button>
                </div>

            </div>
        </nav>
        <div className="container my-5 mb-5">
            <div className={`${Classes.crow} row`}>
                <div className={`${Classes.main1} col-6 mx-1 text-light text-center p-5`}>
                    <div>
                         No existing plan
                    </div>
                </div>
                <div className={`${Classes.main1} col-2 mx-1 text-light text-center p-5`}>
                    <div>
                        0 days left
                    </div>
                </div>
                <div className={`${Classes.main1} col-3 mx-1 text-light text-center p-5`}>
                    <div>
                        <p>Date Of Expiry</p>
                        17-4-2024
                    </div>
                </div>
            </div>
        </div>
        <div className='container'>
            <div className="row">
                <div className="col-12 p-5 bg-dark mb-4"></div>
                <div className="col-12 p-5 bg-secondary mb-5"></div>
            </div>
        </div>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        className=''
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Plan</Modal.Title>
        </Modal.Header>
       

     
        <Modal.Body  style={{display:'flex'}}>
       
          <div  className={`${Classes.plan_card} container-fluid`}>
            <div className="row" style={{display:'flex', justifyContent:'center'}}>
            {getPlans.map((items, index)=>(
               <div key={index} className="col-3 m-4 text-center" style={{backgroundColor:'GrayText', borderRadius:'32px'}}>
                 
            <h3>{items.name}</h3>
            <p>{items.duration}</p>
            <p>{items.amount}</p>
                </div>
                       ))}
            </div>
          </div>         
 
        </Modal.Body>
  
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      {/* view user--- */}
      <Modal show={view} onHide={handleOff} centered>
        <Modal.Header closeButton>
          <Modal.Title>{users.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div style={{height:'100px', width:'100px'}}>
                    <img src={`${backendUrl}/images/${users.image}`} style={{width:'100%', objectFit:'cover', height:'100%'}} alt="" />
                </div>
                <p>{users.phone}</p>
                <p>{users.email}</p>
                <p>{users.dateOfBirth}</p>
                <p>Height :{users.height}</p>
                <p>Weight :{users.weight}</p>
                <p>{users.blood}</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOff}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogOut}>
            Log out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}else{
    navigate('/landingpage')
}
}

export default Home