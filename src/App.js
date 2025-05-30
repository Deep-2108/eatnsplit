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
  const [selectedFriend,setSelectedFriend]=useState(null);
  function handleShowFriend(){
  setshowFriend((show) => !show);
}
function handleAddFriend(friend){
    setFriends((friends)=>[...friends,friend]);
    setshowFriend(false);
}
function handleSelection(friend){
  setSelectedFriend((curr)=>curr?.id===friend.id? null : friend);
}
function handleSpitBill(value){
    setFriends((friends)=>friends.map((friend)=>friend.id===selectedFriend.id ? {...friend,balance:friend.balance+value } :friend));
    setSelectedFriend(null);
}
  return(
     <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>
       {showFriend&& <FormAddFriend onAddFriend={handleAddFriend}/>}
        <Button onClick={handleShowFriend}>{showFriend===false?"Add Friend" :"Close"}</Button>
      </div>
        {selectedFriend && <  FormSplitBill onSplitBill={handleSpitBill} selectedFriend={selectedFriend}/>}
  </div>
)}



function FriendList({friends,onSelection,selectedFriend}){
  return (
    <ul>
      {friends.map(friend=><Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>)}
    </ul>
  )
}
function Friend({friend,onSelection,selectedFriend}){
  const isSelected=selectedFriend?.id===friend.id;
  return (
    <li className={isSelected? "selected" : ""}>
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
      <Button className='button' onClick={()=>onSelection(friend)}>{isSelected?"close":"select"}</Button>
    </li>
  )
}

function Button({children,onClick}){
  return <button className='button' onClick={onClick}>{children}</button>
}

function FormAddFriend({onAddFriend}){
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
    onAddFriend(newFriend);
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

function FormSplitBill({selectedFriend,onSplitBill}){
  const [Bill,setBill]=useState("");
  const [paidByUser,setPaidByUser]=useState("");
  const paidByFriend=Number(Bill-paidByUser);
  const [whoIsPaying,setWhoIsPaying]=useState("user");
  function handleSubmit(e){
    e.preventDefault();
    if(!Bill|| !paidByUser)return;
    onSplitBill(whoIsPaying ==="user" ? paidByFriend: -paidByUser);
  }
  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💸 Bill value</label>
      <input type='text' value={Bill} onChange={(e)=>setBill((Number(e.target.value)))} />

      <label>🤴 Your expenses</label>
      <input type='text' value={paidByUser} onChange={(e)=>setPaidByUser(Number(e.target.value)>Bill? paidByUser:Number(e.target.value))}/>

      <label>👩‍🚀 {selectedFriend.name}'s expenses</label>
      <input type='text' disabled value={paidByFriend}/>
      <label>💵 who's paying the bill</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  )
}