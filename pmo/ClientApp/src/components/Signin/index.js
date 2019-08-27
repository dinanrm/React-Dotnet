import React, { useState } from 'react'
import { Container } from 'reactstrap'
import { Image, Btn, ImageContainer, Title, SubTitle, Layout } from './style'
import Footer from '../Footer';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import axios from 'axios'

const SignIn = (props) => {
  const [MainTitle] = useState('PROJECT MANAGEMENT OFFICE');
  const [Desc] = useState('The planning phase is really just getting the major people together that will own part of the project work and planning how they will do it and what they will need to get it done. In the business world, these are the Subject Matter Experts. A Project manager does not need to be an expert in everything, but the project manager does need to find those that are and get those Subject Matter Experts on their team. ');
  const redirect = async() => {
    // const {data} = await api.users.loginf5(window.location.origin)
    const url = 'https://pmo-be.banpuindo.co.id/api/users/login/'
    // withCredentials: true,
    axios.get(url).then(function(response) {
      const fetchedUrls = response.request.res;
      console.log('data',fetchedUrls)
    });
    // console.log('data',data)
  }
  const server = window.location.origin
  const urlCallback=`https://pmo-be.banpuindo.co.id/api/users/login?returnUrl=${server}/callback`

  return(
    <Layout className="d-flex align-items-center">
      <div className="col-7 pl-0 justify-content-end">
        <ImageContainer>
          <Image src={process.env.PUBLIC_URL + '/Asset/Login-PMO-4.png'}/>
        </ImageContainer>
      </div>
      <div className="col-5 px-5">
        <Container className="text-white px-5">
          <Title>{MainTitle}</Title>
          <SubTitle>{Desc}</SubTitle>
          {/* <Link to="/login"> */}
            <Btn color="warning" size="lg" rel="noopener" onClick={e => window.location=urlCallback} className="text-purple"><span className="h3">SIGN IN</span></Btn>
            {/* <Btn color="warning" size="lg" onClick={e => redirect()} className="text-purple"><span className="h3">SIGN IN</span></Btn> */}
            {/* <Btn color="warning" size="lg" className="text-purple"><span className="h3">SIGN IN</span></Btn> */}
          {/* </Link> */}
        </Container>
      </div>
      <Footer/>
    </Layout>
  )

}

export default SignIn;