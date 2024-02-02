// Geolacalizacón
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

const USER_ADMINISTRATOR='administrator'
const USER_CUSTOMER='customer'
const USER_PROVIDER='provider'

const PEOPLE_STATE_ACTIVE='Active'
const PEOPLE_STATE_INACTIVE='Inactive'
const PEOPLE_STATE_DELETED='Deleted'

module.exports = {
    URL_PROVINCES, URL_MUNICIPALITIES, PAGESIZE,
    STATE_ACCEPTED, STATE_CANCELLED, STATE_COMPLETED, STATE_PENDING,
    STATE_RATINGCUSTOMERPENDING, STATE_RATINGPENDING,
    STATE_RATINGPROVIDERPENDING, STATE_VIEW,
    USER_ADMINISTRATOR,USER_CUSTOMER,USER_PROVIDER,
    PEOPLE_STATE_ACTIVE,PEOPLE_STATE_DELETED,PEOPLE_STATE_INACTIVE
};