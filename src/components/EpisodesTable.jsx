import { Link } from "react-router-dom";

//MATERIAL UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function EpisodesTable({ episodes, podcastId }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 800}}>Title</TableCell>
                        <TableCell style={{fontWeight: 800}}>Date</TableCell>
                        <TableCell style={{fontWeight: 800}}>Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(episodes).map((episode, index) => (
                        
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={"/podcast/" + podcastId + "/episode/" + episode.trackId}>{episode.trackName}</Link>
                            </TableCell>
                            <TableCell align="right">{formatDate(episode.releaseDate)}</TableCell>
                            <TableCell align="right">{formatDuration(episode.trackTimeMillis)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

function formatDuration(milliseconds) {
    // Calcular los segundos totales, minutos y horas
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    // Asegurarse de que las horas, minutos y segundos tengan siempre dos dígitos
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    // Formatear la duración como HH:MM:ss
    return `${hours}:${minutes}:${seconds}`;
}

function formatDate(isoDate) {
    // Crear un objeto Date a partir del string ISO
    let date = new Date(isoDate);

    // Obtener el día, mes y año
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1; // Los meses en JavaScript son de 0 a 11
    let year = date.getUTCFullYear();

    // Asegurarse de que el día y el mes tengan siempre dos dígitos
    day = day.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');

    // Formatear la fecha como día/mes/año
    return `${day}/${month}/${year}`;
}

export default EpisodesTable;