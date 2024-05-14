import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import TaskListPage from './components/pages/TaskListPage/TaskListPage'
import WelcomePage from './components/pages/WelcomePage/WelcomePage'
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { resetState } from './redux/slices/persistedSlice';

function App() {
  // const dispatch = useDispatch();

  // // Dispatch resetState action on component mount
  // useEffect(() => {
  //   dispatch(resetState());
  // }, [dispatch]);
  // Define your custom primary color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#AFADA9', // Change this to your desired primary color
      },
    },
  });
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
