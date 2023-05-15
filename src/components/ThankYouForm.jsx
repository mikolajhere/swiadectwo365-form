import { FormWrapper } from "./FormWrapper";

export function ThankYouForm() {
  return (
    <FormWrapper title="Dziękujemy">
      <div className="final-item" style={{ width: "100%" }}>
        <p style={{fontWeight: "bold"}}>Dziękujemy!</p>
        <p>
          Skontaktujemy się z Tobą jak najszybciej, aby potwierdzić szczegóły.
        </p>
      </div>
    </FormWrapper>
  );
}
