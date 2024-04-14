import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const [topicsData, setTopicsData] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [levelData, setLevelsData] = useState([]);
  const [description, setDescription] = useState(
    userData?.isUpdate ? userData?.description : '',
  );
  const [url, setUrl] = useState(userData?.isUpdate ? userData?.url : '');
  const [types, setTypes] = useState(
    userData?.isUpdate ? userData?.types : null,
  );
  const [topic, setTopic] = useState(
    userData?.isUpdate ? userData?.topics : null,
  );
  const [levels, setLevels] = useState(
    userData?.isUpdate ? userData?.levels : null,
  );
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        'http://localhost:4000/v1/user/get-all-users',
      );
      res?.data?.data?.forEach((e) => {
        topicsData.push(e?.topics?.toString());
        setTopicsData([...new Set(topicsData.filter((item) => item))]);
        typesData.push(e?.types?.toString());
        setTypesData([...new Set(typesData.filter((item) => item))]);
        levelData.push(e?.types?.toString());
        setLevelsData([...new Set(levelData.filter((item) => item))]);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const submitForm = useCallback(
    async (event) => {
      const addUserPayload = {
        description: description,
        url: url,
        types: [types],
        topics: [topic],
        levels: [levels],
      };
      console.log(`addUserPayload ${JSON.stringify(addUserPayload)}`);
      try {
        const res = await axios.post(
          'http://localhost:4000/v1/user/add-user',
          addUserPayload,
        );
        console.log('post res', JSON.stringify(res));
        if (res?.data?.status === 'OK') {
          setDescription(null);
          setUrl(null);
          setTypes(undefined);
          setTopic(undefined);
          setLevels(undefined);
          alert(res?.data?.message);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    },
    [description, levels, topic, types, url],
  );
  const upDateForm = useCallback(
    async (event) => {
      const updateUserPayload = {
        description: description,
        url: url,
        types: [types],
        topics: [topic],
        levels: [levels],
      };
      console.log(`updateUserPayload ${JSON.stringify(updateUserPayload)}`);
      try {
        const res = await axios.put(
          `http://localhost:4000/v1/user/update-user/${userData?.id}`,
          updateUserPayload,
        );
        console.log('update res', JSON.stringify(res));
        if (res?.data?.status === 'OK') {
          alert(res?.data?.message);
          navigate('/');
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    },
    [description, levels, navigate, topic, types, url, userData?.id],
  );
  return (
    <>
      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Form>
              <Form.Group className="mb-3 mt-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e?.target?.value)}
                  value={description}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Url"
                  onChange={(e) => setUrl(e?.target?.value)}
                  value={url}
                />
              </Form.Group>
              <DropdownButton
                style={{ width: 100 }}
                className="mb-3"
                variant="success"
                title={types?.length > 0 ? types : 'Types'}
                defaultValue={userData?.isUpdate ? userData?.types : null}
                onSelect={(e) => setTypes(e)}
              >
                {typesData?.map((e, i) => (
                  <Dropdown.Item
                    key={i}
                    eventKey={e}
                    style={{
                      position: 'sticky',
                      height: 40,
                      width: 250,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {e}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                className="mb-3"
                variant="success"
                title={topic?.length > 0 ? topic : 'Topics'}
                onSelect={(e) => setTopic(e)}
              >
                {topicsData?.map((e, i) => (
                  <Dropdown.Item
                    key={i}
                    eventKey={e}
                    style={{
                      position: 'sticky',
                      height: 40,
                      width: 500,
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    {e}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                className="mb-3"
                variant="success"
                title={levels?.length > 0 ? levels : 'Levels'}
                onSelect={(e) => setLevels(e)}
              >
                {levelData?.map((e, i) => (
                  <Dropdown.Item
                    key={i}
                    eventKey={e}
                    style={{
                      position: 'sticky',
                      alignContent: 'center',
                      height: 40,
                      width: 200,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {e}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              {userData?.isUpdate ? (
                <Button variant="primary" onClick={upDateForm}>
                  {'Update User'}
                </Button>
              ) : (
                <Button variant="primary" onClick={submitForm}>
                  {'Add User'}
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;
