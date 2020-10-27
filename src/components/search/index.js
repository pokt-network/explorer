import React, { Component } from "react";
import Wrapper from '../wrapper';
import SearchContent from './search-content';
import {
  withRouter
} from 'react-router-dom'
import {DataSource} from "../../datasource";

const dataSource = new DataSource();

class Search extends Component {

  constructor() {
    super();
    this.state = { search: ""};

    this.handleChange = this.handleChange.bind(this);
    this.showData = this.showData.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  showData() {
    const { search }  = this.state;

    if(search !== "") {
      if(!isNaN(this.state.search)){
        dataSource.getBlock(search).then(block => {
          if(block !== undefined) {
            this.props.history.push(`/block/${search}`);
          } else {
            this.props.handler()
          }
        })

      } else if (search.length > 40){
        dataSource.getTransaction(search).then(tx => {
          if(tx !== undefined) {
            this.props.history.push(`/tx/${search}`);
          } else {
            this.props.handler()
          }
        })

      } else {
        dataSource.getAccount(search).then(account => {
          if(account !== undefined) {
            this.props.history.push(`/account/${search}`);
          } else {
            this.props.handler()
          }
        })
      }
    }
  }

  handleChange(event) {
    const value = event.target.value
    this.setState({search: value})
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.showData()
    }
  }

  render () {
    return (
      <SearchContent className="search">
          <Wrapper>
            <form onSubmit={e => { e.preventDefault(); }}>
              <input type="text" name="block" placeholder="Search by Transaction Hash, Block #" onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
              <input type="button" value="Search" onClick={() => {this.showData()}}/>
            </form>
          </Wrapper>
      </SearchContent>
    );
  }
}

export default withRouter(Search)