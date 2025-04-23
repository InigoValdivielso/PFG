function AccordionTable({ name, surname, email, program }) {
    return (
        <>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Nombre</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Apellido</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Correo</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Curso</th>
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
