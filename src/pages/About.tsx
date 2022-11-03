import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AboutPage() {
  const [message, setMessage ] = useState('');
  const {number} = useParams();

  useEffect(()=> {

    if(number){
      setMessage('The number is'+ number);
    }else{
      setMessage('No number was provided');
    }

  })

  return (
      <div>
        <p>This is about page</p>
        <p>{message}</p>
      </div>
    );
}