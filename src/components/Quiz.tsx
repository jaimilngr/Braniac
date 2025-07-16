import { Avatar } from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { incrementScore } from "../slices/creation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Quiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const player1Name = useSelector((state: RootState) => state.creation['player-1'].name); 
    const player2Name = useSelector((state: RootState) => state.creation['player-2'].name); 
    const player1Score = useSelector((state: RootState) => state.creation['player-1'].score);
    const player2Score = useSelector((state: RootState) => state.creation['player-2'].score);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<'player-1' | 'player-2'>('player-1');

    const handleIncrementScore = (player: 'player-1' | 'player-2') => {
        dispatch(incrementScore(player));
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentPlayer(currentPlayer === 'player-1' ? 'player-2' : 'player-1');
        } else {
            setGameOver(true);
        }
    };

    const fetchQuizData = async () =>{
        const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
        ).then((res:any) => res.data)
        return response.results;
    }

    const { data:quizData , isLoading , error} = useQuery({
        queryKey: ['quizData'],
        queryFn: fetchQuizData,
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching quiz data</div>;

    const question = quizData[currentQuestionIndex];

    return (
        <div className="container-fluid vh-100 bg-transparent text-center align-self-center">
            <div className="Quiz-header h-100 d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center mx-auto position-relative" 
                  style={{ width: '80%' }}>
                <h1 className="fs-3 text-white ">Quiz Duel</h1>
                 <button className="btn btn-dark position-absolute end-0 " onClick={() => navigate("/started")}>Restart</button>
                </div>
                <div className="quiz-card shadow-lg p-4 mt-3" style={{ width: '80%', margin: '0 auto', borderRadius: '12px', backgroundColor: '#fbf6f1ff' }}>

        { gameOver ? (
            <div>
                <h2>Game Over</h2>
                <p className="fs-3 my-5 text-capitalize ">{player1Score > player2Score ? `${player1Name} wins!` : player2Score > player1Score ? `${player2Name} wins!` : 'It\'s a tie!'}</p>
                <button className="btn btn-dark" onClick={() => navigate("/started")}>Play Again</button>
            </div>
        ) : (
            <>
                <h2 className="fs-4">{`Turn: ${currentPlayer === 'player-1' ? player1Name : player2Name}`}</h2>
                <h1 className="fs-2">{question.question}</h1>
                
                <div className="options d-grid mx-auto mt-4" style={{
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    width: 'max-content',
                    gap: '10px',
                }}>
                    {[...question.incorrect_answers, question.correct_answer].sort().map((option: string, i: number) => (
                        <button
                        key={i}
                            className="btn  mb-2 "
                            style={{ backgroundColor: '#cdced2'}}
                            onClick={() => {
                                if (option === question.correct_answer) {
                                    handleIncrementScore(currentPlayer);
                                }
                                handleNextQuestion(); 
                            }}
                            >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="mt-4 d-flex justify-content-center align-items-center ">
                    <p className="me-4"> <Avatar name={player1Name}/> Score: {player1Score}</p>
                    <p> <Avatar name={player2Name}/> Score: {player2Score}</p>
                </div>
            </>
        )
            }
                </div>
            </div>
        </div>
    );
};