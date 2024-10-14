import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [exercises, setExercises] = useState({}); // Initialize as an empty object

    // Fetch exercises from the database
    useEffect(() => {
        axios.get('https://localhost:44385/api/Exercises')
            .then(response => {
                console.log(response.data); // Check the structure of the response
                setExercises(response.data); // Assuming response.data is an object with ids as keys
            })
            .catch(error => {
                console.error('Error fetching exercises:', error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-800 py-8 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.keys(exercises).map((id) => {
                    const exercise = exercises[id]; // Access the exercise object by its id
                    return (
                        <div key={id} className="flex flex-col items-center">
                            <h3 className="text-white mb-2">{exercise.name}</h3>
                            <img
                                src={exercise.imageUrl}
                                alt={exercise.description}
                                className="w-24 h-24 bg-gray-300 rounded-md mb-2"
                            />
                            <button className="bg-blue-500 text-white py-2 px-4 rounded">
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