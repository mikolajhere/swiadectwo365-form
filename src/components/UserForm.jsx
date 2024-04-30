import { FormWrapper } from "./FormWrapper";

export function UserForm({
  dataPhone,
  updateFields,
  serviceHomeType,
  dataUpdateEmail,
}) {
  return (
    <FormWrapper title="Dane kontaktowe">
      <>
        <div className="form-item">
          <label className="legal-label" htmlFor="phone">
            Telefon
          </label>
          <input
            className="legal-input"
            type="tel"
            name="dataPhone"
            id="phone"
            required
            minLength={9}
            maxLength={14}
            value={dataPhone}
            onChange={(e) => updateFields({ dataPhone: e.target.value })}
          />
        </div>

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
          <label className="legal-label" htmlFor="serviceHomeType">
            Typ nieruchomości
          </label>
          <select
            className="legal-input"
            id="serviceHomeType"
            name="serviceHomeType"
            value={serviceHomeType}
            required
            onChange={(e) =>
              updateFields({ "dataValues[serviceHomeType]": e.target.value })
            }
          >
            <option value="">Wybierz</option>
            <option value="390">Mieszkanie (NIE lokal użytkowy)</option>
            <option value="391">Dom</option>
            <option value="448">Lokal użytkowy</option>
            <option value="393">Inne</option>
          </select>
        </div>
      </>
    </FormWrapper>
  );
}
