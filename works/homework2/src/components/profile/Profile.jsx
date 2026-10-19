import ContactInfo from './ContactInfo.jsx';
import Experience from './Experience.jsx';
import Skills from './Skills.jsx';

function Profile({ fullName, photo, email, phone, city, experience, skills }) {
    return (
        <article className="profile">
            <img className="profile-photo" src={photo} alt={`Фото ${fullName}`} />
            <div className="profile-info">
                <h1>{fullName}</h1>
                <p>Місто: {city}</p>
                <ContactInfo email={email} phone={phone} />
                <Experience experience={experience} />
                <Skills skills={skills} />
            </div>
        </article>
    );
}

export default Profile;
