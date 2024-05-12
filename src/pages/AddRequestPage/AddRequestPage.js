import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import InputMask from "react-input-mask";
import './add-request-page.css'

const apiUrl = process.env.REACT_APP_API_URL;

function AddRequestPage() {
  const [searchParams] = useSearchParams();
  const auditoriumInfo = searchParams.get("auditoriumInfo");
  const [auditoriumId, auditoriumNumber] = auditoriumInfo.split("-");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiUrl}/api/helpdesk-requests/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auditorium_number: auditoriumId,
            description: description,
            creator: creator,
            phone_number: phoneNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных");
      }

      const data = await response.json();
      console.log("Запись успешно создана:", data);
      setSuccess(true);
      setError("");
      setCreator("");
      setDescription("");
      setPhoneNumber("");
      setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 5000);
    } catch (error) {
      console.error("Ошибка при создании заявки:", error);
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Заявка успешно создана! Ожидайте специалиста</div>}
      <form onSubmit={handleSubmit} className="needs-validation add-request-form" noValidate>
      <h2 className="text-center">Создание заявки</h2>
      <h6 className="text-center">Аудитория № {auditoriumNumber}</h6>
        <div className="mb-3">
          <label htmlFor="creator" className="form-label">Имя</label>
          <input
            type="text"
            className="form-control"
            id="creator"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Номер телефона</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phoneNumber"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Описание проблемы</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
    </div>
  );
}

export default AddRequestPage;
