import React, { useState } from 'react';

function CredentialTable({ name }) {
    const [isChecked, setIsChecked] = useState(
        <>
            <input type='checkbox' className='btn-check' id='btn-check-outlined' autoComplete='off' checked />
            <label className='btn btn-outline-danger' htmlFor='btn-check-outlined'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                    <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z' />
                </svg>
            </label>
        </>
    );

    const handleButtonClick = () => {
        setIsChecked(
            <>
                <input type='checkbox' className='btn-check' id='btn-check-outlined' autoComplete='off' checked style={{ width: '5%', height: '2%' }} />
                <label className='btn btn-outline-success' htmlFor='btn-check-outlined'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-check2' viewBox='0 0 16 16'>
                        <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0' />
                    </svg>
                </label>
            </>
        );
    };

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <table className="table">
                
                <tbody>
                    <tr>
                        <td style={{ paddingTop: "1.5%", width: "auto", background: "#EBEBEB" }}>{name}</td>
                        <td style={{ width: "5%", background: "#EBEBEB" }}><button className="btn btn-primary" type="button" onClick={handleButtonClick}>verify</button></td>
                        <td style={{ width: "5%", background: "#EBEBEB" }}><button className="btn material-symbols-outlined" type="button">visibility</button></td>
                        <td style={{ paddingTop: "1.25%", paddingLeft: "1.5%", width: "5%", background: "#EBEBEB" }}>
                            {isChecked}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default CredentialTable;
