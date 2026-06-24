import React,{useState} from "react";
import axios from 'axios';
import './TicketForm.css';
function TicketForm() {
    const [form,setForm]=useState({
        title:'',
        description:'',
        priority:'',
        createdby:''
    })
const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
}
const handleSubmit=async(e) => {
    e.preventDefault();
    try{
        await axios.post('http://localhost:5000/api/tickets',form)
        alert('Ticket created');
        setForm({ title:'',
        description:'',
        priority:'',
        createdby:''
        })
    }
    catch(error){
        alert("error while creating Ticket");
        console.log(console.error());

    };  
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title: <input type="text" name="title"value={form.title} onChange={handleChange}/><br/>
        Description: <textarea name="description"value={form.description} onChange={handleChange}/><br/>
        Priority: <select name="priority"value={form.priority} onChange={handleChange}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select><br/>
        createdby: <input type="text" name="createdby" value={form.createdby} onChange={handleChange}/><br/>
        <button type="submit" className="Submit">Submit</button>
      </form>
    </div>
  );
}

export default TicketForm;