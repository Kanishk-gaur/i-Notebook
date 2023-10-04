import React,{useState} from 'react'
import { useHistory} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setecredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let history=useHistory();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
    
      method: "POST",
    
      headers: {
        "Content-Type": "application/json",
       },
       body: JSON.stringify({name,email,password})
    });
    const json=await response.json();
    console.log(json);
    if(json.success){
          localStorage.setItem('token',json.authtoken);
          history.push("/");
          props.showAlert("Acoount Created","Success")
    }
    else{
      props.showAlert("Invalid","danger")
    }
     
    
  }

  const onChange=(e)=>{
    setecredentials({...credentials,[e.target.name]:e.target.value})
 }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} name='email' id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' onChange={onChange} id="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name='cpassword' onChange={onChange} id="cpassword"  minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
