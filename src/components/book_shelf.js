import React, { Component } from 'react'
// import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Book from './book';

class BookShelf extends Component {
    state = {

    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.list.map((book) => (
                            <li key={book.id}>
                                <Book book={book}
                                    moveBookFromTo={this.props.moveBookFromTo}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div >
        );
    }

}
export default BookShelf;