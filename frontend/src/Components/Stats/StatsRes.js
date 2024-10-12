function StatsRes({ srNo, key, name, url, shortened }) {
    return (
        <tr>
            <td>{srNo}</td>
            <td>{name}</td>
            <td>{shortened}</td>
            <td>{url}</td>
        </tr>
    );
}

export default StatsRes;