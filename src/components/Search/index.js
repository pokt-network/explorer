import React, { Component } from "react";

import Wrapper from '../../components/Wrapper';
import SearchContent from './SearchContent';

class Search extends Component {
  render () {
    return (
      <SearchContent className="search">
          <Wrapper>
            <form>
              <input type="text" name="block" placeholder="Search by Transaction Hash, Block #" />
              <input type="submit" value="Search" />
            </form>
          </Wrapper>
      </SearchContent>
    );
  }
}

export default Search;