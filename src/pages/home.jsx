import React,{useEffect, useState} from 'react';
import Countdown from 'react-countdown';
import {
  Button,
  Page,
  Block,
  List, 
  ListItem,
  Segmented,
  Input
} from 'framework7-react';


const trelloKey= 'b28a2a2085a8fd0f93fab3ed600d6faf';
const trelloToken = 'd19ff1ed6931ec415489c67eec62134c707bb328b09b8d390eb128eefd5320b7'



const HomePage = ({f7route, f7router}) => {

  const getBoardData = async (boardId) => {
    fetch(`https://api.trello.com/1/boards/${boardId}?lists=all&key=${trelloKey}&token=${trelloToken}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        return response.text();
      })
      .then(board => {
        let jsonBoard = JSON.parse(board)
        // console.log("json board: ", jsonBoard);
        setBoard(jsonBoard)
        const lists = jsonBoard.lists
        // console.log("lists: ", lists)
        const listId = lists.filter(list => list.name === "New projects approvals")[0].id
        getListData(listId)
      })
      .catch(err => console.error(err));
  }
  const getListData = async (listId)  => {
    fetch(`https://api.trello.com/1/lists/${listId}?cards=open&key=${trelloKey}&token=${trelloToken}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        return response.text();
      })
      .then(list => {
        let jsonList = JSON.parse(list)
        console.log("json list: ", jsonList);
        setList(jsonList)
      })
      .catch(err => console.error(err));
  }

  const [board, setBoard] = useState()
  const [list, setList] = useState()

  useEffect(() => {
    getBoardData(f7route.query.board)
  },[])


  useEffect(()=>{
    console.log("list has changed: ", list)
  },[list])

  useEffect(()=>{
    console.log("board has changed: ", board)
  },[board])

  return (
    <Page name="home">
      
      <Block strong>
        <p>Board ID: {f7route.query.board}</p>
      </Block>
      {list && <List style={{alignItems: 'center'}}>
        {list.cards.filter(card => {return JSON.stringify(card.labels).includes("Waiting your for input")}).map((card, id) => {return(
          <ListItem
            mediaList
            key = {id}
            // title = {card.name}
          >
            <Countdown  slot="header" date={Date.now() + 100000} />
            <Block slot="title">
              <div >{card.name}</div>
              <div >Company name</div>
              <div >Video length</div>
              <div>Project payment</div>
            </Block>
            <Block slot="after" style={{marginRight: 128}}>
              <p>When can you deliver?</p>
              <Input type="datetime-local"></Input>
            </Block>
            <Block style={{display:"flex", flexDirection:"row", alignItems: "center"}} slot="after">
              <Button raised bgColor="green" fill f7="checkmark_alt">Accept</Button>
              <Button style={{marginLeft: "24px"}} color="red" outline>Decline</Button>
            </Block>
          </ListItem>
        )})}
      </List>}
      
    </Page>
  )
};
export default HomePage;