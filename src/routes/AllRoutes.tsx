import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import PrivateRoute from "./PrivateRoute";
import * as Pages from "../pages";
import Profile from "../pages/Profile";



const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cms" element={<DefaultLayout />}>
                    {/* Dashboard */}
                    <Route path="dashboard" element={<PrivateRoute element={<Pages.CMS.Dash.Dashboard />} />} />

                    {/* Movies */}
                    <Route path="movies" element={<PrivateRoute element={<Pages.CMS.Movies.List />} />} />
                    <Route path="movies/create" element={<PrivateRoute element={<Pages.CMS.Movies.Create />} />} />
                    <Route path="movies/:id/edit" element={<PrivateRoute element={<Pages.CMS.Movies.Edit />} />} />
                    <Route path="showtimes/list" element={<PrivateRoute element={<Pages.CMS.Movies.ListShowtime />} />} />
                    <Route path="create/showtime" element={<PrivateRoute element={<Pages.CMS.Movies.UpdateShowtime />} />} />

                    {/* Users */}
                    <Route path="users" element={<PrivateRoute element={<Pages.CMS.Users.List />} />} />
                    <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
                    <Route path="users/create" element={<PrivateRoute element={<Pages.CMS.Users.Create />} />} />
                    <Route path="users/:id/edit" element={<PrivateRoute element={<Pages.CMS.Users.Edit />} />} />

                    <Route path="login" element={<Pages.CMS.Auth.Login />} />
                </Route>
                <Route path="/" element={<Navigate to="/cms/dashboard" />} />
            </Routes>
        </BrowserRouter>
    )
};

export default AllRoutes;