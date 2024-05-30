import { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../http";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface UserProps {
    user_id: any;
    username: String;
    email: String;
    role_name: String;
};

const List = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    let count = 1;

    const loadData = () => http.get('/cms/users').then((res: AxiosResponse<any>) => setUsers(res.data.users));

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = (id: String) => {
        const flag = confirm('Are you sure??');
        if (flag) {
            http.delete(`/cms/users/${id}`)
                .then((res: AxiosResponse<any>) => {
                    loadData();
                    toast.success(res.data.message);
                    navigate('/cms/users');
                })
                .catch(err => { console.log(err) });
        }
    };
    return (
        <div>
            <Breadcrumb pageName="Users" />
            <section className="container mx-auto font-mono">
                <div className="pb-10">
                    <h1 className="text-2xl w-full p-2 bg-gray-400">
                        <Link to="/cms/users/create" className="absolute text-sm bg-secondary font-bold text-meta-4 px-4 py-1.5 hover:bg-body hover:text-whiten transition-all duration-100 rounded-md">
                            <div className="flex items-center gap-2">
                                <span>Add Users</span>
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
                                    <th className="px-4 py-3">S.N.</th>
                                    <th className="px-4 py-3">Username</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3" colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    users.map((user: UserProps) => (
                                        <tr key={user.user_id} className="text-gray-700">
                                            <td className="px-4 py-3 border">{count++}</td>
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <p className="font-semibold text-black">{user.username}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {user.email} </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">{user.role_name}</td>
                                            <td className="px-4 py-3 space-x-4 min-w-[8.625rem] text-center text-xs border">
                                                <Link className="inline-flex items-center px-2 py-2 hover:bg-[#4BB543] text-graydark transition text-sm font-medium rounded-md" to={`/cms/users/${user.user_id}/edit`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button onClick={() => handleDelete(`${user.user_id}`)} className="inline-flex transition group items-center px-2 py-2 hover:bg-[#cc1f39] text-sm font-medium rounded-md">
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