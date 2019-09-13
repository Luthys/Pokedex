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
            imgUrl: ""
        }
    }

    render() {
        if(this.props.info){
            let info = this.props.info
            
            let types = []
            for(let i = 0; i<info.types.length; i++) {
                types.push(info.types[i].type.name)
            }

            let stats = []

            for(let i = 0; i < info.stats.length; i++) {
                let stat = {}
                let name = info.stats[i].stat.name

                stat.number = info.stats[i].base_stat
                stat.name = name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ")

                stats.push(stat)
            }

            return (
                <Container>
                    <Row>
                        <Col xs={2}>
                                <Image src={info.sprites.front_default}></Image>
                        </Col>
                        <Col xs={8} className="mt-2">
                                <span className="title ">{
                                        info.name
                                        .toLowerCase()
                                        .split(' ')
                                        .map(char => char.charAt(0).toUpperCase() + char.substring(1))
                                }</span>
                        </Col>
                    </Row>
                    <Row>
                        { types.map(type => (
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
                        stats.reverse().map(stat => (
                            <Row className="pt-2">
                                <Col xs={4}>
                                    {stat.name}
                                </Col>
                                <Col>
                                    <ProgressBar now={stat.number} label={`${stat.number}`} />
                                </Col>
                            </Row>
                        ))
                    }
                </Container>
            )
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