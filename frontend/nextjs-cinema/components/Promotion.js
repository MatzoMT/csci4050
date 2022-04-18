import axios from 'axios';
import { useRouter } from 'next/router';


function Promotion(props) {
    const router = useRouter();

    return <tr>
        <td> {props.promotionCode} </td>
        <td> {props.promotionDiscount}</td>
        <td> {props.promotionExpiration}</td>
    </tr>;
}
export default Promotion