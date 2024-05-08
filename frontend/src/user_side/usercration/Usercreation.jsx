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
import { Email } from "@mui/icons-material";
import axios from "axios";

function Usercreation() {
  const navigate = useNavigate()
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [blood, setBlood] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [error7, setError7] = useState("");
  const [error8, setError8] = useState("");
  const [error9, setError9] = useState("");
  const [invalid, setInvalid] = useState('')
 
  const indianMobileNumberPattern = /^(?!([0-9])\1{9}$)[6-9]\d{9}$/;
    const upperCase = /[A-Z]/
    const lowerCase = /[a-z]/
    const oneDigit = /\d/ 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const backendUrl = process.env.REACT_APP_BACKEND_URL


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
        navigate('/usersignin')
      } catch (err) {
        console.log(err);
        if(err.response && err.response.status === 401){
          setInvalid("Phone number is already exist");
          }else {

          }
         
      }
    } else {
      
       
    }
  };
  return (
    <BasicLayout title="Welcome!" image={curved6}>
      <Card>
        <SoftBox mb={2}></SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput type="file"  onChange={(e)=> setImage(e.target.files[0])} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput placeholder="Name"   onChange={(e)=> setName(e.target.value)} />
              <p className="text-danger fs-6">{error1}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
              <p className="text-danger fs-6">{error9}</p>
              {/* <p className="text-danger fs-6">{invalidEmail}</p> */}
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="number" placeholder="Phone" onChange={(e)=> setPhone(e.target.value)} />
              <p className="text-danger fs-6">{error2}</p>
              <p className="text-danger fs-6">{invalid}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <p className="text-danger fs-6">{error3}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
              <p className="text-danger fs-6">{error4}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="number" placeholder="Height" onChange={(e)=> setHeight(e.target.value)}/>
              <p className="text-danger fs-6">{error5}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="number" placeholder="Weight" onChange={(e)=> setWeight(e.target.value)} />
              <p className="text-danger fs-6">{error6}</p>
            </SoftBox>
            <label htmlFor="DOB">Date of birth</label>
            <SoftBox mb={2}>
              <SoftInput type="Date" placeholder="Date of Birth" onChange={(e)=> setDateOfBirth(e.target.value)}/>
              <p className="text-danger fs-6">{error7}</p>
            </SoftBox>
            <SoftBox mb={2}>
              <select name="blood" id="" style={{ width: "100%" }} onChange={(e)=> setBlood(e.target.value)}>
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
              <p className="text-danger fs-6">{error8}</p>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleCreate}>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/usersignin"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Usercreation;
