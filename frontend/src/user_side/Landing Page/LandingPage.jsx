import React from 'react'
import Classes from './landingpage.module.css'
import Logo from '../../assets/images/gym logo.png'
import { Button } from 'react-bootstrap'
import { IoLogoInstagram } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { MdWhatsapp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate()
  return (
    <div className={`${Classes.banner} container-fluid p-0`}>
        <nav className={Classes.nav}>
            <div className={Classes.section1}>
                <img className={Classes.logo} src={Logo} alt="" />
            </div>
            <div className={Classes.section2}>
                <Button className='bg-dark border-danger' onClick={()=>navigate('/usersignin')}>Log-in</Button>
               
            </div>
        </nav>
        <div className={`${Classes.banner2} container text-light `} >
            <div className={`${Classes.row} banner2`} >
                <div className={`${Classes.bn1} col-12 col-md-6`} style={{display:'grid', placeItems:'center'}}>
                    <h2>Challenge your <span className='text-danger'>limits</span></h2>
                    <p  className={`${Classes.text} text-secondary`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non nulla ipsum. Aliquam vel viverra metus, eget faucibus orci. Aenean felis elit, accumsan id purus id, fringilla suscipit dolor. Nam eget orci non augue efficitur auctor id sit amet mauris. Aliquam sit amet mauris nec neque placerat porta quis in erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque malesuada tempus magna ac finibus. Cras metus justo, </p>
                    <Button className='text' onClick={()=>navigate('/usercreation')}>Start with a membership</Button>
                </div>
                <div className={`${Classes.bn2} col-6`}></div>
                <div style={{display:'grid', placeItems:'center'}}>
                <div className={`${Classes.small_btnbox1} col-12 border-bottom`} style={{width:'80%'}}>
                    <Button onClick={()=>navigate('/usersignin')}>Log-in</Button>
                </div>
                </div>
                {/* <div className={`${Classes.small_btnbox2} col-12`}>
                    <Button onClick={()=>navigate('/usercreation')}>Create account</Button>
                </div> */}
                <div className={`${Classes.icon_box} col-12 p-3`}>
                <IoLogoInstagram className={Classes.icons} />
                    <RiFacebookCircleLine className={Classes.icons}/>
                    <MdWhatsapp className={Classes.icons}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage