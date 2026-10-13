import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const BACKEND = "https://foodordering-backend-csas.onrender.com";

  // CORRECT PHOTOS MAP - Backend lo thappu unna kuda frontend lo correct vastundi
  const correctImages = {
    "Double Ka Meetha": "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&w=500",
    "Chicken Burger": "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=500&auto=format&fit=crop&q=60",
    "Masala Dosa": "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&w=500",
    "Chicken 65": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60",
    "Mango Lassi": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&auto=format&fit=crop&q=60",
    "Mutton Biryani Spl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    "Family Bucket Biryani": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&auto=format&fit=crop&q=60",
    "Chicken Haleem": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60"
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND}/api/foods`)
      .then(r => r.json())
      .then(data => {
        // Backend data lo image thappu unna correct chesi chupistham
        const fixed = data.map(f => ({
          ...f,
          imageUrl: correctImages[f.name] || f.imageUrl
        }));
        setFoods(fixed);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Backend waking up... 30 sec lo refresh chey");
      });
  }, []);

  const addToCart = (f) => {
    const ex = cart.find(c => (c._id||c.id) === (f._id||f.id));
    if(ex) setCart(cart.map(c => (c._id||c.id)===(f._id||f.id) ? {...c, qty:c.qty+1} : c));
    else setCart([...cart, {...f, qty:1}]);
  };
  
  const decQty = (food) => {
    const id = food._id||food.id;
    const it = cart.find(c => (c._id||c.id)===id);
    if(!it) return;
    if(it.qty===1) setCart(cart.filter(c => (c._id||c.id)!==id));
    else setCart(cart.map(c => (c._id||c.id)===id ? {...c, qty:c.qty-1} : c));
  };

  const placeOrder = async () => {
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0)+40;
    try{
      const res = await fetch(`${BACKEND}/api/orders`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({items:cart, totalAmount:total, address:"Banjara Hills, Hyderabad", paymentMethod:"COD", location:"HYD"})
      });
      const d = await res.json();
      if(d.success || d.message){
        alert(`✅ Order Placed! ₹${total} - Database lo save ayyindi!`);
        setCart([]); setShowCart(false);
      }
    }catch(e){
      alert("Order failed - Backend sleep lo undi, 30 sec tarvata try chey");
    }
  };

  const filtered = foods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()) && (category==="All"||f.category===category));
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count = cart.reduce((s,i)=>s+i.qty,0);

  if(loading) return <div style={{textAlign:'center', marginTop:'100px'}}><h2>🍔 FoodExpress Loading...</h2><p>Backend waking up (Render 30 sec)...</p></div>;

  return (
    <div className="App">
      <header className="header">
        <h1>🍔 FoodExpress HYD</h1>
        <input className="search" placeholder="Search biryani, pizza..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div className="badge" onClick={()=>setShowCart(true)}>🛒 {count} | ₹{total}</div>
      </header>
      <div className="filters">
        {["All","Biryani","HYD Special","Pizza","Burger","Starters","South Indian","Drinks"].map(c=>(
          <button key={c} className={category===c?"factive":"fbtn"} onClick={()=>setCategory(c)}>{c}</button>
        ))}
      </div>
      <div className="grid">
        {filtered.map(f=>{
          const inCart = cart.find(c=>(c._id||c.id)===(f._id||f.id));
          return (
          <div key={f._id||f.id} className="card">
            <img src={f.imageUrl} alt={f.name} />
            <div className="info">
              <h3>{f.isVeg?"🟩":"🟥"} {f.name}</h3>
              <p>⭐{f.rating || 4.5} • {f.category}</p>
              <div className="row">
                <b>₹{f.price}</b>
                {inCart ? (
                  <div className="qtyBox">
                    <button className="minus" onClick={()=>decQty(f)}>-</button>
                    <b>{inCart.qty}</b>
                    <button className="plus" onClick={()=>addToCart(f)}>+</button>
                  </div>
                ) : (<button className="addBtn" onClick={()=>addToCart(f)}>ADD +</button>)}
              </div>
            </div>
          </div>
        )})}
      </div>
      {showCart && (
        <div className="cartOverlay"><div className="cartBox">
          <h2>Cart ({count}) <span onClick={()=>setShowCart(false)} style={{float:'right',cursor:'pointer'}}>❌</span></h2>
          {cart.length===0 && <p>Cart empty</p>}
          {cart.map(c=><div key={c._id||c.id} className="cartItem"><span>{c.name} x {c.qty}</span><span>₹{c.price*c.qty}</span></div>)}
          <h3>Delivery ₹40</h3>
          <h2>Total ₹{total+40}</h2>
          <button className="order" onClick={placeOrder}>Place Order (DB Save)</button>
        </div></div>
      )}
    </div>
  );
}
export default App;