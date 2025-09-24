import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Ratings from "../components/ui/Ratings";
import Price from "../components/ui/Price";
import Book1 from "../components/Book1";

const BookInfo = ({ books, addToCart}) => {
    //how i did it..
    // let {id} = useParams();
    // id--;
    // if you do it this way, gotta access it like this: 
    // books[id].url, books[id].rating, etc..
    const {id} = useParams();
    const book = books.find(book => +book.id === +id);
    
    return (
        <div className="books__body">
            <main className="books__main">
                <div className="books__container">
                    <div className="row">
                        <div className="book__selected--top">
                            <Link to="/books" className="book__link">
                            <FontAwesomeIcon icon={"arrow-left"} />
                            </Link>
                            <Link to="/books" className="book__link">
                            <h2 className="book__selected--title--top">Books</h2>
                            </Link>
                        </div>
                        <div className="book__selected">
                            <figure className="book__selected--figure">
                                <img src={`${book.url}`} alt="" className="book__selected--img" />
                            </figure>
                            <div className="book__selected--description">
                                <h2 className="book__selected--title">{book.title}</h2>
                                <Ratings rating={book.rating} />
                                <div className="book__selected--price">
                                    <Price salePrice={book.salePrice} originalPrice={book.originalPrice} />
                                </div>
                                <div className="book__summary">
                                    <div className="book__summary--title">
                                        Summary
                                    </div>
                                    <p className="book__summary--para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quam exercitationem laborum, veniam ab aliquid quasi blanditiis aut voluptates labore unde beatae reiciendis adipisci, itaque tenetur aperiam rem suscipit. Accusantium quae nesciunt repellendus quisquam veniam labore optio dolorem beatae odio!</p>
                                    <p className="book__summary--para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quam exercitationem laborum, veniam ab aliquid quasi blanditiis aut voluptates labore unde beatae reiciendis adipisci, itaque tenetur aperiam rem suscipit. Accusantium quae nesciunt repellendus quisquam veniam labore optio dolorem beatae odio!</p>
                                </div>
                                <button className="btn" onClick={() => {
                                    addToCart(book);
                                    window.alert("Book added to Cart!");
                                    }} 
                                    >Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="books__container">
                    <div className="row">
                        <div className="books__selected--top">
                            <h2 className="book__selected--title--top">Recommended Books</h2>
                        </div>
                    </div>
                    <div className="books">
                        {books
                            .filter(book => book.rating === 5 && +book.id !== +id)
                            .slice(0,4)
                            .map(book => <Book1 book={book} key={book.id} />)
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BookInfo;