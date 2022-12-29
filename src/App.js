import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Components/Layout/Main';
import Home from './Components/Pages/Home/Home';
import AddTask from './Components/Pages/AddTask/AddTask';
import MyTask from './Components/Pages/MyTask/MyTask';
import CompletedTask from './Components/Pages/CompletedTask/CompletedTask';
import SignIn from './Components/Pages/SignIn/SignIn';
import SignUp from './Components/Pages/SignUp/SignUp';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Media from './Components/Pages/Media/Media';
import TaskDetails from './Components/Pages/TaskDetails/TaskDetails';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/addTask',
          element: <AddTask/>
        },
        {
          path: '/myTask',
          element: <PrivateRoute><MyTask/></PrivateRoute>
        },
        {
          path: '/media',
          element: <PrivateRoute><Media/></PrivateRoute>
        },
        {
          path: '/details/:id',
          element: <TaskDetails/>
        },
        {
          path: '/completedTask',
          element: <PrivateRoute><CompletedTask/></PrivateRoute>
        },
        {
          path: '/signin',
          element: <SignIn/>
        },
        {
          path: '/signup',
          element: <SignUp/>
        },
        {
          path: '*',
          element: <p className='text-5xl text-center font-bold'>404!!! Page Not Found</p>
      }
      ]
    }
  ]);


  return (
    <div className="">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
