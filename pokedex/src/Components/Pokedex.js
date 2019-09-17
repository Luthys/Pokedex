import React from 'react'
import axios from "axios"
import { request } from 'graphql-request';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import SearchBar from "./SearchBar"
import Card from "./Card"
import Profile from "./Profile"


const headers = new Headers();
headers.append('Content-Type', 'application/json');

class Pokedex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            list: [],
            filtered: [],
            selectedItem: '',
            averageList: []
        }
        this.handleInput = this.handleInput.bind(this)
    }

    async componentDidMount() {
        const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000"

        let currentDate = new Date()
        let lastUpdate = new Date(localStorage.getItem("lastUpdate"))

        let firstTime = lastUpdate === 0
        let canUpdate = false

        if (!firstTime) {
            let dif = currentDate.getTime() - lastUpdate.getTime()
            let hours = 1000 * 60 * 60

            // Can update if last update > 1 hours
            canUpdate = (dif / hours) > 1
        }

        if (firstTime || canUpdate) {
            let r = await axios.get(URL)

            if (r.status === 200) {
                localStorage.setItem("lastUpdate", new Date())
                localStorage.setItem("pokemonList", JSON.stringify(r.data))
            }
        }

        this.setState({
            list: JSON.parse(localStorage.getItem("pokemonList")).results,
        })
    }

    handleInput(event) {
        let value = event.target.value
        this.setState({ value: value })

        let newList = []
        let currentList = this.state.list

        if (event.target.value !== "" && event.target.value.length >= 2) {
            newList = currentList.filter(item => {
                const lc = item.name.toLowerCase()
                const filter = event.target.value.toLowerCase()
                return lc.match(new RegExp(filter))
            })
        } else {
            newList = []
        }
        this.setState({ filtered: newList })
    }

    async handleClick(url) {
        this.setState({ averageList: [] })
        if (url !== "") {
            let r = await axios.get(url)
            if (r.status === 200) {
                this.setState({ selectedItem: r.data })
                this.getAverageList(r.data.types)
            }
        }
    }

    async getAverageList(types) {
        const URL_AVG = "https://pokestats-gmtiqydwwa.now.sh/"

        let list = []

        for (let i = 0; i < types.length; i++) {

            let type = types[i].type.name.toUpperCase()
            let query = `{
                    averageStats(type1: ${type}) {
                        meta { lastUpdated }
                        avg {
                            attack
                            defense
                            hp
                            specialAttack
                            specialDefense
                            speed
                        }
                        types
                    }
                }`;

            let r = await request(URL_AVG, query);

            let averageStats = r.averageStats

            let o = {}
            o.name = types[i].type.name
            o.avg = Object.keys(averageStats.avg).map(function (key) {
                return [key, averageStats.avg[key]];
            });

            list.push(o)
        }
        this.setState({ averageList: list })
    }

    render() {
        return (
            <Container>
                <SearchBar
                    value={this.state.value}
                    onHandleInput={this.handleInput}
                />
                <Row>
                    <Col xs={4}>
                        <span>Total : {this.state.filtered.length}</span>
                        {
                            this.state.filtered.map((item, index) =>
                                <a
                                    key={index}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { this.handleClick(item.url) }}>
                                    <Card name={item.name} url={item.url} />
                                </a>
                            )
                        }
                    </Col>
                    <Col xs={8}><Profile averageList={this.state.averageList} info={this.state.selectedItem} /></Col>
                </Row>
            </Container>
        )

    }
}

export default Pokedex