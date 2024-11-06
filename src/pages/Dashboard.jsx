import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [exercises, setExercises] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://localhost:44385/api/Exercises')
            .then(response => {
                setExercises(response.data);
            })
            .catch(error => {
                console.error('Error fetching exercises:', error);
            });
    }, []);

    const handleAddExerciseClick = (exerciseId) => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        console.log("Token before API call:", token);
        console.log("Exercise ID:", exerciseId);
        navigate('/training-builder', { state: { exerciseId } });
    };


    return (
        <div className="min-h-screen bg-gray-800 py-8 flex flex-col items-center">
            <div className="w-full flex justify-end px-8">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    View Training
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {Object.keys(exercises).map((id) => {
                    const exercise = exercises[id];
                    return (
                        <div key={id} className="flex flex-col items-center">
                            <h3 className="text-white mb-2">{exercise.name}</h3>
                            <img
                                src={exercise.imageUrl}
                                alt={exercise.description}
                                className="w-24 h-24 bg-gray-300 rounded-md mb-2"
                            />
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddExerciseClick(id)}
                            >
                                Add Exercise
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;