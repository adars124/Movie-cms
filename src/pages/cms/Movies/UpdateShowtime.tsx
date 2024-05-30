import { useEffect, useState } from 'react';
import http from '../../../http';
import { setInForm } from "../../../libs";
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

interface MovieProp {
    movie_id?: string;
    title?: string;
    start_time?: string;
}

const UpdateShowtime = () => {
    const [movies, setMovies] = useState<MovieProp[]>([]);
    const [form, setForm] = useState<MovieProp>({});

    const loadData = () => http.get('/cms/movies').then((res: AxiosResponse<any>) => setMovies(res.data.movies));

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const url = "/cms/movies/showtime/create";

        await http.post(url, form).then(res => {
            toast.success('Showtime created successfully!');
        }).catch(err => console.log(err));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Create Showtime</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="movieName" className="block text-sm font-medium text-gray-700">Movie Name:</label>
                        <select
                            id="movieName"
                            name="movie_id"
                            onChange={(e: any) => setInForm(e, form, setForm)}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select a movie</option>
                            {movies?.map(movie => (
                                <option key={movie.movie_id} value={movie.movie_id}>{movie.title}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time:</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            name="start_time"
                            value={form.start_time}
                            onChange={(e: any) => setInForm(e, form, setForm)}
                            required
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-3 w-full text-center py-1.5 hover:bg-meta-3 hover:text-black bg-meta-4 text-bodydark1 rounded transition duration-100"
                    >
                        Create Showtime
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateShowtime;