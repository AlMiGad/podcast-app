import { useParams } from "react-router";
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

//MATERIAL UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

//APP COMPONENTS
import PodcastInfo from '../components/PodcastInfo';

const EpisodeTitle = styled.h1`
    font-weight: 700;
    font-size: 1.3em;
`;
const EpisodeDescription = styled.p`
    font-style: italic;
    font-weight: normal;
`;

function Episode( props ){

    const params = useParams();
    const podcastId = params.podcastId;
    const episodeId = params.episodeId;
    
    const [podcastData, setPodcastData] = useState({});
    const [episodeData, setEpisodeData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        props.handleLoading(true); //Activamos el icono de carga

        //Obtenemos la informacion del podcast alojada en el local storage
        const podcastData = JSON.parse(localStorage.getItem("podcastsData"))["p-" + podcastId];
        setPodcastData(podcastData);

        const episodeData = JSON.parse(localStorage.getItem("p-" + podcastId)).episodes["e-" + episodeId];
        setEpisodeData(episodeData);

        document.title = episodeData.trackName + " - " + podcastData["im:name"].label + " in Podcaster";

        props.handleLoading(false); //Activamos el icono de carga
        setLoading(false);

        

    }, []);

    return(
        
        <div>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid key={"podcast-info"} item xs={4}>
                    <Card>
                        <CardContent>
                            {
                                !loading &&
                                    <PodcastInfo
                                        podcastLinkId={podcastId}
                                        podcastName={podcastData["im:name"].label}
                                        podcastImage={podcastData["im:image"][2].label}
                                        podcstArtist={podcastData["im:artist"].label}
                                        podcstDescription={podcastData.summary.label}
                                    />
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid key={"podcast-episodesCount"} item xs={8} spacing={2}>
                    <Card>
                        <CardContent>
                            {
                                !loading &&
                                    <div>
                                        <EpisodeTitle>{episodeData.trackName}</EpisodeTitle>
                                        <EpisodeDescription dangerouslySetInnerHTML={{ __html: episodeData.description }}></EpisodeDescription>
                                        <audio controls style={{width: "100%"}}>
                                            <source src={episodeData.episodeUrl} type="audio/mp3" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );

}

export default Episode;