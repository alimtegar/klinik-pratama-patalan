import { useContext } from 'react';

// Contexts
import { AuthContext } from '../../contexts-provider/contexts';

const Home = (props) => {
    // useContext
    const authContext = useContext(AuthContext);

    if (authContext.user.id) {
        props.history.push('/dashboard');
    } else {
        props.history.push('/login');
    }

    return null;
};

export default Home;