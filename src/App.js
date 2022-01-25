import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchBooks from './components/search_books';
import ListBooks from './components/list_books';

class App extends Component {
  state = {
    books: [],
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState((prevState) => ({
      books: books
    }));
    // BooksAPI.getAll().then((data) => {
    //   this.setState((prevState) => ({
    //     books: data
    //   }));
    // });

  }

  updateBooks = (l) => {
    this.setState((prevState) => ({
      books: l
    }));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/"
          render={({ history }) => (<ListBooks books={this.state.books}
            history={history}
            updateBooks={this.updateBooks} />)} />

        <Route exact path="/search"
          render={({ history }) => (<SearchBooks books={this.state.books}
            history={history}
            updateBooks={this.updateBooks} />)} />

      </div >
    )
  }
}

export default App;

