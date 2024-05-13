import { FormWrapper } from "./FormWrapper";

export function MoreInfo({
  serviceDataArea,
  updateFields,
  serviceDataAddress,
  serviceClientClientHasFloorPlan,
  dataUpdateEmail,
}) {
  return (
    <FormWrapper title="Dane kontaktowe">
      <>
        <div className="form-item">
          <label className="legal-label" htmlFor="dataUpdateEmail">
            E-mail (opcjonalnie)
          </label>
          <input
            id="dataUpdateEmail"
            type="email"
            className="legal-input"
            name="dataUpdateEmail"
            value={dataUpdateEmail}
            onChange={(e) =>
              updateFields({
                dataUpdateEmail: e.target.value,
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
          <label
            className="legal-label"
            htmlFor="serviceClientClientHasFloorPlan"
          >
            Czy masz rzut nieruchomości?
          </label>
          <select
            className="legal-input"
            id="serviceClientClientHasFloorPlan"
            name="serviceClientClientHasFloorPlan"
            value={serviceClientClientHasFloorPlan}
            onChange={(e) =>
              updateFields({
                "dataValues[serviceClientClientHasFloorPlan]": e.target.value,
              })
            }
          >
            <option value="">Wybierz</option>
            <option value="590">Tak</option>
            <option value="589">Nie</option>
          </select>
        </div>
      </>
    </FormWrapper>
  );
}
