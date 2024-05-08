/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const backendUrl = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [show, setShow] = useState(false);
  // const [image, setImage] = useState('');
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [role, setRole] = useState('');
     const [getAdmin, setGetAdmin] = useState([])

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const handleSubmit = async()=>{


 
  //   const data = {
  //     name:name,
  //     email:email,
  //     phone:phone,
  //     role:role,
  //     image:image,
  //     password:password
  //   };
  //   try{
  //     await axios.post('http://localhost:8000/admin/postadmin',data)
     
  //     window.location.reload()
  //   }catch(err){
  //     console.log(err);
  //   }
  
  // }
  console.log(getAdmin, 'get admin')
  const token = localStorage.getItem("tokens");
              

  useEffect(() => {
    const fetch = async()=>{
        try{
          const token = localStorage.getItem("tokens");
                axios.defaults.headers.common['Authorization'] = token
          const response = await axios.get(`${backendUrl}/admin/getadmin`)
          const data = response.data
          setGetAdmin(data)
          console.log(data, 'data of admin')
        }catch(err){
          console.log(err)
        }
      }
      fetch()
  }, [])
  

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
        {getAdmin.map((items, index)=>(
      <Card
      key={index} 
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
      
          <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
               {items.name}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {items.role}
              </SoftTypography> <br/>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                {items.phone}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
               {/* <Button onClick={handleShow}>Create</Button> */}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
       
        
      </Card>
       ))}
      {/* <Modal show={show}  onHide={handleClose} centered >
        <Modal.Header>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Select Profile image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e)=> setImage(e.target.files[0])}
                autoFocus
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Full name"
                onChange={(e)=> setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Phone number"
                onChange={(e)=> setPhone(e.target.value)}
                autoFocus
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Enter your email id"
                onChange={(e)=> setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Enter your password"
                onChange={(e)=> setPassword(e.target.value)}
                autoFocus
              />
            </Form.Group>
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Enter role"
                onChange={(e)=> setRole(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> */}
    </SoftBox>
  );
}

export default Header;
