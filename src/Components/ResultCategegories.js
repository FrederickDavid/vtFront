import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import {Link, useNavigate, useParams} from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"

const ResultsCategories = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const myID = useSelector((state) => state.Id.Id._id)
  const admin = useSelector((state)=> state.Id.Id.isAdmin)
  const [polls, setPolls] = useState()

  const getPolls =async()=>{
    try{
        const res = await axios.get(`https://onevoteback.herokuapp.com/Category/${id}`)
        setPolls(res.data.data)
    }catch(error){
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data.message)
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
    }
  }
  useEffect(()=>{
    getPolls()
  },[])
  return (
    <Container>
      <Wrapper>
      <Vote onClick={()=>{navigate(-1)}}>Back to Home</Vote>
        {
          polls? <Text><span>These are the Polls Available</span></Text>: <Text><span>There are no Polls Available</span></Text>
        }
          <Holder>
          {
            polls?.map((props)=>(
              <Card key={props._id}>
            <Name> {props.position}</Name>
            {/* <Title>{props.description}</Title> */}
            <Votes to={`/Result/${props._id}`}>View Results</Votes>
              {/* {
                myID?  <Votes to={`/categories/${props._id}`}>Start Voting</Votes>:  <Votes to={`/register`}>Sign up to vote</Votes>
              }
            { 
              admin? <Votes to={`/CreateCandidate/${props._id}`}>Add Categories</Votes>: null
            } */}
            </Card>
            ))
          }
          </Holder>
      </Wrapper>
    </Container>
  )
}

export default ResultsCategories

const Container = styled.div`
  width: 100%;
  min-height: calc (100vh - 70px)
`
const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const Text = styled.div`
  padding: 30px 0;
  font-size: 40px;
  font-family: poppins;
  text-align: center;
  font-weight: 600;

  span{
    color: #000;
  };

  @media Screen and (max-width: 425px){
    font-size: 30px;
  }
`
const Holder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`
const Card = styled.div`
  width: 250px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px solid white;
  background-color: #21132D;
  border-radius: 7px;
  padding: 5px 0;
  transform: scale(1);
  transition: all 350ms;
  margin: 5px;

  :hover{
    cursor: pointer;
    transform: scale(1.005);
    transition: all 350ms;
    box-shadow:  5px 5px 10px rgba(225, 225, 255,0.4);
  }
`

const Name = styled.div`
  width: 90%;
  min-height: 40px;
  display:flex;
  text-align: center;
  justify-content:center;
  align-items: center;
  color: lightgrey;
  font-size: 20px;
  font-weight: bold;
  border-radius: 2px;
  margin-top: 5px;
  background-color: rgba(153, 82, 208, 0.9);
  transform: scale(1);
  transition: all 350ms;

  :hover{
    cursor: pointer;
    transform: scale(1.003);
    transition: all 350ms;
    box-shadow:  5px 5px 20px rgba(0,0,0,0.4);
  }
`
const Title = styled.div`
  width: 90%;
  height: 200px;
  display:flex;
  justify-content:center;
  align-items: center;
  border-radius: 5px;
  color: white;
  text-align: center;
  font-size: 16px;
  margin-top: 5px;
  background-color: rgba(153, 82, 208, 0.3);
  /* transform: scale(1);
  transition: all 350ms; */
  overflow-y: scroll;

  /* :hover{
    cursor: pointer;
    transform: scale(1.003);
    transition: all 350ms;
    box-shadow:  5px 5px 20px rgba(0,0,0,0.4);
  } */

`
const Votes = styled(Link)`
  text-decoration: none;
  width: 90%;
  min-height: 40px;
  display:flex;
  justify-content:center;
  align-items: center;
  border-radius: 5px;
  color: lightgrey;
  font-size: 16px;
  margin-top: 5px;
  background-color: rgba(153, 82, 208, 0.7);
  transform: scale(1);
  transition: all 350ms;

  :hover{
    cursor: pointer;
    transform: scale(1.003);
    transition: all 350ms;
    border: 0.5px solid white;
    /* box-shadow:  5px 5px 20px rgba(0,0,0,0.4); */
  }
`
const Vote = styled.div`
text-decoration: none;
  width: 150px;
  min-height: 40px;
  display:flex;
  border-radius: 3px;
  justify-content:center;
  border-radius: 5px;
  align-items: center;
  color: white;
  font-size:16px;
  margin-top: 80px;
  font-weight: bold;
  background-color: rgba(25, 25, 25, 0.7);
  transform: scale(1);
  transition: all 350ms;

  :hover{
    cursor: pointer;
    transform: scale(1.003);
    transition: all 350ms;
    box-shadow:  5px 5px 20px rgba(0,0,0,0.4);
  }
`