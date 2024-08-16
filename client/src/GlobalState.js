import React , {createContext , useState , useEffect} from 'react'
import  axios  from 'axios'
import Cookies from "js-cookie"

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
 const token = Cookies.get('token');
  const [Categories , setCategories] = useState();
  const [Acheteur , setAcheteur] = useState();
  const [Vendeur , setVendeur] = useState();
  const [Products , setProducts] = useState();
  const [tutoriel , setTutotiel]= useState();
  const [carteRech , setCarteRech] = useState();
  const[bids , setBids] = useState();
  const[permissions , setPermissions] = useState();
  const[roles , setRoles] = useState();
  const[admins , setAdmins] = useState();
  const [commandes , setCommandes] = useState();
  const [users , setUsers] = useState();
  const [termes , setTermes] = useState();
  const [questions , setQuestions]= useState();
  const [annonces , setAnnonces] = useState();
  const [demandeT , setDemandeT] = useState();
  const [echeances , setEcheances] = useState();
  const [winners , setWinners] = useState();
  const [notifications , setNotifications] = useState();
  useEffect(()=>{
    const getAllAcheteur = async() =>{
      try {
          const  res = await axios.get('http://localhost:8081/admin/users/Acheteur', {headers : {Authorization: `Bearer ${token}`}});
          console.log("Acheteur:",res.data);
          setAcheteur(res.data)
      } catch (error) {
          console.log(error);
      }
  }
  const getAllVendeur = async() =>{
    try {
        const  res = await axios.get('http://localhost:8081/admin/users/Vendeur', {headers : {Authorization: `Bearer ${token}`}});
        console.log("Vendeur:",res.data);
        setVendeur(res.data)
    } catch (error) {
        console.log(error);
    }
}

    const getAllCategories = async() =>{
        try {
            const  res = await axios.get('http://localhost:8081/api/categories/getAll', {headers : {Authorization: `Bearer ${token}`}});
            console.log("categories:",res.data);
            setCategories(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    // const getAllProducts = async() =>{
    //     try {
    //         const  res = await axios.get('http://localhost:8081/api/product/getAll');
    //         console.log("Products:",res.data);
    //         setProducts(res.data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const getAllTuto = async ()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/tuto/getAll', {headers : {Authorization: `Bearer ${token}`}});
          console.log('tutorial:' , res.data);
          setTutotiel(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getCarteRechar = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/carte/getAll', {headers : {Authorization: `Bearer ${token}`}});
        console.log('cartes:' , res.data);
        setCarteRech(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    const getAllBids = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/bid/getAll', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all bids:" , res.data)
        setBids(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllPermissions = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/admin/permission/permissions', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all permissions:" , res.data)
        setPermissions(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllRoles = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/admin/allRoles', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all roles:" , res.data)
        setRoles(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllAdmin = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/admin/users/Admin', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all Admins:" , res.data)
        setAdmins(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    // const getAllCommandes = async()=>{
    //   try {
    //     const res = await axios.get('http://localhost:8081/api/commandes')
    //     console.log("all Commandes:" , res.data)
    //     setCommandes(res.data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    const getAllUsers = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/admin/users/Acheteur', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all Users:" , res.data)
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllTermes = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/termes/getAll', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all termes:" , res.data)
        setTermes(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllQuestions = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/questions', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all questions:" , res.data)
        setQuestions(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllAnnonces = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/annonce/getAll', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all annonces:" , res.data)
        setAnnonces(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getAllDemandesTransfert = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/demandeTransfert/all', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all demandes transferts:" , res.data , token)
        setDemandeT(res.data)
      } catch (error) {
        console.log(error , token)
      }
    }
    const getAllEcheances = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/echeance', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all echeances:" , res.data , token)
        setEcheances(res.data)
      } catch (error) {
        console.log(error , token)
      }
    }
    const getAllWinners = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/api/bid/winners', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all winners:" , res.data , token)
        setWinners(res.data)
      } catch (error) {
        console.log(error , token)
      }
    }
    const getAllNotifications = async()=>{
      try {
        const res = await axios.get('http://localhost:8081/admin/notification', {headers : {Authorization: `Bearer ${token}`}})
        console.log("all notifications:" , res.data , token)
        setNotifications(res.data)
      } catch (error) {
        console.log(error , token)
      }
    }
getAllTermes()
getAllVendeur()
getAllAcheteur()
getAllUsers();
// getAllCommandes();
getAllAdmin();     
getAllCategories();
// getAllProducts();
getAllTuto();
getAllBids();
getCarteRechar();
getAllPermissions();
getAllRoles();
getAllQuestions();
getAllAnnonces();
getAllBids();
getAllDemandesTransfert();
getAllEcheances();
getAllWinners();
getAllNotifications();
  } , [token])
  
   const state ={
    Categories : Categories,
    Products : Products,
    tutorials : tutoriel,
    bids : bids,
    cartes: carteRech,
    Permissions : permissions,
    Roles : roles,
    Admins :  admins,
    Commandes : commandes,
    Users : users,
    Termes:termes,
    Questions : questions,
    Annonces : annonces,
    Bids : bids,
    demandesT : demandeT,
    echeances : echeances,
    winners : winners,
    notifications: notifications


  }

  return(
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
  )
}