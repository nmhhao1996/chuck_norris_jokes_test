import { FC } from 'react';
import {
    Route,
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Root from './components/pages/Root';
import Home from './components/pages/Home';
import NotFoundError from './components/pages/NotFoundError';
import JokeDetail from './components/pages/JokeDetail';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<NotFoundError />}>
            <Route path="" element={<Home />} />
            <Route path="detail/:search/:id" element={<JokeDetail />} />
        </Route>,
    ),
);

const App: FC = () => {
    return <RouterProvider router={router} />;
};

export default App;
