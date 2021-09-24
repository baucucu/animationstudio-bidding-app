import React,{useEffect} from 'react';
import {
  Page,
  Block,
} from 'framework7-react';

const HomePage = ({f7route, f7router}) => {

  return (
    <Page name="home">
      
      <Block strong>
        <p>Board ID: {f7route.query.board}</p>
      </Block>
      
    </Page>
  )
};
export default HomePage;