import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image'


function MovieInfo(props) {
    const router = useRouter();

    return <tr>
        <td> {props.title} </td>
        {/*<td contentEditable='true'> {props.number}</td>*/}
        <td> <Image src={require("../images/" + props.imageSource)} height={300} width={200} /></td>
        <td> {props.genres}</td>
        <td> {props.rating}</td>
        <td> {props.director}</td>
        <td> {props.description}</td>
        <td> {props.videoLink}</td>
        <td> {props.cast}</td>

        <td><button type="submit" onClick={() => {
            axios.post("http://localhost:8000/api/v1/delete-movie", { title: props.title}).then((response) => {
                alert("Movie has been deleted.");
                router.reload()
            });
        }}>❌</button></td>
    </tr>;
}

export default MovieInfo;