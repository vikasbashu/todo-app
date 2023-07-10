import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../config/requestLibrary';
import LogoutIcon from '@mui/icons-material/Logout';

let data = [];

const fetch_todos = async () => {
    try{
        const response = await axios({
          method: 'get',
          url: '/todos',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
        });
        if(response.status === 200){
            return response;
        }
      }catch(err){
        err.response.status === 403 && alert(err.response.data.message);
        return null;
      }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Todos() {
    let [TODOS, getTodos] = React.useState(data);
    //const [textFieldValue, setTextFieldValue] = React.useState('');
    React.useEffect(() => {
      const retreiveTodos = async() => {
        try{
          const response = await fetch_todos();
          response.status === 200 ? getTodos(response.data.item) : getTodos([]);
        }catch(err){
          getTodos([]);
        }
      }
      retreiveTodos();
    }, []);
    // const handleChange = (event) => {
    //   setTextFieldValue(event.target.value);
    // };
    const logOut = () => {
        localStorage.removeItem('accessToken');
        // redirect back home after logging out
        window.location.href='/'; 
    }
    const deleteItem = async (id) => {
      const response = await axios({
        method:'delete',
        url:`/todos/${id}`,
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      response.status === 200 && alert(response.data.message);
    }
    const addTodo = async (event)=> {
      const data = new FormData(event.currentTarget);
      console.log(data);
      if(! data.get('title') && data.get('description'))alert('Please fill the rquired fields');
     else{
      const response = await axios({
        method: 'post',
        url: '/todos',
        data: {
          title: data.get('title'),
          description: data.get('description')
        },
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      }
      });
      if(response.status === 201){
          alert(response.data.message);
          
          //setTextFieldValue(event.target.value);
      }

     }
    }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
            <IconButton href="/" sx={{ mr: 2 }} size="large">
                <HomeIcon color='white'/>
            </IconButton>
          <LocalLibraryIcon sx={{ mr: 2 }}/>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <Button startIcon={<LogoutIcon />} variant="contained" onClick={logOut}>Log out</Button>
        </Toolbar>
      </AppBar>



      <main>
        {/* Hero unit */}
        <Box component="form" noValidate onSubmit={addTodo}
        sx={{
          marginTop: 8,
          margin:2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              // value={textFieldValue}
              // onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>


          <Container sx={{ py: 8 }} maxWidth="hi">
          {/* End hero unit */}
          <Grid container spacing={2}
           sx={{ height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'left'}}
          >
            {TODOS.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={8}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'left'}}
                >
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <Button size="small" color='error'>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>


      </main>
    </ThemeProvider>
  );
}