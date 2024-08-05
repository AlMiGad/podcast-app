import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router";

//MATERIAL UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

//APP COMPONENTS
import PodcastInfo from '../components/PodcastInfo';
import EpisodesTable from '../components/EpisodesTable';

const PodcastEpisodesCount = styled.h3`
    font-weight: 700;
    font-size: 1.25em;
    margin: 0;
`;

function Podcast(props) {
    const params = useParams();
    const podcastId = params.podcastId;

    const [podcastEpisodes, setPodcastEpisodes] = useState([]);
    const [podcastData, setPodcastData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // Decidiremos si es necesario hacer la peticion a la API de APPLE
        // si no es necesario recuperamos los datos del local storage

        props.handleLoading(true); //Activamos el icono de carga

        //Obtenemos la informacion del podcast alojada en el local storage
        const podcastData = JSON.parse(localStorage.getItem("podcastsData"))["p-" + podcastId];
        setPodcastData(podcastData);

        if (necessaryUpdate(podcastId)) {
            // Definir la URL para la llamada a la API
            const corsUrl = 'https://itunes.apple.com/lookup?id=' + podcastId + '&media=podcast&entity=podcastEpisode&limit=20';
            const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent(corsUrl);

            // Función para obtener los datos
            const fetchPodcastEpisodes = async () => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    const dataContent = JSON.parse(data.contents);

                    const organizedEpisodes = organizeEpisodes(dataContent.results);

                    //Se guarda en el estado los episodios del podcast
                    setPodcastEpisodes(organizedEpisodes);

                    //Guardamos los datos en el local storage
                    const todayString = (new Date()).toISOString().split('T')[0]; // Formato YYYY-MM-DD
                    localStorage.setItem("p-" + podcastId, JSON.stringify({ episodes: organizedEpisodes, lastUpdate: todayString }));

                } catch (error) {
                    console.log(error);
                } finally {
                    //FINALIZAR CARGA
                    props.handleLoading(false);
                    setLoading(false);
                }
            };

            fetchPodcastEpisodes();

        } else {
            let podcastFromMemory = JSON.parse(localStorage.getItem("p-" + podcastId));
            //Rescatamos los datos desde el local storage
            setPodcastEpisodes(podcastFromMemory.episodes);

            //FINALIZAR CARGA
            props.handleLoading(false);
            setLoading(false);
        }

        document.title = podcastData["im:name"].label + " in Podcaster";

    }, []);


    return (
        <div>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid key={"podcast-info"} item xs={4}>
                    <Card>
                        <CardContent>
                            {
                                !loading &&
                                    <PodcastInfo
                                        podcastName={podcastData["im:name"].label}
                                        podcastImage={podcastData["im:image"][2].label}
                                        podcstArtist={podcastData["im:artist"].label}
                                        podcstDescription={podcastData.summary.label}
                                    />
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid key={"podcast-episodesCount"} item container xs={8} spacing={2}>
                    <Grid key={"podcast-episodes-count"} item xs={12}>
                        <Card>
                            <CardContent>
                                {
                                    !loading &&
                                    <PodcastEpisodesCount>
                                        Episodes: {Object.values(podcastEpisodes).length}
                                    </PodcastEpisodesCount>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid key={"podcast-episodes"} item xs={12}>
                        <Card>
                            <CardContent>
                                <EpisodesTable episodes={podcastEpisodes} podcastId={podcastId}/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

function necessaryUpdate(podcastId) {
    let podcastKey = "p-" + podcastId;
    let podcastFromMemory = JSON.parse(localStorage.getItem(podcastKey));
    let necessaryUpdate = true;

    if (podcastFromMemory) {
        const storedDate = new Date(podcastFromMemory.lastUpdate);
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
        const diffInDays = Math.floor((currentDate - storedDate) / oneDay);

        if (diffInDays >= 1) {
            console.log('PODCAST EPISODES: Ha pasado al menos un día desde la fecha almacenada: ', diffInDays);
        } else {
            console.log('PODCAST EPISODES: No ha pasado un día desde la fecha almacenada: ', diffInDays);
            necessaryUpdate = false;
        }
    }

    return necessaryUpdate;
}

function organizeEpisodes(rawEpisodes) {

    let organizedEpisodes = {};

    rawEpisodes.forEach(rawEpisode => {
        if(rawEpisode.wrapperType === "podcastEpisode"){
            organizedEpisodes = { ...organizedEpisodes, ["e-" + rawEpisode.trackId] : rawEpisode };
        }
        
    });

    return organizedEpisodes;
}

export default Podcast;