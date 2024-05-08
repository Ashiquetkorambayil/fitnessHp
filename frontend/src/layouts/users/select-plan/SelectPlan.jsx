import React, { useEffect, useState } from 'react'
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



// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import classes from './selectplan.module.css'
import axios from 'axios';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Button } from 'react-bootstrap';

function SelectPlan() {
    const [getplans, setGetPlans] = useState([])
    const backendUrl = process.env.REACT_APP_BACKEND_URL

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

      const choosePlan = async()=>{
        try{
            await axios.post
        }catch(err){
            console.log(err)
        }
      }


  return (
    
    <DashboardLayout>
        <DashboardNavbar/>
        <div className="container">
        <div className="row">
           
            {getplans.map((items, index)=>(
        <div key={index} className={`${classes.card} col-3 m-3 p-3` }>
        <div className={classes.card__content}>
          <div className="container">
              <div className="row">
                  <div className="col-12 p-2">
                      <h4 style={{textAlign:'center'}}>{items.name}</h4>
                      <p style={{textAlign:'center'}}>{items.duration} month</p>
                      <p style={{textAlign:'center'}}>₹{items.amount}</p>
                      <p className='text-secondary fs-6'>{items.description}</p>
                      <div style={{display:'grid', placeItems:'center'}}> <Button className='m-2' onClick={()=> choosePlan(items._id)}>Select</Button></div>
                     
                  </div>
              </div>
          </div>
        </div>
        <div className={classes.blob} />
        <div className={classes.blob} />
        <div className={classes.blob} />
        <div className={classes.blob} />
        <div className={classes.card__text} />
      </div>
     ))}
        
        
        </div>
        </div>
        
    
     



     
    </DashboardLayout>
  )
}

export default SelectPlan