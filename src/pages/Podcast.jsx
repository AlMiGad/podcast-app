import React, { useState, useEffect } from 'react';
//Router
import { useParams } from "react-router";


function Podcast(){
    const params = useParams();
    console.log(params.podcastId);
    return(
        <h2>Estas viendo un podcast.</h2>
    );
}

export default Podcast;