import { useEffect, useState } from "react";
import { UseMultistepForm } from "./components/UseMultistepForm";
import { UserForm } from "./components/UserForm";
import { ThankYouForm } from "./components/ThankYouForm";
import "../src/styles/App.css";
import { useAddHiddenInputs } from "./scripts/Hidden";
import { MoreInfo } from "./components/MoreInfo";

const INITIAL_DATA = {
  dataLog: "",
  dataPhone: "",
  dataEmailTemplate: "swiadectwa365.pl.php",
  dataSMSTemplate: "swiadectwa365.pl.php",
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

  // Callback function to update data state
  const updateData = (newData) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useAddHiddenInputs("my-form", updateData);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get("hash");
    if (hash) {
      setData((prevData) => ({
        ...prevData,
        clientHash: hash,
      }));
      next(); // Move to the next step if hash is present
    }
  }, []);

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
      const formData = { ...data };
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
            dataEmailTemplate: "swiadectwa365.pl.php",
          });
          console.log("Endpoint Success: ", data);
        })
        .catch((error) => {
          console.error("Endpoint Error: ", error);
        });
      next();
      setData({
        dataEmailTemplate: "swiadectwa365.pl.php",
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

  console.log({ step });

  return (
    <>
      <nav>
        <a href="/">
          <img src="logo.svg" alt="" />
        </a>
      </nav>
      <div className={`${step.key !== "1" ? "pt-0" : ""} container`}>
        <div className={`${step.key === "1" ? "" : "d-none"} container-info`}>
          <h2>Formularz kontaktowy</h2>
          <p>
            Odpowiedz na kilka prostych pytań, a my skontaktujemy się z Tobą w
            celu ustalenia szczegółów.
          </p>
        </div>
        <form onSubmit={onSubmit} id="my-form">
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
