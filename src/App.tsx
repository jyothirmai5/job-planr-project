import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import TaskListPage from './components/pages/TaskListPage/TaskListPage'
import WelcomePage from './components/pages/WelcomePage/WelcomePage'
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { resetState } from './redux/slices/persistedSlice';

function App() {
  // const dispatch = useDispatch();

  // // Dispatch resetState action on component mount
  // useEffect(() => {
  //   dispatch(resetState());
  // }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "tasks",
      element: <TaskListPage />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App
