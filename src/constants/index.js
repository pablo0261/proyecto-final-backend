const BASE_URL_NEW = 'https://carewithlove.onrender.com/api';

const BASE_URL = 'https://carewithlove.onrender.com';
const CATEGORIES = `${BASE_URL}/categories`;
const CHATS = `${BASE_URL}/chats`;
const GEOLOCATION = `${BASE_URL}/geolocation`;
const OPPORTUNITIES = `${BASE_URL}/opportunities`;
const PAYMENTS = `${BASE_URL}/payments`;
const PEOPLE = `${BASE_URL}/people`;
const QUESTIONS = `${BASE_URL}/questions`;
const SEND_MAIL = `${BASE_URL}/sendMail`;
const STATS = `${BASE_URL}/status`;

const URL_PROVINCES = "https://apis.datos.gob.ar/georef/api/provincias";
const URL_MUNICIPALITIES = "https://apis.datos.gob.ar/georef/api/municipios";

const PAGESIZE = 10

const STATE_VIEW = 'view'
const STATE_PENDING = 'pending'
const STATE_ACCEPTED = 'accepted'
const STATE_CANCELLED = 'cancelled'
const STATE_RATINGPENDING = 'ratingPending'
const STATE_RATINGCUSTOMERPENDING = 'ratingCustomerPending'
const STATE_RATINGPROVIDERPENDING = 'ratingProviderPending'
const STATE_COMPLETED = 'completed'

const USER_ADMINISTRATOR = 'administrator'
const USER_CUSTOMER = 'customer'
const USER_PROVIDER = 'provider'
const USER_EXTERNAL = 'external'

const PEOPLE_STATE_ACTIVE = 'Active'
const PEOPLE_STATE_INACTIVE = 'Inactive'
const PEOPLE_STATE_DELETED = 'Deleted'
const PEOPLE_STATE_UNVERIFIED = 'Unverified'

const TYPE_OF_QUESTION_FAQ = 'faq'
const TYPE_OF_QUESTION_QAA = 'qaa'

const QUESTION_STATUS_PENDING = 'pendiente'
const QUESTION_STATUS_COMPLETED = 'completada'
const QUESTION_STATUS_DELETED = 'eliminada'

module.exports = {
    URL_PROVINCES, URL_MUNICIPALITIES, PAGESIZE,
    STATE_ACCEPTED, STATE_CANCELLED, STATE_COMPLETED, STATE_PENDING,
    STATE_RATINGCUSTOMERPENDING, STATE_RATINGPENDING,
    STATE_RATINGPROVIDERPENDING, STATE_VIEW,
    USER_ADMINISTRATOR, USER_CUSTOMER, USER_PROVIDER, USER_EXTERNAL,
    PEOPLE_STATE_ACTIVE, PEOPLE_STATE_DELETED, PEOPLE_STATE_INACTIVE, PEOPLE_STATE_UNVERIFIED,
    TYPE_OF_QUESTION_FAQ, TYPE_OF_QUESTION_QAA, QUESTION_STATUS_PENDING, QUESTION_STATUS_COMPLETED, QUESTION_STATUS_DELETED,
    BASE_URL, CATEGORIES, CHATS, GEOLOCATION, OPPORTUNITIES, PAYMENTS, PEOPLE, QUESTIONS, SEND_MAIL, STATS
};