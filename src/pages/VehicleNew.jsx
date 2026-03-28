import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { vehicleInfoSchema, ownerSchema, regInsuranceSchema } from '../schemas/vehicleSchema';
import { useCreateVehicle } from '../hooks/useVehicles';
import { showSuccess, show422Errors } from '../components/Toast';

const steps = ['Vehicle Info', 'Owner Info', 'Registration & Insurance'];

export default function VehicleNew() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const createMutation = useCreateVehicle();

  const schemas = [vehicleInfoSchema, ownerSchema, regInsuranceSchema];

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemas[step]),
  });

  const onNext = (data) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    if (step < 2) {
      setStep(step + 1);
    } else {
      createMutation.mutate(updated, {
        onSuccess: () => { showSuccess('Vehicle registered!'); navigate('/dashboard'); },
        onError: (err) => show422Errors(err),
      });
    }
  };

  const Field = ({ name, label, type = 'text' }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>
      <input type={type} {...register(name)}
        style={{ width: '100%', padding: '8px', border: `1px solid ${errors[name] ? 'red' : '#cbd5e1'}`, borderRadius: '6px' }}
      />
      {errors[name] && <p style={{ color: 'red', fontSize: '12px' }}>{errors[name].message}</p>}
    </div>
  );

  const Select = ({ name, label, options }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>
      <select {...register(name)}
        style={{ width: '100%', padding: '8px', border: `1px solid ${errors[name] ? 'red' : '#cbd5e1'}`, borderRadius: '6px' }}>
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[name] && <p style={{ color: 'red', fontSize: '12px' }}>{errors[name].message}</p>}
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      {/* Step indicators */}
      <div style={{ display: 'flex', marginBottom: '2rem', gap: '8px' }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: '6px',
            background: i === step ? '#3b82f6' : i < step ? '#86efac' : '#f1f5f9',
            color: i === step ? 'white' : '#374151', fontSize: '13px' }}>
            {s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onNext)}>
        {step === 0 && (
          <>
            <Field name="manufacture" label="Manufacturer" />
            <Field name="model" label="Model" />
            <Field name="bodyType" label="Body Type" />
            <Field name="color" label="Color" />
            <Field name="year" label="Year" type="number" />
            <Field name="engineCapacity" label="Engine Capacity (cc)" type="number" />
            <Field name="odometerReading" label="Odometer Reading" type="number" />
            <Field name="seatingCapacity" label="Seating Capacity" type="number" />
            <Select name="vehicleType" label="Vehicle Type" options={['ELECTRIC','SUV','TRUCK','MOTORCYCLE','BUS','VAN','PICKUP','OTHER']} />
            <Select name="fuelType" label="Fuel Type" options={['PETROL','DIESEL','ELECTRIC','HYBRID','GAS','OTHER']} />
            <Select name="purpose" label="Purpose" options={['PERSONAL','COMMERCIAL','TAXI','GOVERNMENT']} />
            <Select name="status" label="Status" options={['NEW','USED','REBUILT']} />
          </>
        )}

        {step === 1 && (
          <>
            <Field name="ownerName" label="Owner Name" />
            <Field name="address" label="Address" />
            <Field name="nationalId" label="National ID (16 digits)" />
            <Field name="mobileNumber" label="Mobile Number (10 digits)" />
            <Field name="email" label="Email" type="email" />
            <Select name="ownerType" label="Owner Type" options={['INDIVIDUAL','COMPANY','NGO','GOVERNMENT']} />
            <Field name="companyRegNumber" label="Company Reg. Number (if COMPANY)" />
            <Field name="passportNumber" label="Passport Number (optional)" />
          </>
        )}

        {step === 2 && (
          <>
            <Field name="plateNumber" label="Plate Number (e.g. RAB 123A)" />
            <Select name="plateType" label="Plate Type" options={['PRIVATE','COMMERCIAL','GOVERNMENT','DIPLOMATIC','PERSONALIZED']} />
            <Field name="registrationDate" label="Registration Date" type="date" />
            <Field name="expiryDate" label="Expiry Date" type="date" />
            <Select name="registrationStatus" label="Registration Status" options={['ACTIVE','SUSPENDED','EXPIRED','PENDING']} />
            <Field name="policyNumber" label="Policy Number" />
            <Field name="companyName" label="Insurance Company" />
            <Field name="insuranceType" label="Insurance Type" />
            <Field name="insuranceExpiryDate" label="Insurance Expiry Date" type="date" />
            <Select name="insuranceStatus" label="Insurance Status" options={['ACTIVE','SUSPENDED','EXPIRED']} />
            <Field name="roadworthyCert" label="Roadworthy Certificate" />
            <Field name="customsRef" label="Customs Reference" />
            <Field name="proofOfOwnership" label="Proof of Ownership" />
            <Field name="state" label="State" />
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)}
              style={{ padding: '10px 20px', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', background: 'white' }}>
              Back
            </button>
          )}
          <button type="submit" disabled={createMutation.isPending}
            style={{ marginLeft: 'auto', padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            {step < 2 ? 'Next' : createMutation.isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}