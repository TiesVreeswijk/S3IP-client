import { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingOverview = () => {
    const [trainings, setTrainings] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState('');
    const [trainingExercises, setTrainingExercises] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://localhost:44385/Training', {
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

    useEffect(() => {
        if (selectedTraining) {
            const token = localStorage.getItem('token');
            axios.get(`https://localhost:44385/trainingexercises?trainingId=${selectedTraining}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setTrainingExercises(response.data);
                })
                .catch(error => {
                    console.error('Error fetching training exercises:', error);
                });
        }
    }, [selectedTraining]);

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
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-center mb-4 text-black">Exercises</h3>
                    <ul>
                        {trainingExercises.map(exercise => (
                            <li key={exercise.id} className="text-black">{exercise.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrainingOverview;