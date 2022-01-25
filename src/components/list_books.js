import React from 'react'
// import * as BooksAPI from '../BooksAPI'
import '../App.css'
import BookShelf from './book_shelf';

class ListBooks extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    statefrom: 'props',
    none: []

  }


  static getDerivedStateFromProps(props, state) {

    if (state.statefrom === 'props') {
      var currently_reading_books_init = [];
      var want_to_read_books_init = [];
      var read_books_init = [];

      props.books.forEach((book) => {

        switch (book.shelf) {
          case "currentlyReading":
            currently_reading_books_init.push(book);
            break;

          case "read":
            read_books_init.push(book);
            break;

          case "wantToRead":
            want_to_read_books_init.push(book);
            break;
          default:
            read_books_init.push(book);
        }
      });
      return {
        currentlyReading: currently_reading_books_init,
        wantToRead: want_to_read_books_init,
        read: read_books_init,
      };
    } else {
      return state;
    }

  }

  moveBookFromTo = (book, fromShelf, toShelf) => {
    //update the shelf of the book 
    book.shelf = toShelf
    //get the shelf one and two ready
    const shelfOne = [...this.state[fromShelf]]
    const shelfTwo = [...this.state[toShelf]]

    // remove the book from the shelf one
    shelfOne.forEach(function (b, index, object) {
      if (b.id === book.id) {
        object.splice(index, 1);
      }
    });
    // add the book to the shelf two
    shelfTwo.push(book)

    console.log(shelfOne.length, shelfTwo.length)
    var q = { statefrom: 'setted' }
    q[fromShelf] = shelfOne
    q[toShelf] = shelfTwo

    this.setState((prevState) => (q));
    this.props.updateBooks(this.state.currentlyReading.concat(this.state.wantToRead).concat(this.state.read))

  }


  render() {
    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf key="CR" title="Currently Reading"
            list={this.state.currentlyReading}
            moveBookFromTo={this.moveBookFromTo}
          />
          <BookShelf key="WTR" title="Want to Read"
            list={this.state.wantToRead}
            moveBookFromTo={this.moveBookFromTo}
          />
          <BookShelf key="R" title="Read"
            list={this.state.read}
            moveBookFromTo={this.moveBookFromTo}
          />
        </div>
      </div>
      <div className="open-search">
        <button onClick={() => this.props.history.push("/search")} />

      </div>
    </div>
    );
  }

}

export default ListBooks;