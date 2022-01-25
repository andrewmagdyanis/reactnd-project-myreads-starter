import React from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import Book from './book';

class SearchBooks extends React.Component {
    state = {
        searchKey: "",
        books: []
    }


    uniq = (a) => {
        var seen = {};
        return a.filter((item) => {
            return seen.hasOwnProperty(item.id) ? false : (seen[item.id] = true);
        });
    }

    intersect = (a) => {
        var seen = {};
        var l = [];
        a.forEach((item) => {
            if (seen.hasOwnProperty(item.id)) {
                if (typeof item.shelf !== "undefined") {
                    l.push(item)
                    seen[item.id] = item
                } else {
                    l.push(seen[item.id])
                }
            } else {
                seen[item.id] = item
            }
        })
        return l;
    }


    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => {
                        BooksAPI.getAll().then(books => {
                            this.props.updateBooks(books);
                        });
                        this.props.history.push("/")
                    }}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={this.state.searchKey}
                            placeholder="Search by title or author"
                            onChange={(e) => {
                                var key = e.target.value;
                                this.setState((prevState) => ({
                                    searchKey: key,
                                }));
                                var mybooks = this.state.books;
                                if (key == "") {
                                    this.setState((prevState) => ({
                                        books: [],
                                    }));
                                } else {
                                    BooksAPI.search(key).then(books => {
                                        console.log(typeof books)
                                        if (typeof books === "undefined") {
                                            mybooks = this.state.books;
                                        }
                                        else if (typeof books === "object") {
                                            var error
                                            try {
                                                error = books.error
                                            } catch (e) {
                                                console.log("no book found")
                                            }

                                            if (error) {
                                                mybooks = [];
                                            } else {
                                                var intersection = this.intersect(this.props.books.concat(books))
                                                mybooks = intersection.concat(books);
                                                mybooks = this.uniq(mybooks);
                                            }
                                            this.setState((prevState) => ({
                                                books: mybooks
                                            }));
                                        }
                                        else {
                                            mybooks = books;
                                            this.setState((prevState) => ({
                                                books: mybooks
                                            }));
                                        }

                                    });
                                }
                            }}


                        />


                    </div>

                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book book={book}
                                    moveBookFromTo={() => { }}
                                />
                            </li>
                        ))}

                    </ol>
                </div>
            </div >
        );
    }
}

export default SearchBooks
