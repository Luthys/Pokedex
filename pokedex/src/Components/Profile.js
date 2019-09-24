import React from 'react';
import "../Style/Profile.css"

import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'


class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgUrl: "",
            averageList: [],
            count: 0
        }
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.step(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getType() {
        let info = this.props.info

        let types = []
        for (let i = 0; i < info.types.length; i++) {
            types.push(info.types[i].type.name)
        }
        return types
    }

    step() {
        let sum = this.state.count + 11

        if (sum >= 100)
            sum = 0

        this.setState(state => ({
            count: sum
        }));
    }

    getStat() {
        let info = this.props.info

        let stats = []
        for (let i = 0; i < info.stats.length; i++) {
            let stat = {}
            let name = info.stats[i].stat.name

            stat.number = info.stats[i].base_stat
            stat.name = name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ")

            stats.push(stat)
        }
        return stats
    }

    render() {
        if (this.props.info) {
            let stats = this.getStat()
            let types = this.getType()

            let info = this.props.info

            let averageList = this.props.averageList


            let top = <Container>
                <Row>
                    <Col xs={4} sm={2}>
                        <Image src={info.sprites.front_default}></Image>
                    </Col>
                    <Col xs={8} sm={10} className="mt-2">
                        <span className="title ">{
                            info.name
                                .toLowerCase()
                                .split(' ')
                                .map(char => char.charAt(0).toUpperCase() + char.substring(1))
                        }</span>
                    </Col>
                </Row>
                <Row>
                    {types.map(type => (
                        <Col
                            key={type}
                            className="badge badge-pill mr-1"
                            style={{
                                backgroundColor: `#${TYPE_COLORS[type]}`,
                                color: 'white'
                            }}
                        >
                            {
                                type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                            }
                        </Col>
                    ))}
                </Row>
                <Row className="pt-3">
                    <h1>Stats</h1>
                </Row>
                {
                    stats.reverse().map((stat, index) => (
                        <Row key={index} className="pt-2">
                            <Col xs={4}>
                                {stat.name}
                            </Col>
                            <Col>
                                <ProgressBar now={stat.number} label={`${stat.number}`} />
                            </Col>
                        </Row>
                    ))
                }
                <Row className="pt-3">
                    <h1>Average per type</h1>
                </Row>
            </Container>

            let bot

            if (averageList.length !== 0) {
                bot = <Container>
                    <Row>
                        {
                            averageList.map((item, index) => (
                                <Col key={index} lg={6} sm={12} xs={12}>
                                    <Col
                                        xs={12}
                                        key={item.name}
                                        className="badge badge-pill mr-1"
                                        style={{
                                            backgroundColor: `#${TYPE_COLORS[item.name]}`,
                                            color: 'white'
                                        }}
                                    >
                                        {
                                            item.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')
                                        }

                                    </Col>
                                    {
                                        item.avg.map((i, index) => (
                                            <Row key={index} className="pt-1">
                                                <Col>
                                                    {i[0].charAt(0).toUpperCase() + i[0].slice(1).replace("-", " ")}
                                                </Col>
                                                <Col>
                                                    <ProgressBar now={i[1]} label={`${i[1]}`} />
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                </Col>

                            ))
                        }
                    </Row>
                </Container>
            } else {
                bot = <div className="container-loader">
                    <img className="loader" src="/load.gif" alt="LOADING..."></img>
                </div>
            }
            return <div>{top} {bot}</div>

        }
        return null
    }
}

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

export default Profil