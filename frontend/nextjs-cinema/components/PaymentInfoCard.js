function PaymentInfoCard(props) {
    return <tr>
        <td contentEditable='true'> {props.number}</td>
        <td contentEditable='true'> {props.type}</td>
        <td contentEditable='true'> {props.expiry}</td>       
        <td contentEditable='true'> {props.address}</td>
        <td><button>❌</button></td>
    </tr>;
}
 
export default PaymentInfoCard;