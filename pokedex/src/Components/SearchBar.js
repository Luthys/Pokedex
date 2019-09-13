import React from 'react';
import "../Style/SearchBar.css"

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
        <input 
        className="SearchBar" 
        placeholder="Entrez votre pokemon" 
        type="text"
        value={this.props.value}
        onChange={this.props.onHandleInput}
        >
        </input>)
    }
}

export default SearchBar