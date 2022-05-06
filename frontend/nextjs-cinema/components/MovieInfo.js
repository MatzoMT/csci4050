import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image'


function MovieInfo(props) {
    const router = useRouter();

    const editMovie = (movieId) => {
      router.push({
        pathname: '/admin-movieinfo',
        query: { "movieId": movieId },
      })
    }



    return <tr onClick={() => editMovie(props.id)}>
        <td> {props.title} </td>
        {/*<td contentEditable='true'> {props.number}</td>*/}
        <td> <Image src={require("../images/" + props.imageSource)} height={300} width={200} /></td>
        <td> {props.genres}</td>
        <td> {props.rating}</td>
        <td> {props.director}</td>
        <td> {props.description}</td>
        <td> {props.videoLink}</td>
        <td> {props.cast}</td>

    </tr>;
}

export default MovieInfo;