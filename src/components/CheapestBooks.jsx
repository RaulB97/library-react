import React from "react";
import Book1 from "./Book1";
import { books } from "../data";

const Features = () => {
  return (
    <section id="recent">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Discounted <span className="purple">Books</span>
          </h2>
          <div className="books">
            {books
              .slice()
              .filter(book => book.salePrice > 0)
              .slice(0, 8)
              .map((book) => (
                <Book1 book={book} key={book.id} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
