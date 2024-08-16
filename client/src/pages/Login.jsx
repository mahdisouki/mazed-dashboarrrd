import React , {useState , useEffect} from 'react';
import '../css/Login.css';
import axios from 'axios';
import Cookies from 'js-cookie'

const Login = () => {

  const [data, setData] = useState({login : "" , password: "" , deviceToken:""});

  useEffect(() => {
    const deviceToken = Cookies.get('fcmToken');
    setData((prevData) => ({ ...prevData, deviceToken }));
  }, []);
  const submitLogin = async(e) =>{
    e.preventDefault();
    try {
      
      console.log(data)
      const res = await  axios.post('http://localhost:8090/api/auth/login' , data);
      console.log(res.data.refreshtoken)
      Cookies.set('token' , res.data.refreshtoken )
      window.location.href = "/"
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 login-container">
          <div className="card-log">
            <div className="card-body">
              <h3 className="card-title">Bienvenue</h3>
              <form onSubmit={submitLogin}>
                <div className="form-group">
                  <label htmlFor="identifiant">Identifiant:</label>
                  <input type="text" className="form-control" id="identifiant" placeholder="Enter identifiant" onChange={e=>setData({...data , login:e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe:</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={e=>setData({...data , password:e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 image-container">
          <img src="./Mazed.jpg" alt="login" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Login;
