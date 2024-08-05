import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

//MATERIAL UI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const styles = {
    podcastCard: {
        marginTop: "75px",
        overflow: "visible"
    },
    podcastCardContent: {
        textAlign: "center",
    }
}

const PodcastTitle = styled.h2`
        text-transform: uppercase;
        font-weight: 700;
        font-size: 1.1em;
        color: #157b9b;
    `;
const PodcastAuthor = styled.p`
        color: #7d7d7d;
        font-size: 0.9em;
    `;
const PodcastImage = styled.img`
        width: 125px;
        height: 125px;
        border-radius: 100%;
        margin: -70px auto 0 auto;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;

    `;

function PodcastCard({ podcast }) {
    return (
        <Link to={"/podcast/" + podcast["id"].attributes["im:id"]}>
            <Card sx={styles.podcastCard}>
                <CardContent sx={styles.podcastCardContent}>
                    <PodcastImage alt={podcast["im:name"].label + " Image"} src={podcast["im:image"][2].label}></PodcastImage>
                    <PodcastTitle>{podcast["im:name"].label}</PodcastTitle>
                    <PodcastAuthor>Author: {podcast["im:artist"].label}</PodcastAuthor>
                </CardContent>
            </Card>
        </Link>
    );
}

function Home(props) {

    const [podcasts, setPodcasts] = useState([]);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        // Decidiremos si es necesario hacer la peticion a la API de APPLE
        // si no es necesario recuperamos los datos del local storage

        document.title = "Podcaster - Enjoy Podcasts";
        props.handleLoading(true); //Activamos el icono de carga

        if (necessaryUpdate()) {

            // Definir la URL para la llamada a la API
            const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

            // Función para obtener los datos
            const fetchPodcasts = async () => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();

                    //Organizamos los podcasts en base a su id para optimizar la busqueda
                    let organizedPodcasts = organizePodcasts(data.feed.entry);
                    localStorage.setItem("podcastsData", JSON.stringify(organizedPodcasts));
                    //Actualizamos la fecha de actualizacion
                    const todayString = (new Date()).toISOString().split('T')[0]; // Formato YYYY-MM-DD
                    localStorage.setItem("lastUpdate", todayString);

                    setPodcasts(organizedPodcasts);

                } catch (error) {
                    console.log(error);
                }
            };

            fetchPodcasts();

        } else {

            setPodcasts(JSON.parse(localStorage.getItem("podcastsData")));

        }

        props.handleLoading(false);// Deja de mostrar el spinner cuando los datos estén listos

    }, [props]);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid key={"podcast-search"} item xs={12} container justifyContent="flex-end">
                    <TextField
                        sx={{ width: 380 }}
                        id="outlined-basic"
                        label="Filter Podcast"
                        variant="outlined"
                        value={filterText}
                        onChange={(e) => {
                            //Seteamos el valor de la busqueda
                            setFilterText(e.target.value);
                        }}
                    />
                </Grid>
                {
                    podcasts && Object.values(podcasts).map((podcast, index) => {
                        //Filtro sencillo para filtrar por nombre y autor
                        if (filterText === "" || (filterText !== "" && (textContains(podcast["im:name"].label, filterText) || textContains(podcast["im:artist"].label, filterText)))) {
                            return (
                                <Grid key={"podcast-" + index} item xs={3}>
                                    <PodcastCard podcast={podcast}></PodcastCard>
                                </Grid>
                            );
                        }

                    })
                }
            </Grid>
        </div>

    );
}

function textContains(string, search) {
    return string.toLowerCase().includes(search.toLowerCase());
}

function necessaryUpdate() {
    let lastUpdate = localStorage.getItem("lastUpdate");
    let necessaryUpdate = true;

    if (lastUpdate) {
        const storedDate = new Date(lastUpdate);
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
        const diffInDays = Math.floor((currentDate - storedDate) / oneDay);

        if (diffInDays >= 1) {
            console.log('Ha pasado al menos un día desde la fecha almacenada.');
        } else {
            console.log('No ha pasado un día desde la fecha almacenada.');
            necessaryUpdate = false;
        }
    }

    return necessaryUpdate;
}

function organizePodcasts(rawPodcasts) {

    let organizedPodcasts = {};

    rawPodcasts.forEach(rawPodcast => {
        organizedPodcasts = { ...organizedPodcasts, ["p-" + rawPodcast["id"].attributes["im:id"]]: rawPodcast };
    });

    return organizedPodcasts;
}

export default Home;