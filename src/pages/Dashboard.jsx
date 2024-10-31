import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../pages/Modal';
// import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
    const [exercises, setExercises] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    // const { user } = useAuth();

    useEffect(() => {
        axios.get('https://localhost:44385/api/Exercises')
            .then(response => {
                setExercises(response.data);
            })
            .catch(error => {
                console.error('Error fetching exercises:', error);
            });
    }, []);

    const handleAddExerciseClick = () => {
        if (user) {
            axios.get(`https://localhost:44385/api/Training/user-trainings/${user.id}`)
                .then(response => {
                    setTrainings(response.data);
                    setIsModalOpen(true);
                })
                .catch(error => {
                    console.error('Error fetching trainings:', error);
                });
        }
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
                                onClick={handleAddExerciseClick}
                            >
                                Add Exercise
                            </button>
                        </div>
                    );
                })}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl mb-4">User Trainings</h2>
                <ul>
                    {trainings.map((training) => (
                        <li key={training.id}>{training.name}</li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default Dashboard;