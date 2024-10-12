import { MdDelete } from "react-icons/md";
function StatsRes({ srNo, name, url, shortened, onDelete }) {
    return (
        <tr>
            <td>{srNo}</td>
            <td>{name}</td>
            <td>{shortened}</td>
            <td>{url}</td>
            <td><MdDelete className="del-url" onClick={onDelete} /></td>
        </tr>
    );
}

export default StatsRes;