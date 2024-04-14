import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const RetrieveUser = () => {
  const userId = useParams();
  const getUsersUrl = `http://localhost:4000/v1/user/get-user/${userId?.id}`;
  const [user, setUser] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const fetchUser = async () => {
    try {
      const res = await axios.get(getUsersUrl);
      console.log('res', JSON.stringify(res.data.data));
      setUser([res.data.data]);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to update dimensions when window is resized
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <Row>
        {user?.map((data, index) => (
          <Col key={index}>
            <Card style={{ margin: 10 }}>
              <Card.Body
                style={{
                  width: `${screenWidth * 0.2}px`,
                  margin: 10,
                  padding: 5,
                }}
              >
                <h6>{data.description}</h6>
                <p>{'Types: ' + data.types.join(', ')}</p>
                <p>{'Topics: ' + data.topics.join(', ')}</p>
                <p>{'Levels: ' + data.levels.join(', ')}</p>
                <Button variant="outline-primary" href={data.url}>
                  Go to
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default RetrieveUser;
