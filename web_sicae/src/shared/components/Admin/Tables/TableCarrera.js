import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { Form_Carreer } from "../Forms/Form_Carreer";

export const TablesCarrera = () => {
    //Consumo Api
    const URL = `http://localhost:8080/api/career/`
    const [Carrera, setCarrera] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [idCarrera, setIdCarrera] = useState(null)
    const [state, setState] = useState(false)

    useEffect(() => {
        fetch(URL).then((response) => { return response.json() })
            .then((data) => {
                console.log(data.data);
                setCarrera(data.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    }, [])

    return (
        <>
            <div className="container-fluid mt-3">
                <Table striped bordered hover>
                    <thead style={styles.TableThead}>
                        <tr style={styles.TableCabecera}>
                            <th>#</th>
                            <th>Acronimo</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody style={styles.Text}>
                        {Carrera.map((carrera) => (
                            <tr>
                                <td>{carrera.id}</td>
                                <td>{carrera.acronim}</td>
                                <td>{carrera.name}</td>
                                <td>
                                    <FaRegEdit style={styles.Icon} onClick={()=>(setModalShow(true),setIdCarrera(carrera.id),setState(true))} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <a onClick={() => (setModalShow(true),setIdCarrera(null))} className="btn-flotante">Registrar</a>
            <Form_Carreer
                id={idCarrera}
                state={state}
                show={modalShow}
                onHide={()=> (setModalShow(false),setIdCarrera(null),setState(false))}
                onState={()=> (setState(false))}
            />
        </>
    )
}

const styles = {
    TableThead: {
        backgroundColor: "#255770",
        padding: "100px",
    },
    TableCabecera: {
        color: "white",
        fontSize: "15px",
        fontWeight: "SemiBold",
        fontfamily: "Inter",
        textAlign: "center",
    },
    Text: {
        fontfamily: "Inter",
        fontSize: "15px",
        fontWeight: "SemiBold",
        textAlign: "center",
    },
    Icon: {
        height: "auto",
        width: "30px",
        marginRight: "10px",
    },
}