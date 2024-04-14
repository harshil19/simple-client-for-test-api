import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        'http://localhost:4000/v1/user/get-all-users',
      );
      // console.log('res', JSON.stringify(res.data.data))
      setUsers(res.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const onUpdate = useCallback(
    (data) => () => {
      const userData = { ...data, isUpdate: true };
      navigate('/createUser', { state: { userData } });
    },
    [navigate],
  );

  const onDelete = useCallback(
    (data) => async () => {
      console.log('data', JSON.stringify(data));
      try {
        const res = await axios.delete(
          `http://localhost:4000/v1/user/delete-user/${data?.id}`,
        );
        console.log('Delete res', JSON.stringify(res));
        if (res?.data?.status === 'OK') {
          alert(`"${data?.description}" Delete SuccessFully`);
          fetchUsers();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

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
        {users?.map((data, index) => (
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
                <Button
                  variant="outline-warning"
                  style={{ marginLeft: 10 }}
                  onClick={onUpdate(data)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  style={{ marginLeft: 10 }}
                  onClick={onDelete(data)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default UserList;
