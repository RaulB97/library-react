import React, { useEffect, useRef, useState } from "react";
import Ratings from "./ui/Ratings";
import { Link } from "react-router-dom";
import Price from "./ui/Price";

const Book1 = ({ book }) => {
    const [img, setImg] = useState();

    // useRef here is used as a flag to determine when to rerender page when using useState.
    const mountedRef= useRef(true);

    useEffect(() => {
        const image = new Image();
        image.src = book.url;
        image.onload = () => {
            setTimeout(() => {
                if(mountedRef.current){
                    setImg(image);
                }
            }, 300);
        };
        return ()=> {
            // when the component unmounts
            mountedRef.current = false;
        }
    }, [book.url])
    
    return (
        <div className="book">
            {
                img ? (
                <>
                    <Link to={`/books/${book.id}`}>
                        <figure className="book__img--wrapper">
                            <img src={book.url} alt="" className="book__img"/>
                        </figure>
                    </Link>
                    <div className="book__title">
                        <Link to={`/books/${book.id}`} className="book__title--link">
                            {book.title}
                        </Link>
                    </div>
                    <div className="book__ratings">
                        <Ratings rating={book.rating} />
                    </div>
                    <div className="book__price">
                        <Price salePrice={book.salePrice} originalPrice={book.originalPrice} />
                    </div> 
                </>
                ): (
                <>
                    <div className="book__img--skeleton"></div>
                    <div className="skeleton book__title--skeleton"></div>
                    <div className="skeleton book__rating--skeleton"></div>
                    <div className="skeleton book__price--skeleton"></div>
                </>
                )
            }
        </div>
    );
};

export default Book1;