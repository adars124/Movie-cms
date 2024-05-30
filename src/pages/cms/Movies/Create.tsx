import { useState } from "react";
import { setInForm } from "../../../libs";
import { useNavigate } from "react-router-dom";
import http from "../../../http";

const Create = () => {
    const [form, setForm] = useState<any>({});
    const [image, setImage] = useState<any>(null);

    const navigate = useNavigate();

    const handleSubmit = (ev: React.ChangeEvent<any>) => {
        ev.preventDefault();

        let formData = new FormData();

        for (let key in form) {
            formData.append(key, form[key]);
        }

        formData.append('image', image)

        http.post('/cms/movies/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((resp: any) => {
                navigate('/cms/movies')
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="text-center text-4xl font-bold">Add Movie</div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter movie title"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required
                            onChange={event => setInForm(event, form, setForm)}
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Description
                        </label>
                        <textarea
                            rows={6}
                            name="description"
                            placeholder="Enter description"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={event => setInForm(event, form, setForm)}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Genre
                        </label>
                        <input
                            type="text"
                            name="genre"
                            placeholder="Enter genre"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={event => setInForm(event, form, setForm)}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Featured
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <select name="featured" id="featured" required onChange={event => setInForm(event, form, setForm)} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                <option value="" selected disabled>Select any value</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
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
                        <label className="mb-3 block text-black dark:text-white">
                            Status
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <select name="status" required onChange={event => setInForm(event, form, setForm)} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                <option value="" selected disabled>Select any value</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
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
                        <label className="mb-3 block text-black dark:text-white">
                            Released Date
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="released_date"
                                className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                                onChange={event => setInForm(event, form, setForm)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Poster
                        </label>
                        <input
                            type="file"
                            name="image"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            onChange={event => {
                                const files = event.target.files;
                                if (files && files.length > 0) {
                                    setImage(files[0]);
                                }
                            }}
                        />
                        <div className="p-10 max-w-4xl">
                            {image ? <img className="" src={URL.createObjectURL(image)} /> : null}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-3 w-30 text-center py-1.5 hover:bg-meta-3 bg-meta-4 text-bodydark1 rounded transition duration-200">Save</button>
                        <button onClick={() => {
                            setForm({});
                            navigate('/cms/movies');
                        }} className="px-3 w-30 text-center py-1.5 bg-danger hover:bg-[#cc1f39] text-bodydark1 rounded transition duration-200">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default Create;