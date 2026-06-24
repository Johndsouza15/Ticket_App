import React, { useState,useEffect } from "react";
import axios from 'axios';
import './TicketList.css';

function TicketList(){
    const[tickets,setTickets]=useState([]);

    const fetchTicket=async()=>{
        try{
            const res=await axios.get('http://localhost:5000/api/tickets');
            setTickets(res.data);
        }catch(error){
            alert("error while fetching the ticket");
            console.log(error);
        }
    };
    const deleteTicket=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/tickets/${id}`);
            //update State Immediately
            setTickets(prevTickets=>prevTickets.filter(ticket=>ticket._id!==id));
        }catch(error){
            alert("error in deleteing the ticket");
            console.log(error);
        }
    }
    const updateStatus=async(id,newStatus)=>{
        try{
            await axios.put(`http://localhost:5000/api/tickets/${id}`,{status:newStatus});
            //update only that ticket status in state
            //... is called spread operator
            setTickets(prevTickets=>
                prevTickets.map(ticket=>
                    ticket._id===id?{...ticket,status:newStatus}:ticket
                )
            );
        }catch(error){
            alert("error in updating the ticket");
            console.log(error);
      }
    };
    useEffect(()=>{
        fetchTicket();
        window.dispatchEvent(new Event("TicketCreated"));
    },[]);
    return(
        <div className="ticket-list">
            <h2>Tickets</h2>
            {tickets.length===0 && <p>No tickets found</p>}
            {tickets.map((ticket)=>(
                <div key={ticket._id}className="Ticket-card">
                    <h3>{ticket.title}</h3>
                    <p><strong>description:</strong>{ticket.description}</p>
                    <p><strong>priority:</strong>{ticket.priority}</p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span className={`status-badge ${
                            ticket.status==='Open'?'status-open':
                            ticket.status==='In progress'?'status-in-progress':
                            'status-resolved'
                        }`}>
                        {ticket.status}
                        </span>
                    </p>
                    <p>createdby:{ticket.createdby}</p>
                    <p>createdAt:{new Date(ticket.createdAt).toLocaleString()}</p>
                    <div className="ticket-button">
                        <button onClick={()=>updateStatus(ticket._id,'In progress')}>In progress</button>
                        <button onClick={()=>updateStatus(ticket._id,'Resolved')}>Resolved</button>
                        <button className="delete-btn"onClick={()=>deleteTicket(ticket._id)}>Delete</button>
                    </div>
                </div>
           ) )}
        </div>
    )
}

export default TicketList;