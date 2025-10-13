import { useNavigate } from "react-router-dom";

export default function AssetCard({ name, status, owner, type, id }) {
    const nagivate = useNavigate()
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px'
      }}>
        <h3
          style={{
            marginTop: 0,
            marginBottom: '8px'
          }}
        >
          {name}
        </h3>
        
        <p>
          <strong>Status: </strong> 
            {status}
        </p>
        
        <p>
          <strong>Owner:</strong> {owner}
        </p>
        
        <p>
          <strong>Tipo:</strong> {type}
        </p>
        <button 
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: 'white'
        }}
        onClick={() => nagivate(`/edit/${id}`)}>Editar</button>
      </div>
    );
  };
  