import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ImageCard, ButtonCardContainer, CardDesc } from './style'

export default class ButtonCard extends Component {
  render() {
    return (
        <ButtonCardContainer className="mx-2">
            <Link to={this.props.data.path}>
                <ImageCard src={process.env.PUBLIC_URL + '/' + this.props.data.image}/>
                <CardDesc>
                    {this.props.data.title}
                </CardDesc> 
            </Link>
        </ButtonCardContainer>
    )
  }
}
