function AccordionTable({ name, surname, email, program }) {
    return (
        <>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Name</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Surname</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Email</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Program</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ background: "#EBEBEB" }}>{name}</td>
                        <td style={{ background: "#EBEBEB" }}>{surname}</td>
                        <td style={{ background: "#EBEBEB" }}>{email}</td>
                        <td style={{ background: "#EBEBEB" }}>{program}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default AccordionTable;
