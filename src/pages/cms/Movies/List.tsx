import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import { Key, useEffect, useState } from "react";
import http from "../../../http";
import { AxiosResponse } from "axios";

interface MoviesProp {
    movie_id: Key;
    title: String;
    poster_url: String;
    description: String;
    genre: String;
    status: boolean;
    released_date: Date;
};

const List = () => {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const loadData = () => http.get('/cms/movies').then((res: AxiosResponse<any>) => setMovies(res.data.movies));

    useEffect(() => {
        loadData();
    }, []);

    const formatDate = (timeStamp: Date) => {
        let ts = new Date(timeStamp);
        let t;

        const year = ts.getFullYear();
        const month = String(ts.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(ts.getDate()).padStart(2, '0');

        t = `${year}/${month}/${day}`

        return t;
    };

    const handleDelete = (id: String) => {
        const flag = confirm('Are you sure??');
        if (flag) {
            http.delete(`/cms/movies/${id}`)
                .then(() => {
                    loadData();
                    navigate('/cms/movies');
                })
                .catch(err => { console.log(err) });
        }
    };

    return (
        <div>
            <Breadcrumb pageName="Movies" />
            <section className="container mx-auto font-mono">
                <div className="pb-10">
                    <h1 className="text-2xl w-full p-4 bg-gray-400">
                        <Link to="/cms/movies/create" className="absolute text-sm bg-secondary font-bold text-meta-4 px-4 py-1.5 hover:bg-body hover:text-whiten transition-all duration-100 rounded-md">
                            <div className="flex items-center gap-2">
                                <span>Add Movies</span>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </Link>
                    </h1>
                </div>
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-white bg-body uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Poster</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Release Date</th>
                                    <th className="px-4 py-3" colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    movies.map((movie: MoviesProp) => (

                                        <tr key={movie.movie_id} className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        <p className="font-semibold text-black">{movie.title}</p>
                                                        <p className="text-xs text-gray-600">{movie.genre}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-ms font-semibold border">{
                                                movie.poster_url.length ? <img className="w-25" src={`${import.meta.env.VITE_API_URL}/images/${movie.poster_url}`} alt="movie image" /> : null
                                            }</td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {movie.description} </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border text-center">{movie.status}</td>
                                            <td className="px-4 py-3 text-sm border text-center">{formatDate(movie.released_date)}</td>
                                            <td className="px-4 py-3 space-x-4 min-w-[8.625rem] text-center text-xs border">
                                                <Link className="inline-flex items-center px-2 py-2 hover:bg-[#4BB543] text-graydark transition text-sm font-medium rounded-md" to={`/cms/movies/${movie.movie_id}/edit`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button onClick={() => handleDelete(`${movie.movie_id}`)} className="inline-flex transition group items-center px-2 py-2 hover:bg-[#cc1f39] text-sm font-medium rounded-md">
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
            </section>
        </div>
    )
};

export default List;