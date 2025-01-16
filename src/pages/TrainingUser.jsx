import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const TrainingUser = () => {
    const [trainingExercises, setTrainingExercises] = useState([]);
    const [weights, setWeights] = useState({});
    const location = useLocation();
    const { trainingId, trainingSessionId } = location.state || {};

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (trainingId) {
            axios.get('https://liftmateapi-ake2erecctdaf8d0.westeurope-01.azurewebsites.net/Training/getTrainingById', {
                params: { id: trainingId },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setTrainingExercises(response.data);
                })
                .catch(error => {
                    console.error('Error fetching training exercises:', error);
                });
        }
    }, [trainingId]);

    const handleWeightChange = (exerciseId, weight) => {
        setWeights(prevWeights => ({
            ...prevWeights,
            [exerciseId]: weight,
        }));
    };

    const saveExercise = async (exercise) => {
        const token = localStorage.getItem('token');
        const weight = weights[exercise.id] || 0;

        const payload = {
            trainingSessionId,
            exerciseId: exercise.id,
            weight,
            sets: exercise.sets,
            reps: exercise.reps
        };
        console.log(payload);

        try {
            await axios.post('https://liftmateapi-ake2erecctdaf8d0.westeurope-01.azurewebsites.net/Training/saveExercise', payload,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Exercise saved successfully');
        } catch (error) {
            console.error('Error saving exercise:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Training User</h2>
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-center mb-4 text-black">Exercises</h3>
                    <ul>
                        {trainingExercises.map(exercise => (
                            <li key={exercise.id} className="text-black mb-4 p-4 border border-gray-400 rounded-lg bg-white">
                                <img src={exercise.imageUrl} alt={exercise.name} className="w-24 h-24 bg-gray-300 rounded-md mb-2"/>
                                <p className="font-bold">Name: {exercise.name}</p>
                                <p>Sets: {exercise.sets}</p>
                                <p>Reps: {exercise.reps}</p>
                                <input
                                    type="number"
                                    placeholder="Weight"
                                    value={weights[exercise.id] || ''}
                                    onChange={(e) => handleWeightChange(exercise.id, e.target.value)}
                                    className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => saveExercise(exercise)}
                                    className="w-full mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Save Exercise
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrainingUser;