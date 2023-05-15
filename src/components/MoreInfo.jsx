import { useRef, useState } from "react";
import { FormWrapper } from "./FormWrapper";

export function MoreInfo({ 
  serviceDataArea,
  updateFields,
  serviceDataAddress,
}) {
  const [, setStartDate] = useState(new Date());
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setStartDate(e.target.value);
    updateFields({ "dataValues[serviceDataServiceDate]": e.target.value });
  };

  return (
    <FormWrapper title="Dane kontaktowe">
      <>
        <div className="form-item">
          <label className="legal-label" htmlFor="serviceDataArea">
            Metraż
          </label>
          <input
            type="number"
            name="serviceDataArea"
            id="serviceDataArea"
            min={1}
            max={10000}
            className="legal-input"
            value={serviceDataArea}
            onChange={(e) =>
              updateFields({
                "dataValues[serviceDataArea]": e.target.value,
              })
            }
          />
        </div>

        <div className="form-item">
          <label className="legal-label" htmlFor="address">
            Adres
          </label>
          <input
            id="address"
            className="legal-input"
            type="text"
            name="address"
            value={serviceDataAddress}
            onChange={(e) =>
              updateFields({ "dataValues[serviceDataAddress]": e.target.value })
            }
          />
        </div>
        <div className="form-item">
          <label className="legal-label" htmlFor="date">
            Data
          </label>

          <input
            type="date"
            className="legal-input"
            name="date"
            id="date"
            autoFocus
            onChange={handleChange}
            ref={dateInputRef}
          />
        </div>
      </>
    </FormWrapper>
  );
}
