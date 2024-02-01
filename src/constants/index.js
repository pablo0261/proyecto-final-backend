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

module.exports = {
    URL_PROVINCES, URL_MUNICIPALITIES, PAGESIZE,
    STATE_ACCEPTED, STATE_CANCELLED, STATE_COMPLETED, STATE_PENDING,
    STATE_RATINGCUSTOMERPENDING, STATE_RATINGPENDING,
    STATE_RATINGPROVIDERPENDING, STATE_VIEW
};