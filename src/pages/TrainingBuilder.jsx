import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const TrainingBuilder = () => {
    const [trainings, setTrainings] = useState([]);
    const [selectedTraining, setSelectedTraining] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [newTrainingName, setNewTrainingName] = useState('');
    const [reloadTrainings, setReloadTrainings] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { exerciseId } = location.state;

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://localhost:44385/Training', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setTrainings(response.data);
                console.log("trainings", response.data);
            })
            .catch(error => {
                console.error('Error fetching trainings:', error);
            });
    }, [reloadTrainings]); // Add reloadTrainings to dependency array

    const handleAddExercise = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const payload = {
                exerciseId,
                trainingId: selectedTraining,
                sets: parseInt(sets, 10),
                reps: parseInt(reps, 10)
            };

            console.log("payload", payload);

            await axios.post('https://localhost:44385/Training/addExercise', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding exercise to training:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
        }
    };

    const handleCreateTraining = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (!token) {
                throw new Error('No token found');
            }

            const payload = {
                newTrainingName: newTrainingName,
            };

            const response = await axios.post('https://localhost:44385/Training/create', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setTrainings([...trainings, response.data]);
            setNewTrainingName('');
            setReloadTrainings(!reloadTrainings); // Toggle reloadTrainings to trigger useEffect
        } catch (error) {
            console.error('Error creating new training:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Add Exercise to Training</h2>
                <form onSubmit={handleAddExercise} className="space-y-4">
                    <select
                        value={selectedTraining}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            console.log("Selected training:", selectedValue);
                            setSelectedTraining(selectedValue);
                        }}
                        className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Training</option>
                        {trainings.map(training => (
                            <option key={training.trainingId} value={training.trainingId}>{training.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Sets"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Reps"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Add Exercise
                    </button>
                </form>
                <h2 className="text-2xl font-bold text-center mt-6 mb-4 text-black">Create New Training</h2>
                <form onSubmit={handleCreateTraining} className="space-y-4">
                    <input
                        type="text"
                        placeholder="New Training Name"
                        value={newTrainingName}
                        onChange={(e) => setNewTrainingName(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">
                        Create Training
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TrainingBuilder;