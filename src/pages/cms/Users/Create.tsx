import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setInForm } from "../../../libs";
import http from "../../../http";
import toast from "react-hot-toast";

const Create = () => {
    const [form, setForm] = useState<any>({});
    const navigate = useNavigate();

    const handleSubmit = (ev: React.ChangeEvent<any>) => {
        ev.preventDefault();

        http.post('/cms/users/create', form, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((resp: any) => {
            navigate('/cms/users');
        }).catch(err => {
            toast.error(err.response.data.message);
            console.log(err.response.data.message);
        });
    }
    return (
        <div>
            <div className="text-center text-4xl font-bold">Add User</div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                            onChange={event => setInForm(event, form, setForm)}
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your mail"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                            onChange={event => setInForm(event, form, setForm)}
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                            onChange={event => setInForm(event, form, setForm)}
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Role
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <select name="role_name" id="role" onChange={event => setInForm(event, form, setForm)} required className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                <option value="" selected disabled>Select any value</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g opacity="0.8">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                            fill="#637381"
                                        ></path>
                                    </g>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-4">
                            <button className="px-3 w-30 text-center py-1.5 hover:bg-meta-3 bg-meta-4 text-bodydark1 rounded transition duration-200">Save</button>
                            <button onClick={() => {
                                setForm({});
                                navigate('/cms/users');
                            }} className="px-3 w-30 text-center py-1.5 bg-danger hover:bg-[#cc1f39] text-bodydark1 rounded transition duration-200">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default Create;