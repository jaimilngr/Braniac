import { Avatar } from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { SetName , resetState } from "../slices/creation";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";


export const Selector = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const player1Name = useSelector((state: RootState) => state.creation['player-1'].name); 
  const player2Name = useSelector((state: RootState) => state.creation['player-2'].name); 

  const handleNameChange = (player: 'player-1' | 'player-2', name: string) => {
    dispatch(SetName({ player, name })); 
  };

  useEffect(() => {
    dispatch(resetState()); 
  }, [dispatch]);
  
  return (
    <div className="container-fluid  bg-transparent text-center align-self-center">
         <p className="fs-3 text-white mt-5">
                Choose the Player Names
              </p>
      <div className="row justify-content-center align-items-center mt-5 g-4">
        {[0, 1].map((i) => {
          const player = `player-${i + 1}` as 'player-1' | 'player-2'; 
          const playerName = i === 0 ? player1Name : player2Name; 

          return (
            <div
              className={`Player-${i} col-12 col-md-4 d-flex justify-content-center`}
              key={i}
            >
              <div className="card shadow-lg p-4" style={{ width: '18rem', borderRadius: '12px', backgroundColor: '#fbf6f1ff' }}>
                <Avatar name={playerName || "A"} /> 
                <div className="card-body">
                  <h5 className="card-title fs-4 mb-3">Player {i + 1}</h5>
                  <p className="card-text fs-6 mb-2">Select Your Name:</p>
                  <input
                    type="text"
                    className={`form-control bg-dark text-white border-0 rounded-3 Player-${i}_name`}
                    value={playerName}
                    style={{ height: '50px' }}
                    onChange={(e) => handleNameChange(player, e.target.value)} 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <button type="button" className="btn btn-light btn-lg mt-5" 
          onClick={() => navigate("/quiz")}>
          Start Duel 
        </button>
      </div>

    </div>
  );
};
