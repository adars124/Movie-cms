import { useEffect, useState } from "react";
import http from "../../../http";
import { Link } from "react-router-dom";

interface ShowtimeProps {
    showtime_id?: string;
    movie_id: string;
    start_time: string;
}

export default function ListShowtime() {

    const [showtimes, setShowtimes] = useState<ShowtimeProps[]>([]);
    const [movies, setMovies] = useState<any>({});

    let count = 1;

    const loadData = async () => {
        try {
            const res = await http.get('/cms/movies/getShowtimes');
            setShowtimes(res.data.showtimes);
            // Fetch movie details for each showtime
            const movieIds = res.data.showtimes.map((showtime: ShowtimeProps) => showtime.movie_id);
            const movieDetails = await Promise.all(movieIds.map(async (movieId: string) => {
                const response = await http.get(`/cms/movies/${movieId}`);
                return { [movieId]: response.data };
            }));
            const moviesObject = Object.assign({}, ...movieDetails);
            setMovies(moviesObject);
        } catch (err) {
            console.log(err);
        }
    }

    const formatDate = (timeStamp: string) => {
        let ts = new Date(timeStamp);
        const year = ts.getFullYear();
        const month = String(ts.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(ts.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const handleDelete = (id: string) => {
        console.log(id);
        confirm('Are you sure?');
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            {/* <button className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add Showtime</button> */}
            <Link to="/cms/create/showtime" className="inline-block px-4  text-center py-2 hover:bg-body bg-meta-4 text-bodydark1 rounded transition duration-100 mb-4">Add Showtime</Link>
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-white bg-body uppercase border-b border-gray-600">
                            <th className="px-4 py-3">S.N.</th>
                            <th className="px-4 py-3">Movie Name</th>
                            <th className="px-4 py-3">Showtime</th>
                            <th className="px-4 py-3" colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            showtimes.map((showtime: ShowtimeProps) => (
                                <tr key={showtime.showtime_id}>
                                    <td className="px-4 py-3 border">{count++}</td>
                                    <td className="px-4 py-3 border">{movies[showtimes[0].movie_id]?.movie[0]?.title}</td>
                                    <td className="px-4 py-3 border">{formatDate(showtime.start_time)}</td>
                                    <td className="px-4 py-3 space-x-4 min-w-[8.625rem] text-center text-xs border">
                                        <button onClick={() => handleDelete(`${showtime.showtime_id}`)} className="inline-flex transition group items-center px-2 py-2 hover:bg-[#cc1f39] text-sm font-medium rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-whiter" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
