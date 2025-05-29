import { useState } from 'react';
import './index.css'
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

 export default function App(){
  const [showFriend,setshowFriend]=useState(false);
  const [friends,setFriends]=useState(initialFriends);
  function handleShowFriend(){
  setshowFriend((show) => !show);
}
  return(
     <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends}/>
       {showFriend&& <FormAddFriend/>}
        <Button onClick={handleShowFriend}>{showFriend===false?"Add Friend" :"Close"}</Button>
      </div>
        <FormSplitBill/>
  </div>
)}



function FriendList({friends}){
  return (
    <ul>
      {friends.map(friend=><Friend friend={friend} key={friend.id}/>)}
    </ul>
  )
}
function Friend({friend}){
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {
        friend.balance<0&&(
          <p className='red'>You owe {friend.name} {Math.abs(friend.balance)}$</p>
        )
      }
      {
        friend.balance>0&&(
          <p className='green'> {friend.name} owes you {Math.abs(friend.balance)}$</p>
        )
      }
      {
        friend.balance===0&&(
          <p >You and {friend.name} are even</p>
        )
      }
      <Button className='button'>select</Button>
    </li>
  )
}

function Button({children,onClick}){
  return <button className='button' onClick={onClick}>{children}</button>
}

function FormAddFriend(){
  const [name,setName]=useState("");
  const [image,setImage]=useState("https://i.pravatar.cc/48");
  function handleSubmit(e){
    e.preventDefault();
    if(!image||!name)return ;
    const id=crypto.randomUUID();
    const newFriend={
      name,
      id ,
      image : `${image} ?= ${id}`,
      balance : 0,
    };
    setImage("https://i.pravatar.cc/48");
    setName("");
  }
  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input value={name} type='text'onChange={(e)=>setName(e.target.value)} />
      <label>📸Image Url</label>
      <input value={image} type='text' onChange={(e)=>setImage(e.target.value)} />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill(){
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with X</h2>

      <label>💸 Bill value</label>
      <input type='text'/>

      <label>🤴 Your expenses</label>
      <input type='text'/>

      <label>👩‍🚀 X's expenses</label>
      <input type='text'/>
      <label>💵 who's paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  )
}