import { useNavigate } from "react-router-dom"


export const Welcome = () => {

const navigate = useNavigate();

  return (
    <div className="container-fluid text-center vh-100  align-self-center justify-content-center  d-flex  flex-column text-white">
        <h1 className="fs-3">
            Welcome to the Braniac!
        </h1>
        <p className="mt-3 fs-4">
            A place for Ultimate Trivia Duels.
        </p>
        <div>
            
        <button type="button" className="btn btn-light btn-lg" 
        onClick={() => navigate("/started")}>
        Lets get Started </button>
        </div>


    </div>
  )
}
