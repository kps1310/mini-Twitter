import React from 'react'
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { MainContext } from '../../Context';

const Container = styled.form`
   padding: 5px;
   position: sticky;
   top: 0;
   width: 100%;
   background: ${props => props.bg || 'white'};

   .searchContainer {
      display: flex;
      align-items: center;
      padding: 3px 10px;
      width: 100%;
      border-radius: 40px;
      background: ${props => props.bg || 'rgb(230, 236, 240)'};

      label {
         margin-top: 3px;
         padding: 5px;
         color: #afafaf;
      }
   }

   #search {
      border: none;
      padding: 8px;
      background: transparent;
      font-size: 1.05rem;
      width: 100%;

      &:focus {
         outline: none;
      }
   }
`

const Search = (props) => {

   const myContext = React.useContext(MainContext);

   return (
      <Container action="/">
         <div className="searchContainer">
            <label htmlFor="search"><FiSearch /></label>
            <input type="text" name="search" placeholder="Search" id="search" value={myContext.search} onChange={myContext.dataMethods.searchedUsers} />
         </div>
      </Container>
   )
}

export default Search
