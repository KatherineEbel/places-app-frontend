import { lazy, Suspense } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import {AuthProvider} from "./shared/context/auth";
import PrivateRoute from "./shared/components/PrivateRoute";
import {ToastProvider} from "./shared/context/toast";
import ToastContainer from "./shared/components/ToastContainer";
import Loader from "./shared/components/loader/loader";

const Users = lazy(() => import('./user/pages/Users'));
const NewPlace = lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'));
const Auth = lazy(() => import('./user/pages/Auth'));

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <>
          <Router>
            <Suspense fallback={<Loader/>}>
              <Routes>
                <Route path='/' element={<MainNavigation/>}>
                  <Route index element={<Users/>}/>
                  <Route path="/:userId/places" element={
                    <PrivateRoute>
                      <UserPlaces/>
                    </PrivateRoute>
                  }/>
                  <Route path="/places/new" element={
                    <PrivateRoute>
                      <NewPlace/>
                    </PrivateRoute>
                  }/>
                  <Route path="/places/:placeId" element={
                    <PrivateRoute>
                      <UpdatePlace/>
                    </PrivateRoute>
                  }/>
                  <Route path="/users" element={<Users/>}/>
                  <Route path="/auth" element={<Auth/>}/>
                </Route>
              </Routes>
            </Suspense>
          </Router>
          <ToastContainer/>
        </>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
