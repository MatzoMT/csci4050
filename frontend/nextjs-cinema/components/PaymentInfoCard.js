import axios from 'axios';
import { useRouter } from 'next/router';



function deletePayment(cardNumber) {
    axios.post("http://localhost:8000/api/v1/delete-payment", { cardNumber: "3141592653" }).then((response) => {
        alert("Payment method has been deleted.");
    });
};

function PaymentInfoCard(props) {
    const router = useRouter();

    return <tr>
        <td contentEditable='true'> {props.lastDigits} </td>
        {/*<td contentEditable='true'> {props.number}</td>*/}
        <td contentEditable='true'> {props.type}</td>
        <td contentEditable='true'> {props.expiry}</td>
        <td contentEditable='true'> {props.address}</td>
        <td><button type="submit" onClick={() => {
            axios.post("http://localhost:8000/api/v1/delete-payment", { cardNumber: props.number, lastDigits: props.lastDigits}).then((response) => {
                alert("Payment method has been deleted.");
                router.reload()
            });
        }}>❌</button></td>
    </tr>;
}

export default PaymentInfoCard;