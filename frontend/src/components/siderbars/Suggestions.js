import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
   margin: 10px;
   margin-top: 1rem;
   width: 100%;
   background: #bac8ce1b;
   border-radius: 5px;
   padding: 0.5rem 1rem;

   div {
      padding: 10px;
      border-bottom: 1px solid #bac8ce3b;
   }

   div:last-child {
      border-bottom: none;
   }

`

const Suggestions = () => {
   return (
      <Container>
         <div className="heading">
            <h4>Suggestions</h4>
         </div>
         <div className="followList">
            Time is a valuable thing <br />
            Use it effectively.
         </div>
      </Container>
   )
}

export default Suggestions
