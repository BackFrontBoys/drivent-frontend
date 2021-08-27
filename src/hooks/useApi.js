import EventApi from "../services/event";
import EnrollmentApi from "../services/enrollment";
import AuthApi from "../services/auth";
import CepApi from "../services/cepApi";
import AttendeeApi from "../services/attendee";
import CertificateAPI from "../services/certificate";
import HotelApi from "../services/hotel";

export default function useApi() {
  return {
    event: new EventApi(),
    enrollment: new EnrollmentApi(),
    auth: new AuthApi(),
    cepApi:new CepApi(),
    attendeeApi: new AttendeeApi(),
    certificate: new CertificateAPI(),
    hotel: new HotelApi(),
  };
}
