import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

//MATERIAL UI
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

const Wrapper = styled.div`
    padding: 18px 0;
    border-bottom: 1px solid #d6d6d6;
    background-color: white;
    font-weight: 700;
    font-size: 1.3em;
    a{
      color: #157b9b;
      text-decoration: none
    }
  `;
  const AppContent = styled.div`
    padding: 36px 0;
  `;

function Dashboard({ loading, children }) {

  return (
    <div>
      <Wrapper>
        <Container>
          <Grid container spacing={2}>
            <Grid key={"app-title-gird"} item xs={8}>
              <Link to="/">Podcaster</Link>
            </Grid>
            <Grid key={"app-title-tools"} item xs={4} container justifyContent="flex-end" alignItems="center">
              {loading && <div className="loader"></div>}
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
      <AppContent>
        <Container>
          {children}
        </Container>
      </AppContent>
    </div>
  );

}

export default Dashboard;