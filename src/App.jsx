import { useState } from "react";
import { UseMultistepForm } from "./components/UseMultistepForm";
import { UserForm } from "./components/UserForm";
import { ThankYouForm } from "./components/ThankYouForm";
import "../src/styles/App.css";
import { useAddHiddenInputs } from "./scripts/Hidden";
import { MoreInfo } from "./components/MoreInfo";

const INITIAL_DATA = {
  dataLog: "",
  dataPhone: "",
  dataEmailTemplate: "iswiadectwa.pl.php",
  dataSMSTemplate: "iswiadectwa.pl.php", 
  "dataValues[serviceDataType]": 574, 
  "dataValues[serviceClientChannel]": 39,
  "dataValues[serviceDataAddressCityText]": "",
  "dataValues[serviceDataAddress]": "",
  "dataValues[serviceDataCity]": "",
  "dataValues[serviceDataArea]": "",
  "dataValues[serviceHomeType]": "",
  "dataValues[serviceDataServiceDate]": "",
  "dataValues[serviceClientClientHasFloorPlan]": "",
  dataUpdateEmail: "",
  docs: "",
  submit: 1,
  tips: "",
  street: "",
};

export const App = () => {
  const [data, setData] = useState(INITIAL_DATA);

  useAddHiddenInputs("my-form", []);

  const hiddensObj = {};

  setTimeout(() => {
    const hiddens = document.querySelectorAll("input[type='hidden']");
    hiddens.forEach((hidden) => {
      hiddensObj[hidden.name] = hidden.value;
    });
  }, 1);

  function updateFields(fields) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { isFirstStep, step, isLastStep, next } = UseMultistepForm([
    <UserForm key={1} {...data} updateFields={updateFields} />,
    <MoreInfo key={2} updateFields={updateFields} />,
    <ThankYouForm key={3} {...data} updateFields={updateFields} />,
  ]);

  function onSubmit(e) {
    e.preventDefault();

    if (isFirstStep) {
      const formData = { ...data, ...hiddensObj };
      console.log({ formData });
      fetch(
        "https://system.pewnylokal.pl/crm/api/newEndpoint.php?format=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setData({
            clientHash: data.hash,
            submit: 1,
            dataEmailTemplate: "odbiorywarszawa.pl.php",
          });
          console.log("Endpoint Success: ", data);
        })
        .catch((error) => {
          console.error("Endpoint Error: ", error);
        });
      next();
      setData({
        dataEmailTemplate: "odbiorywarszawa.pl.php",
        clientHash: data.clientHash,
        submit: 1,
      });
    } else if (!isLastStep) {
      console.log(data);
      fetch(
        "https://system.pewnylokal.pl/crm/api/updateClientData.php?format=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => {
          response.json();
        })
        .then((data) => {
          console.log("UpdateClientData Success: ", data);
        })
        .catch((error) => {
          console.error("UpdateClientData Error: ", error);
        });
      next();
      setData({
        dataEmailTemplate: "",
        clientHash: data.clientHash,
        submit: 1,
      });
    }
  }

  return (
    <>
      <nav>
        <img src="/img/warszawa.svg" alt="logo odbiorów mieszkań warszawa" />
      </nav>
      <div className="container">
        <div className="container-info">
          <h2>Formularz kontaktowy</h2>
          <p>
            Odpowiedz na kilka prostych pytań, a my skontaktujemy się z Tobą w
            celu ustalenia szczegółów.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-content">
            <div className="form-grid">{step}</div>
          </div>
          {isLastStep ? (
            <></>
          ) : (
            <div className="btn-container">
              <button className="btn-main" type="submit">
                {isFirstStep ? "Dalej" : "Zamów"}
              </button>
            </div>
          )}{" "}
        </form>
      </div>
    </>
  );
};
