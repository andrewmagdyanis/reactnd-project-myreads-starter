import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import '../App.css'

class Book extends Component {
    state = {
        section: "none",
    }

    constructor(props) {
        super(props);
        if(typeof props.book.shelf !== "undefined"){
            this.state = { section: props.book.shelf }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(typeof props.book.shelf !== "undefined"){
            return({ section: props.book.shelf });
        }
        return({});
    }

    handleSectionChange = (e) => {
        var selectedValue = e.target.value;

        BooksAPI.update(this.props.book, selectedValue).then(book => {
            this.setState({ section: selectedValue });
            
            this.props.moveBookFromTo(
                this.props.book,
                this.props.book.shelf,
                selectedValue)
        });
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, 
                        backgroundImage: (typeof this.props.book.imageLinks ==="undefined")? null:`url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.section} onChange={this.handleSectionChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        );
    }

}
export default Book;