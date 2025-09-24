import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Footer from "./components/Footer";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from "./pages/Cart";
// import Books from './pages/Books';
import Books1 from './pages/Books1';
import BookInfo from './pages/BookInfo';
import { books } from "./data";

function App() {
  const [cart, setCart] = useState([]);
  const subtotal = cart.reduce((sum, item) => {
    const price = item.salePrice || item.originalPrice;
    return sum + price * item.quantity;
  }, 0);
  const tax = 1;
  const total = subtotal + tax;
  const totals = { subtotal, tax, total };
  
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    

  function addToCart(book) {
    const dupeItem = cart.find(item => +item.id === +book.id)
    if(dupeItem){ 
      // dupeItem.quantity += 1;
      setCart(cart.map(item => {
        if(item.id === dupeItem.id) {
          return {
            ...item,
            quantity: item.quantity +1,
          }
        }
        else {
          return item;
        }
      }))
    } else {
      setCart([...cart, {...book, quantity: 1 }]);
    }

  }
  
  useEffect(() => {
    // console.log("items in cart: ", totalQuantity);
  }, [totalQuantity])

  function removeItem(book){
    if(cart){setCart(cart.filter(item => +item.id !== book.id));}
  }

  function updateCart(item, quantity){
    if(+quantity === 0){
      return removeItem(item);
    }
    const book = cart.find(i => +i.id === +item.id);
    if(book){ 
      setCart(cart.map(item1 => {
        if(item1.id === book.id) {
          return {
            ...item1,
            quantity: +quantity,
          }
        }
        else {
          return item1;
        }
      }))
    } else {
      setCart([...cart, {...item, quantity }]);
    }
  }



  return (
    <BrowserRouter>
      <div className="App">
        <Nav cartNum={totalQuantity} />
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books1 books={books} />} />
        <Route path="/books/:id" render={() => <BookInfo books={books} addToCart={addToCart} />} />
        <Route path="/cart" render={() => <Cart cart={cart} updateCart={updateCart} removeItem={removeItem} totals={totals} />} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
