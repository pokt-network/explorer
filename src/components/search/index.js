import React, { Component } from "react";

import Wrapper from '../wrapper';
import SearchContent from './search-content';

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