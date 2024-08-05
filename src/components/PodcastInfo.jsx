import { Link } from "react-router-dom";
import styled from 'styled-components';

const PodcastImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 4px;
    margin-top: 15px;
`;
const Separator = styled.hr`
    border: 1px solid #eee;
    margin: 25px 0;
`;
const PodcastTitle = styled.h2`
    font-weight: 700;
    color: black;
    margin-bottom: 5px;
    font-size: 1.25em;
`;
const PodcastAuthor = styled.h3`
    font-style: italic;
    font-weight: normal;
    color: black;
    font-size: 1em;
    margin-top: 0px;
`;
const PodcastDescription = styled.p`
    & > b {
        display: block;
        margin-bottom: 10px;
    }
`;

const PodcastInfo = ({ podcastName, podcastImage, podcstArtist, podcstDescription, podcastLinkId }) => {
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                {
                    podcastLinkId ? 
                        <Link to={"/podcast/" + podcastLinkId}><PodcastImage alt={podcastName + " Image"} src={podcastImage}></PodcastImage></Link>
                    :
                        <PodcastImage alt={podcastName + " Image"} src={podcastImage}></PodcastImage>
                }
                
            </div>
            <Separator />
            {
                podcastLinkId ? 
                    <Link to={"/podcast/" + podcastLinkId}>
                        <PodcastTitle>{podcastName}</PodcastTitle>
                    </Link>
                :
                    <PodcastTitle>{podcastName}</PodcastTitle>
            }
            {
                podcastLinkId ? 
                    <Link to={"/podcast/" + podcastLinkId}>
                        <PodcastAuthor>by: {podcstArtist}</PodcastAuthor>
                    </Link>
                :
                    <PodcastAuthor>by: {podcstArtist}</PodcastAuthor>
            }
            <Separator />
            <PodcastDescription>
                <b>Description:</b>
                <i>{podcstDescription}</i>
            </PodcastDescription>
        </div> 
    )
}

export default PodcastInfo;