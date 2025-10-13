import { useNavigate } from "react-router-dom";

export default function AssetCard({ asset }) {
    const nagivate = useNavigate()
    return (
      <div style={{border: "solid red 2px", width: "200px", padding: "0.5em"}}>
        <h3>
          {asset.nombre}
        </h3>
        
        <p>
          <strong>Status: </strong> 
          <span>
            {asset.status}
          </span>
        </p>
        
        <p>
          <strong>Owner:</strong> {asset.owner}
        </p>
        
        <p>
          <strong>Tipo:</strong> {asset.tipo}
        </p>
        <button onClick={() => nagivate(`/edit/${asset.id}`)}>Editar</button>
      </div>
    );
  };
  