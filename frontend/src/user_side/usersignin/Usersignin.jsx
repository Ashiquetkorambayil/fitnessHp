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

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";
function Usersignin() {
    
    const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        phone: phone,
        password: password,
      }
      console.log(data, 'the sign-in')
      await axios.post(`${backendUrl}/admin/postusersignin`, data)
      .then((response) => {
        console.log("Response:", response); // Log the response object
        console.log(response.data.token);
        if (response && response.status === 200) {
          const token = response.data.token;
          const user = response.data.user;
          localStorage.setItem("userToken", token)
          localStorage.setItem("users", JSON.stringify(user))
          window.location.href='/home';
        }
      })
    } catch (err) {
      console.log(err);
      
      if (err.response && err.response.status === 400) {
        setMessage('Invalid email or password...');
      }
    }
  }
  
  return (
    <BasicLayout
    title="Welcome back!"
   
    image={curved6}
  >
    <Card>
   
      <SoftBox mb={2}>
      </SoftBox>
      <SoftBox pt={2} pb={3} px={3}>
        <SoftBox component="form" role="form">
          <SoftBox mb={2}>
            <SoftInput type="number" placeholder="Phone" onChange={(e)=> setPhone(e.target.value)} />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
          </SoftBox>
          <p>{message}</p>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="dark" fullWidth onClick={handleSubmit}>
              sign in
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
             {`Don't have an account`}?&nbsp;
              <SoftTypography
                component={Link}
                to="/usercreation"
                variant="button"
                color="dark"
                fontWeight="bold"
                textGradient
              >
                Sign up
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  </BasicLayout>
  )
}

export default Usersignin