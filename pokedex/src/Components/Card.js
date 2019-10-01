import React from 'react';
import "../Style/Card.css"

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: "",
            imgUrl: "",
            toMuch: false
        }
    }

    componentDidMount() {
        const name = this.props.name
        let url = this.props.url
        let id = url.split("/")[6]

        const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png?raw=true`

        this.setState({ id, name, imgUrl })
    }

    render() {
        return (
            <div
                className="card mt-2 p-3">
                <div className="card-text">
                    <span> {this.state.id} </span>
                    <span className="pl-3">{
                        this.props.name
                            .toLowerCase()
                            .split(' ')
                            .map(char => char.charAt(0).toUpperCase() + char.substring(1))
                    }</span>
                </div>
            </div>
        )
    }
}

export default Card