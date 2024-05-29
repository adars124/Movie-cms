import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromStorage, clearStorage } from "../libs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import http from "../http";
import { RootState, addUser } from "../state";

interface PrivateRouteProps {
    element?: React.ReactNode
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const user = useSelector((state: RootState) => state.user.value)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(user).length == 0) {
            const token = getFromStorage('token');

            if (token) {
                http.get('/cms/user/details')
                    .then(({ data }) => {
                        dispatch(addUser(data))
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error('Please login to continue.');
                        clearStorage('token');
                        navigate('/cms/login');
                    })
            } else {
                toast.error('Please login to continue.')
                navigate('/cms/login')
            }
        }
    }, [user])

    return element;
}

export default PrivateRoute
