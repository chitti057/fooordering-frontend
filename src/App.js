import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("Banjara Hills");
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [payment, setPayment] = useState("COD");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setFoods([
      {id:1,name:"Hyderabadi Chicken Dum Biryani",price:399,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",isVeg:false,rating:4.9,desc:"Paradise style"},
      {id:2,name:"Mutton Biryani Spl",price:499,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",isVeg:false,rating:4.8,desc:"Juicy mutton"},
      {id:3,name:"Veg Dum Biryani",price:299,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=500",isVeg:true,rating:4.5,desc:"Paneer & veg"},
      {id:4,name:"Egg Biryani",price:249,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",isVeg:false,rating:4.4,desc:"2 boiled eggs"},
      {id:5,name:"Fry Piece Biryani",price:420,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500",isVeg:false,rating:4.9,desc:"Fry piece"},
      {id:6,name:"Mandi Rice",price:450,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1603133879397-64d3aad15b1d?w=500",isVeg:false,rating:4.7,desc:"Arabian mandi"},
      {id:7,name:"Keema Biryani",price:379,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",isVeg:false,rating:4.6,desc:"Minced mutton"},
      {id:8,name:"Family Bucket Biryani",price:799,category:"Biryani",imageUrl:"https://images.unsplash.com/photo-1631515242808-497c3f32fd38?w=500",isVeg:false,rating:4.8,desc:"Serves 4"},
      {id:9,name:"Chicken Haleem",price:320,category:"HYD Special",imageUrl:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",isVeg:false,rating:4.9,desc:"Pista House"},
      {id:10,name:"Irani Chai + Osmania",price:80,category:"HYD Special",imageUrl:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500",isVeg:true,rating:4.9,desc:"Nimrah cafe"},
      {id:11,name:"Double Ka Meetha",price:150,category:"HYD Special",imageUrl:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",isVeg:true,rating:4.8,desc:"Hyderabadi sweet"},
      {id:12,name:"Gongura Chicken",price:300,category:"HYD Special",imageUrl:"https://images.unsplash.com/photo-1527477396000-e27163b4d554?w=500",isVeg:false,rating:4.5,desc:"Andhra style"},
      {id:13,name:"Khichdi Kheema",price:280,category:"HYD Special",imageUrl:"https://images.unsplash.com/photo-1595755433128-d2b698ad2f24?w=500",isVeg:false,rating:4.6,desc:"Morning spl"},
      {id:14,name:"Pathar Ka Gosht",price:450,category:"HYD Special",imageUrl:"https://images.unsplash.com/photo-1546964053-d018bc1c5f38?w=500",isVeg:false,rating:4.8,desc:"Stone cooked"},
      {id:15,name:"Margherita Pizza",price:299,category:"Pizza",imageUrl:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",isVeg:true,rating:4.5,desc:"Cheesy"},
      {id:16,name:"Chicken Pepperoni",price:399,category:"Pizza",imageUrl:"https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",isVeg:false,rating:4.7,desc:"Spicy chicken"},
      {id:17,name:"Paneer Tikka Pizza",price:349,category:"Pizza",imageUrl:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",isVeg:true,rating:4.6,desc:"Paneer loaded"},
      {id:18,name:"Veg Supreme",price:379,category:"Pizza",imageUrl:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",isVeg:true,rating:4.4,desc:"All veggies"},
      {id:19,name:"Chicken Dominator",price:459,category:"Pizza",imageUrl:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500",isVeg:false,rating:4.8,desc:"5 toppings"},
      {id:20,name:"Veg Burger",price:149,category:"Burger",imageUrl:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",isVeg:true,rating:4.2,desc:"Crispy"},
      {id:21,name:"Chicken Burger",price:199,category:"Burger",imageUrl:"https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=500",isVeg:false,rating:4.5,desc:"Grilled"},
      {id:22,name:"Double Cheese Burger",price:229,category:"Burger",imageUrl:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500",isVeg:true,rating:4.6,desc:"Extra cheese"},
      {id:23,name:"Maharaja Burger",price:299,category:"Burger",imageUrl:"https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500",isVeg:false,rating:4.7,desc:"Big size"},
      {id:24,name:"Chicken 65",price:280,category:"Starters",imageUrl:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",isVeg:false,rating:4.7,desc:"Spicy HYD"},
      {id:25,name:"Paneer Tikka",price:249,category:"Starters",imageUrl:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",isVeg:true,rating:4.6,desc:"Grilled paneer"},
      {id:26,name:"Chicken Wings",price:299,category:"Starters",imageUrl:"https://images.unsplash.com/photo-1527477396000-e27163b4d554?w=500",isVeg:false,rating:4.3,desc:"Fried wings"},
      {id:27,name:"Masala Dosa",price:120,category:"South Indian",imageUrl:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500",isVeg:true,rating:4.4,desc:"Chutney"},
      {id:28,name:"Idli Sambar",price:90,category:"South Indian",imageUrl:"https://images.unsplash.com/photo-1610192244261-3f33de3d72e1?w=500",isVeg:true,rating:4.3,desc:"Soft idli"},
      {id:29,name:"Pesarattu Upma",price:110,category:"South Indian",imageUrl:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",isVeg:true,rating:4.5,desc:"Moong dosa"},
      {id:30,name:"Butter Chicken + Naan",price:350,category:"North Indian",imageUrl:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",isVeg:false,rating:4.6,desc:"Creamy"},
      {id:31,name:"Dal Makhani + Rice",price:220,category:"North Indian",imageUrl:"https://images.unsplash.com/photo-1546069901-eacef0df6022?w=500",isVeg:true,rating:4.4,desc:"Punjabi"},
      {id:32,name:"Hakka Noodles",price:199,category:"Chinese",imageUrl:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",isVeg:true,rating:4.3,desc:"Spicy"},
      {id:33,name:"Manchurian",price:260,category:"Chinese",imageUrl:"https://images.unsplash.com/photo-1603133879350-43206c0d7bea?w=500",isVeg:false,rating:4.5,desc:"Indo chinese"},
      {id:34,name:"Mango Lassi",price:80,category:"Drinks",imageUrl:"https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",isVeg:true,rating:4.6,desc:"Fresh mango"},
      {id:35,name:"Cold Coffee",price:120,category:"Drinks",imageUrl:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",isVeg:true,rating:4.5,desc:"Ice cream"}
    ]);
  }, []);

  const addToCart = (f) => {
    const ex = cart.find(c=>c.id===f.id);
    if(ex) setCart(cart.map(c=>c.id===f.id?{...c,qty:c.qty+1}:c));
    else setCart([...cart,{...f,qty:1}]);
  };
  const decQty = (id) => {
    const it = cart.find(c=>c.id===id);
    if(it.qty===1) setCart(cart.filter(c=>c.id!==id));
    else setCart(cart.map(c=>c.id===id?{...c,qty:c.qty-1}:c));
  };

  const filtered = foods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()) && (category==="All"||f.category===category));
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const delivery = (location==="Banjara Hills"||location==="Jubilee Hills")?60:(location==="Gachibowli"||location==="Madhapur")?50:40;

  const order = () => {
    if(!address){alert("Address enter chey!");return}
    alert(`ORDER CONFIRMED! ${location}, HYD - ₹${total+delivery} - ${payment}`);
    setCart([]);setShowCart(false);setShowPayment(false);setAddress("");
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🍔 FoodExpress HYD</h1>
        <div className="loc">📍 HYD <select value={location} onChange={e=>setLocation(e.target.value)}>
          <option>Banjara Hills</option><option>Jubilee Hills</option><option>Madhapur</option><option>Gachibowli</option><option>Hitech City</option><option>Kondapur</option><option>Kukatpally</option><option>Ameerpet</option><option>Secunderabad</option><option>Dilsukhnagar</option><option>LB Nagar</option><option>Miyapur</option><option>Uppal</option><option>Begumpet</option>
        </select></div>
        <input className="search" placeholder="Search biryani..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div className="badge" onClick={()=>setShowCart(true)}>🛒 {count} | ₹{total}</div>
      </header>
      <div className="filters">
        {["All","Biryani","HYD Special","Pizza","Burger","Starters","South Indian","North Indian","Chinese","Drinks"].map(c=>(
          <button key={c} className={category===c?"factive":"fbtn"} onClick={()=>setCategory(c)}>{c}</button>
        ))}
      </div>
      <div className="grid">
        {filtered.map(f=>(
          <div key={f.id} className="card">
            <img src={f.imageUrl} alt={f.name}/>
            <div className="info">
              <h3>{f.isVeg?"🟩":"🟥"} {f.name} <span className="rating">⭐{f.rating}</span></h3>
              <p>{f.desc}</p><span className="cat">{f.category}</span>
              <div className="row"><b>₹{f.price}</b><button onClick={()=>addToCart(f)}>ADD +</button></div>
            </div>
          </div>
        ))}
      </div>
      {showCart && (
        <div className="cartOverlay"><div className="cartBox">
          <h2>Cart ({count}) <span onClick={()=>setShowCart(false)} style={{float:'right',cursor:'pointer'}}>❌</span></h2>
          {cart.map(c=><div key={c.id} className="cartItem"><span>{c.name}</span><div><button onClick={()=>decQty(c.id)}>-</button> {c.qty} <button onClick={()=>addToCart(c)}>+</button> ₹{c.price*c.qty}</div></div>)}
          <input className="addr" placeholder="Address HYD" value={address} onChange={e=>setAddress(e.target.value)}/>
          <p>{location} - Delivery ₹{delivery}</p><h3>Total ₹{total+delivery}</h3>
          {cart.length>0 && <button className="order" onClick={()=>setShowPayment(true)}>Pay →</button>}
        </div></div>
      )}
      {showPayment && (
        <div className="cartOverlay"><div className="cartBox">
          <h2>Payment</h2>
          <div className="payOpt">
            <label><input type="radio" checked={payment==="COD"} onChange={()=>setPayment("COD")}/> COD</label>
            <label><input type="radio" checked={payment==="UPI"} onChange={()=>setPayment("UPI")}/> UPI</label>
            <label><input type="radio" checked={payment==="Card"} onChange={()=>setPayment("Card")}/> Card</label>
            <label><input type="radio" checked={payment==="Wallet"} onChange={()=>setPayment("Wallet")}/> Wallet</label>
          </div>
          <h3>Pay ₹{total+delivery} via {payment}</h3>
          <button className="order" onClick={order}>Confirm ₹{total+delivery}</button>
          <button className="fbtn" style={{width:'100%',marginTop:'8px'}} onClick={()=>setShowPayment(false)}>Back</button>
        </div></div>
      )}
    </div>
  );
}
export default App;