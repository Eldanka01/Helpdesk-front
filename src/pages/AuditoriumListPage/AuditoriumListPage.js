import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react"; 
import QRCodeGenerator from "qrcode";
import './auditorium-list-page.css'

function AuditoriumListPage() {
    const [auditoriums, setAuditoriums] = useState([]);

    useEffect(() => {
        const fetchAuditoriums = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/auditoriums/');
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных об аудиториях');
                }
                const data = await response.json();
                setAuditoriums(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAuditoriums();
    }, []);

    const handleDownloadQR = async (auditorium) => {
        const canvas = document.createElement("canvas");
        const url = `http://${window.location.host}/add-request?auditoriumNumber=${auditorium.id}`;
        await QRCodeGenerator.toCanvas(canvas, url, { width: 200 });
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR_${auditorium.number}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="container mt-4">
            <h1>Список аудиторий</h1>
            <div className="row mt-4">
                {auditoriums.map(auditorium => (
                    <div key={auditorium.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Аудитория №{auditorium.number}</h3>
                                <div className="mb-3">
                                    <QRCode value={`http://${window.location.host}/add-request?auditoriumNumber=${auditorium.id}`} />
                                </div>
                                <button onClick={() => handleDownloadQR(auditorium)} className="btn btn-secondary">
                                    Скачать QR
                                </button>
                                <Link to={`/add-request?auditoriumNumber=${auditorium.id}`} className="btn btn-primary">
                                    Добавить заявку
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AuditoriumListPage;
