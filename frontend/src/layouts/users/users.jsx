

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import Tooltip from "@mui/material/Tooltip";
// Soft UI Dashboard React components
import SoftAlert from "components/SoftAlert";



// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import classes from './user.module.css'
import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { token } from "stylis";
import { valid } from "chroma-js";
import { Elevator } from "@mui/icons-material";
import { validate } from "uuid";

function Tables() {
    const [show, setShow] = useState(false)
    const [on, setOn] = useState(false)
    const [getEnrollment, setGetEnrollment] = useState([])
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [blood, setBlood] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [getUsers, setGetUsers] = useState([])
    const [files, setFiles] = useState('')
    const [nameById, setNameById] = useState('')
    const [phoneById, setPhoneById] = useState('')
    const [emailById, setEmailById] = useState('')
    const [heightById, setHeightById] = useState('')
    const [weightById, setWeightById] = useState('')
    const [dateOfBirthById, setDateOfBirthById] = useState('')
    const [bloodById, setBloodById] = useState('')
    const [uid, setUid] = useState('')
    const [view, setView] = useState(false);
    const [viewUser, setViewUser] = useState('')
    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')
    const [error3, setError3] = useState('')
    const [error4, setError4] = useState('')
    const [error5, setError5] = useState('')
    const [error6, setError6] = useState('')
    const [error7, setError7] = useState('')
    const [error8, setError8] = useState('')
    const [error9, setError9] = useState('')
    const indianMobileNumberPattern = /^(?!([0-9])\1{9}$)[6-9]\d{9}$/;
    const upperCase = /[A-Z]/
    const lowerCase = /[a-z]/
    const oneDigit = /\d/ 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const backendUrl = process.env.REACT_APP_BACKEND_URL


    // const admin = JSON.parse(localStorage.getItem("admins",));
  

    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   axios.defaults.headers.common["Authorization"] = token;
    //   console.log(token);
    // }, []);
 
  const handleNoView= () => setView(false);



  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   } else {
  //     window.location.href='/sing-in'
  //   }
  // }, []);


 
  


  const token = localStorage.getItem("tokens");
  // console.log(token,"the toke in ")

  // localStorage.setItem("token", token); // Make sure you use "token" consistently

   
   
    // const date = new Date(dateOfBirthById);
    // const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    // const formattedDate = date.toLocaleDateString('en-IN', options); // Adjust the locale as needed
    
  
    const togglePasswordVisibility = () => {
      setShowPassword(true);
      setTimeout(() => {
        setShowPassword(false);
      }, 3000); 
    };

   
    const handleClose = ()=> setShow(false)
   
    const handleOff = ()=> setOn(false)

    const handleShow = async()=> {
        setShow(true)
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

    // const handleImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    //   };
    
    //   const handleData = (e) => {
    //     const { name, value } = e.target;
    //     setData({ ...data, [name]: value });
    //   };
console.log(image,"the image")
    const handleCreate = async (e) => {
        const validErr = [];
    
        if (!name) {
          setError1("This filed is required !");
          validErr.push(error1);
        } else {
          setError1(null);
        }
    
        if (!phone) {
          setError2("This field is required !");
          validErr.push(error2);
        } else if (phone.length < 10 || !indianMobileNumberPattern){
          setError2('Required a valid phone number')
          validErr.push(error2)
        }else{
          setError2(null)
        }
        if ( password.length < 5 || !upperCase.test(password) || !oneDigit.test(password) || !lowerCase.test(password)  ) {
         setError3('The password should contain 5 letters, one uppercase, one lowercase and one digit. For example: Hello3')
         validErr.push(error3)
        } else {
          setError3(null);
        }
        if (password !== confirmPassword){
          setError4('The password and confirm password is not matching')
          validErr.push(error4)
        }else{
          setError4(null)
        }
        if(!height){
          setError5('This filed is required !')
          validErr.push(error5)
        }else{
          setError5(null)
        }
        if(!weight){
          setError6('This filed is required !')
          validErr.push(error6)
        }else{
          setError6(null)
        }
        if(!dateOfBirth){
          setError7('This filed is required !')
          validErr.push(error7)
        }else{
          setError7(null)
        }
        if(blood.length < 1){
          setError8('This filed is required !')
          validErr.push(error8)
        }else{
          setError8(null)
        }
        if( !email || !emailPattern.test(email)){
          setError9('Enter a valid email id')
          validErr.push(error9)
        }else{
          setError9(null)
        }
      
        if (validErr.length === 0) {
          const formdata = new FormData();
          formdata.append("image", image);
          formdata.append("name", name);
          formdata.append("phone", phone);
          formdata.append("password", password);
          formdata.append("height", height);
          formdata.append("weight", weight);
          formdata.append("dateOfBirth", dateOfBirth);
          formdata.append("blood", blood);
          formdata.append("email", email);
        
    
          try {
            console.log(formdata, 'the formdata of the ')
            await axios.post(`${backendUrl}/admin/postuser`, formdata);
            location.reload();
          } catch (err) {
            console.log(err);
          }
        } else {
          return(
            <SoftAlert severity='error'>helloo</SoftAlert>
          )
           
        }
      };

      useEffect(() => {
        const fetch = async()=>{
            try{
                const token = localStorage.getItem("tokens");
                axios.defaults.headers.common['Authorization'] = token
                
                console.log(token,'the toke on getuser')
                const response = await axios.get(`${backendUrl}/admin/getusers`)
                const data = response.data
                // console.log(response.data,"heeee")
                setGetUsers(data)
                // console.log(data,"dishes dateaaaa")
            }catch(err){
                console.log(err)
            }
        }
        fetch()
      }, [])


      const handleOn = async(id)=> {
        setOn(true)
        setUid(id)
       
            try {
              const response = await axios.get(`${backendUrl}/admin/getuserbyid/${id}`);
      
              const data = response.data;

                setNameById(data.name)
                setPhoneById(data.phone)
                setHeightById(data.height)
                setWeightById(data.weight)
                setDateOfBirthById(data.dateOfBirth)
                setBloodById(data.blood)
                setEmailById(data.email)

            } catch (err) {
              console.log(err);
            }
        
    }


      const editUser = async () => {
     
    
        const formdata = new FormData();
        formdata.append("image", files);
        formdata.append("name", nameById);
        formdata.append("phone", phoneById );
        formdata.append("height", heightById);
        formdata.append("weight", weightById);
        formdata.append("dateOfBirth", dateOfBirthById );
        formdata.append("blood", bloodById);
        formdata.append("email", emailById);
 
        try {
          await axios.put(`${backendUrl}/admin/edituser/${uid}`, formdata)
          .then((response) => {
            console.log(response.data);
         window.location.reload()
          });
        } catch (err) {
          console.log(err);
        }
      };

      const handleDelete = async(id)=>{
        const windowConfirmation = window.confirm('Are you sure to delete')
        if(windowConfirmation){
            try{
                await axios.delete(`${backendUrl}/admin/deleteuser/${id}`)
                window.location.reload()
            }catch(err){
                console.log(err)
            }
        }
        
    }

    const handleView = async(id) => {
        setView(true);
        try {
            const response = await axios.get(`${backendUrl}/admin/getuserbyid/${id}`);
    
            const data = response.data;
            setViewUser(data)
            console.log(viewUser._id , 'the user view')
          } catch (err) {
            console.log(err);
          }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        console.log(token);
      }, []);
      if(token){
        return (
          <DashboardLayout>
            <DashboardNavbar />
              <div className={`${classes.user_banner} p-3 text-light mb-4`}> 
                 Users
                 <Tooltip title='Add user'>
                 <button type="button" className="btn btn-outline-dark" onClick={handleShow} >Add</button>
                 </Tooltip>
              </div>
              <SoftBox className=' text-dark'>
                <div className="container-fluid">
                  <div className="row">
                      <div className="col-3" >Photo</div>
                      <div className={`${classes.user_title} col-3`} >Name</div>
                      <div className={`${classes.user_title} col-3`} >Edit</div>
                      <div className={`${classes.user_title} col-3`} >Delete</div>
                  </div>
                </div>
              </SoftBox>
              {getUsers.map((items, Index)=>(
                   <SoftBox key={Index}  className={`${classes.user_list} p-2 m-1 text-light bg-dark`}>
                   <div className="container-fluid">
                       <div className="row">
                           <div className="col-3 p-0" onClick={()=>handleView(items._id)} style={{cursor:'pointer'}} >
                               <img src={`${backendUrl}/images/${items.image}`} alt="profile" className={classes.profile_img} />
                           </div>
                           <div className={`${classes.user_title} col-3`}>{items.name}</div>
                           <div className={`${classes.user_title} col-3`}><FiEdit onClick={()=> handleOn(items._id)}/></div>
                           <div className={`${classes.user_title} col-3`}><AiOutlineDelete onClick={()=> handleDelete(items._id)}/></div>
                       </div>
                     </div>
                   </SoftBox>
              ))}
             
      
              {/* create user---- */}
      
              <Modal show={show} onHide={handleClose}>
             
             <Modal.Body>
               <Form>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Upload The Profile Image</Form.Label>
                   <Form.Control
                     type="file"
                     autoFocus
                     onChange={(e)=> setImage(e.target.files[0])}
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Name</Form.Label>
                   <Form.Control
                     type="email"
                     placeholder="Enter the full name"
                     onChange={(e)=> setName(e.target.value)}
                   
                   />
                   <p className="fs-6" style={{color:'red'}}>{error1}</p>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   {/* <Form.Label>Phone number</Form.Label> */}
                   <Form.Control
                     type="number"
                     placeholder="Enter phone number"
                     onChange={(e)=> setPhone(e.target.value)}
                     
                   />
                     <p className="fs-6" style={{color:'red'}}>{error2}</p>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   {/* <Form.Label>Phone number</Form.Label> */}
                   <Form.Control
                     type="email"
                     placeholder="Enter email id"
                     onChange={(e)=> setEmail(e.target.value)}
                     
                   />
                     <p className="fs-6" style={{color:'red'}}>{error9}</p>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   {/* <Form.Label>Create password for user</Form.Label> */}
                   <Form.Control
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     value={password}
                     placeholder="Enter password"
                     onChange={(e) => setPassword(e.target.value)}
                     
                   />
                   <button
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <p className="fs-6" style={{color:'red'}}>{error3}</p>
                 </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                     name="confirmPassword"
                     value={confirmPassword}
                     placeholder="Confirm password"
                     onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                      <p className="fs-6" style={{color:'red'}}>{error4}</p>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Height</Form.Label>
                   <Form.Control
                     type="number"
                     placeholder="Enter the height in cm"
                     onChange={(e)=> setHeight(e.target.value)}
                     
                   />
                    <p className="fs-6" style={{color:'red'}}>{error5}</p>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Weight</Form.Label>
                   <Form.Control
                     type="number"
                     placeholder="Enter the weight in kg"
                     onChange={(e)=> setWeight(e.target.value)}
                     
                   />
                    <p className="fs-6" style={{color:'red'}}>{error6}</p>
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Date of birth</Form.Label>
                   <Form.Control
                     type="date"
                     placeholder="Enter the fee amonunt"
                     onChange={(e)=> setDateOfBirth(e.target.value)}
                     
                   />
                    <p className="fs-6" style={{color:'red'}}>{error7}</p>
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Select Blood Group</Form.Label>
                   <select name="" id=""   onChange={(e)=> setBlood(e.target.value)} style={{width:'100%'}}>
                      <option value="">Select...</option>
                      <option value="A RhD positive (A+)">A RhD positive (A+)</option>
                      <option value="A RhD negative (A-)">A RhD negative (A-)</option>
                      <option value="B RhD positive (B+)">B RhD positive (B+)</option>
                      <option value="B RhD negative (B-)">B RhD negative (B-)</option>
                      <option value="O RhD positive (O+)">O RhD positive (O+)</option>
                      <option value="O RhD negative (O-)">O RhD negative (O-)</option>
                      <option value="AB RhD positive (AB+)">AB RhD positive (AB+)</option>
                      <option value="AB RhD negative (AB-)">AB RhD negative (AB-)</option>
                   </select>
                   <p className="fs-6" style={{color:'red'}}>{error8}</p>
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  {getEnrollment.map((items, index)=>(
                      <Form.Label key={index} style={{color:'red'}}>Please ensure to collect enrollment fee <span className="text-dark">{items.amount}/-</span> by cash or UPI app</Form.Label>
                  ))}
                   
                 </Form.Group>
               </Form>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                 Close
               </Button>
               <Button variant="primary" onClick={handleCreate}>
                 Save User
               </Button>
             </Modal.Footer>
           </Modal>
      
           {/* update user-------- */}
      
           <Modal show={on} onHide={handleOff}>
             
             <Modal.Body>
               <Form>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Upload The Profile Image</Form.Label>
                   <Form.Control
                     type="file"
                     autoFocus
                     onChange={(e)=> setFiles(e.target.files[0])}
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Name</Form.Label>
                   <Form.Control
                     type="email"
                     placeholder="Enter the full name"
                     onChange={(e)=> setNameById(e.target.value) }
                     name="name"
                     
                     value={nameById}
                   />
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Phone number</Form.Label>
                   <Form.Control
                     type="number"
                     placeholder="Enter phone number"
                     onChange={(e)=> setPhoneById(e.target.value) }
                     name='phone'
                     value={phoneById}
                     
                   />
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   {/* <Form.Label>Email</Form.Label> */}
                   <Form.Control
                     type="email"
                     placeholder="Enter email"
                     onChange={(e)=> setEmailById(e.target.value) }
                     name='phone'
                     value={emailById}
                     
                   />
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Height</Form.Label>
                   <Form.Control
                     type="number"
                     placeholder="Enter the height in cm"
                     onChange={(e)=> setHeightById(e.target.value) }
                     name="height"
                     value={heightById}
                     
                   />
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Weight</Form.Label>
                   <Form.Control
                     type="number"
                     placeholder="Enter the weight in kg"
                     onChange={(e)=> setWeightById(e.target.value) }
                     name="weight"
                     value={weightById}
                     
                   />
                 </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Date of birth</Form.Label>
                   <Form.Control
                     type="date"
                     placeholder="Enter the fee amonunt"
                     onChange={(e)=> setDateOfBirthById(e.target.value) }
                     name="dateOfBirth"
                     value={dateOfBirthById}
                     
                   />
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                   <Form.Label>Select Blood Group</Form.Label>
                   <select name="blood" id=""  value={bloodById}   onChange={(e)=> setBloodById(e.target.value) }  style={{width:'100%'}}>
                      <option value="">Select...</option>
                      <option value="A RhD positive (A+)">A RhD positive (A+)</option>
                      <option value="A RhD negative (A-)">A RhD negative (A-)</option>
                      <option value="B RhD positive (B+)">B RhD positive (B+)</option>
                      <option value="B RhD negative (B-)">B RhD negative (B-)</option>
                      <option value="O RhD positive (O+)">O RhD positive (O+)</option>
                      <option value="O RhD negative (O-)">O RhD negative (O-)</option>
                      <option value="AB RhD positive (AB+)">AB RhD positive (AB+)</option>
                      <option value="AB RhD negative (AB-)">AB RhD negative (AB-)</option>
                   </select>
                 </Form.Group>
                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                 
                   
                 </Form.Group>
               </Form>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="secondary" onClick={handleOff}>
                 Close
               </Button>
               <Button variant="primary" onClick={editUser}>
                 Update User
               </Button>
             </Modal.Footer>
           </Modal>
      
           {/* view user----- */}
           {viewUser && (
               <Modal
               show={view}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
               centered
             >
               <Modal.Header>
                 <Modal.Title>{viewUser.name}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-12" style={{display:'grid', placeItems:'center'}}>
                          <img style={{width:'200px', height:'200px', objectFit:'cover', borderRadius:'24px'}} src={`${backendUrl}/images/${viewUser.image}`} alt="" />
                      </div>
                      <div className="col-12" style={{display:'flex', alignItems:'center',justifyContent:'center', flexDirection:'column'}}>
                         <p className="m-0">{viewUser.phone}</p> 
                        <p className="m-0">{viewUser.dateOfBirth}</p>  
                         <p className="m-0">{viewUser.height} cm</p> 
                         <p className="m-0">{viewUser.weight} kg</p> 
                         <p className="m-0">{viewUser.blood}</p> 
                         <p className="m-0">{viewUser.email}</p> 
                      </div>
                  </div>
              </div>
               </Modal.Body>
               <Modal.Footer>
                 <Button variant="secondary" onClick={handleNoView}>
                   Close
                 </Button>
                 <Link to={`/selectplan/${viewUser._id}`}> <Button variant="primary">Select Plan</Button></Link>
               </Modal.Footer>
             </Modal>
           )}
          
          </DashboardLayout>
         
        );
      }else{
        window.location.href='/authentication/sign-up'
      }
 
}

export default Tables;
