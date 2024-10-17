import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Calendar } from 'lucide-react';

const PatientProfile: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingConditions, setIsEditingConditions] = useState(false);
  const [isEditingMedications, setIsEditingMedications] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    age: '42',
    phone: '(555) 123-4567',
    email: 'jane.doe@example.com',
    address: '123 Main St, Anytown, USA',
    dob: 'January 15, 1982',
  });

  const [newProfile, setNewProfile] = useState(profile);

  const [medicalConditions, setMedicalConditions] = useState([
    'Type 2 Diabetes',
    'Hypertension',
    'Osteoarthritis',
  ]);

  const [currentMedications, setCurrentMedications] = useState([
    'Metformin 500mg twice daily',
    'Lisinopril 10mg once daily',
    'Acetaminophen 500mg as needed for pain',
  ]);

  const [newConditions, setNewConditions] = useState(medicalConditions);
  const [newMedications, setNewMedications] = useState(currentMedications);

  const handleSaveProfile = () => {
    setProfile(newProfile);
    setIsEditingProfile(false);
  };

  const handleSaveConditions = () => {
    setMedicalConditions(newConditions);
    setIsEditingConditions(false);
  };

  const handleSaveMedications = () => {
    setCurrentMedications(newMedications);
    setIsEditingMedications(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 flex justify-between items-center">
        Patient Profile
        <button
          className="border border-blue-500 text-blue-500 rounded px-1.5 py-0.5 text-sm hover:bg-blue-500 hover:text-white transition"
          onClick={() => setIsEditingProfile(!isEditingProfile)}
        >
          {isEditingProfile ? 'Save' : 'Edit'}
        </button>
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            alt="Patient"
            className="rounded-full w-48 h-48 object-cover mx-auto"
          />
        </div>
        <div className="md:w-2/3 md:pl-8">
          {isEditingProfile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(newProfile).map((key) => (
                <input
                  key={key}
                  type="text"
                  value={newProfile[key as keyof typeof newProfile]}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, [key]: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2 w-full"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileItem icon={<User />} label="Name" value={profile.name} />
              <ProfileItem icon={<User />} label="Age" value={profile.age} />
              <ProfileItem icon={<Phone />} label="Phone" value={profile.phone} />
              <ProfileItem icon={<Mail />} label="Email" value={profile.email} />
              <ProfileItem icon={<MapPin />} label="Address" value={profile.address} />
              <ProfileItem icon={<Calendar />} label="Date of Birth" value={profile.dob} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
          Medical Conditions
          <button
            className="border border-green-500 text-green-500 rounded px-1.5 py-0.5 text-sm hover:bg-green-500 hover:text-white transition"
            onClick={() => {
              if (isEditingConditions) {
                handleSaveConditions();
              } else {
                setIsEditingConditions(true);
                setNewConditions(medicalConditions);
              }
            }}
          >
            {isEditingConditions ? 'Save' : 'Edit'}
          </button>
        </h3>
        {isEditingConditions ? (
          <input
            type="text"
            value={newConditions.join(', ')}
            onChange={(e) => setNewConditions(e.target.value.split(', '))}
            className="border border-gray-300 rounded p-2 w-full"
          />
        ) : (
          <ul className="list-disc list-inside">
            {medicalConditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
          Current Medications
          <button
            className="border border-green-500 text-green-500 rounded px-1.5 py-0.5 text-sm hover:bg-green-500 hover:text-white transition"
            onClick={() => {
              if (isEditingMedications) {
                handleSaveMedications();
              } else {
                setIsEditingMedications(true);
                setNewMedications(currentMedications);
              }
            }}
          >
            {isEditingMedications ? 'Save' : 'Edit'}
          </button>
        </h3>
        {isEditingMedications ? (
          <input
            type="text"
            value={newMedications.join(', ')}
            onChange={(e) => setNewMedications(e.target.value.split(', '))}
            className="border border-gray-300 rounded p-2 w-full"
          />
        ) : (
          <ul className="list-disc list-inside">
            {currentMedications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ProfileItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-center">
    <div className="mr-2">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default PatientProfile;
