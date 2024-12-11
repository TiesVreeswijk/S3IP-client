import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate(); // Use the navigate hook to navigate to another page

    useEffect(() => {
        axios.get('https://liftmateapi-ake2erecctdaf8d0.westeurope-01.azurewebsites.net/Exercises')
            .then(response => {
                setExercises(response.data);
            })
            .catch(error => {
                console.error('Error fetching exercises:', error);
            });
    }, []);

    const handleAddExerciseClick = (exerciseId) => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        console.log("Token before API call:", token); // Log the token to the consoles
        console.log("Exercise ID:", exerciseId); // Log the exercise ID to the consoles
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
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="flex flex-col items-center">
                        <h3 className="text-white mb-2">{exercise.name}</h3>
                        <img
                            src={exercise.ImageUrl}
                            alt={exercise.description}
                            className="w-24 h-24 bg-gray-300 rounded-md mb-2"
                        />
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={() => handleAddExerciseClick(exercise.id)}
                        >
                            Add Exercise
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;