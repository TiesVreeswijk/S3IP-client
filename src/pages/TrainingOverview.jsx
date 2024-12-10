import { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingOverview = () => {
    const [trainings, setTrainings] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState('');
    const [trainingExercises, setTrainingExercises] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('https://liftmateapi-ake2erecctdaf8d0.westeurope-01.azurewebsites.net/Training', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setTrainings(response.data);
            })
            .catch(error => {
                console.error('Error fetching trainings:', error);
            });
    }, []);

    const loadTrainingExercises = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token not found in localStorage");
            return;
        }

        try {
            console.log("Sending request with selectedTraining:", selectedTraining);

            const response = await axios.get('https://liftmateapi-ake2erecctdaf8d0.westeurope-01.azurewebsites.net/Training/getTrainingById', {
                params: { id: selectedTraining }, // Ensure 'id' matches backend parameter
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Training exercises fetched successfully:", response.data);
            setTrainingExercises(response.data); // Update state with fetched exercises
        } catch (error) {
            console.error("Error in Axios request:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else {
                console.error("Error details:", error.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Training Overview</h2>
                <select
                    value={selectedTraining}
                    onChange={(e) => setSelectedTraining(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Training</option>
                    {trainings.map(training => (
                        <option key={training.trainingId} value={training.trainingId}>{training.name}</option>
                    ))}
                </select>
                <button
                    onClick={loadTrainingExercises}
                    className="w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Load Training
                </button>
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-center mb-4 text-black">Exercises</h3>
                    <ul>
                        {trainingExercises.map(exercise => (
                            <li key={exercise.id} className="text-black mb-4 p-4 border border-gray-400 rounded-lg bg-white">
                                <img src={exercise.imageUrl} alt={exercise.name} className="w-24 h-24 bg-gray-300 rounded-md mb-2"/>
                                <p className="font-bold">Name: {exercise.name}</p>
                                <p>Sets: {exercise.sets}</p>
                                <p>Reps: {exercise.reps}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrainingOverview;