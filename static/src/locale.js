angular.module('qathome').config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        // TICKET
        'YOU_ARE_IN_THE_QUEUE': 'You are in the queue!',

        // BARRA
        'DESKS': 'Desks',
        'TICKETS_EMISSION': 'Tickets Emission',

        // SETTINGS
        'ONLINE_TICKET_EMISSION': 'Online tickets emission',
        'NOW_YOUR_USERS_CAN_QUEUE_UP': 'Now your users can queue up at the address:',
        'NOW_YOU_ARE_THE_ONLY_ONE_THAT_CAN_ADD_USERS_IN_LINE': 'Now you are the only one that can add users in line.',
        'KIOSK_TICKET_EMISSION': 'Kiosk ticket printing',
        'NOW_THE_KIOSK_PRINTS': 'Now the kiosk prints tickets.',
        'NOW_THE_KIOSK_DOES_NOT_PRINT': 'Now the kiosk does not print tickets.',
        'ADD_KIOSK': 'Add kiosk',
        'KIOSK': 'Kiosk',
        'DESCRIPTION': 'Description',
        'PIN': 'Pin',
        'KIOSK_ADDRESS': 'Kiosk address',
        'RESERVATIONS': 'Reservations',
        'SERVICE_UNDER_DEVELOPMENT_THANK_YOU_FOR_YOUR_CLICK': 'Service under development, thank you for your click',
        'YOUR_USERS_CAN_MAKE_A_RESERVATION': 'Now your users can make a reservation at ',
        'ACCORDING_TO_THE_RESERVATION_CALENDAR': 'According to the reservation calendar',
        'NOW_RESERVATIONS_ARE_NOT_ACCEPTED': 'Now reservations are not accepted.',
        'PLACE': 'Place',
        'CHECK_WHAT_YOUR_USERS_SEE_AT': 'Check what your users see at ',
        'NAME': 'Name',
        'PUBLIC_ADDRESS': 'Public address',
        'SAVE_CHANGES': 'Save changes',
        'CHANGES_SAVED': 'Changes saved',
        'QUEUES': 'Queues',
        'LETTER': 'Letter',
        'REMOVE': 'Remove',
        // 'DESKS': 'Desks',
        'CHECK_THESE_SETTINGS_AT': 'Check these settings at the ',
        'DESKS_PAGE': 'desks page',
        'CALLED_LETTER': 'Called letter',
    });

    $translateProvider.translations('it', {
        // TICKET
        'YOU_ARE_IN_THE_QUEUE': 'Sei in coda!',

        // BARRA
        'DESKS': 'Sportelli',
        'TICKETS_EMISSION': 'Emissione Biglietti',

        // SETTINGS
        'ONLINE_TICKET_EMISSION': 'Emissione biglietti online',
        'NOW_YOUR_USERS_CAN_QUEUE_UP': "Adesso i tuoi utenti possono mettersi in coda da casa all'indirizzo:",
        'NOW_YOU_ARE_THE_ONLY_ONE_THAT_CAN_ADD_USERS_IN_LINE': 'Adesso solo tu puoi aggiungere utenti in coda.',
        'KIOSK_TICKET_EMISSION': 'Emissione biglietti da totem',
        'NOW_THE_KIOSK_PRINTS': 'Adesso il totem stampa i biglietti.',
        'NOW_THE_KIOSK_DOES_NOT_PRINT': 'Adesso il totem non stampa biglietti.',
        'ADD_KIOSK': 'Aggiungi Totem',
        'KIOSK': 'Totem',
        'DESCRIPTION': 'Descrizione',
        'PIN': 'Pin',
        'KIOSK_ADDRESS': 'Indirizzo del Totem',
        'RESERVATIONS': 'Prenotazioni',
        'SERVICE_UNDER_DEVELOPMENT_THANK_YOU_FOR_YOUR_CLICK': 'Servizio in sviluppo, grazie per il tuo click',
        'YOUR_USERS_CAN_MAKE_A_RESERVATION': 'Adesso i tuoi utenti possono prenotarsi su ',
        'ACCORDING_TO_THE_RESERVATION_CALENDAR': 'secondo il calendario prenotazioni.',
        'NOW_RESERVATIONS_ARE_NOT_ACCEPTED': 'Adesso non si accettano prenotazioni.',
        'PLACE': 'Attività',
        'CHECK_WHAT_YOUR_USERS_SEE_AT': 'Controlla quello che vedono i tuoi utenti su ',
        'NAME': 'Nome',
        'PUBLIC_ADDRESS': 'Indirizzo Pubblico',
        'SAVE_CHANGES': 'Salva modifiche',
        'CHANGES_SAVED': 'Modifiche salvate',
        'QUEUES': 'Code',
        'LETTER': 'Lettera',
        'REMOVE': 'Rimuovi',
        // 'DESKS': 'Sportelli',
        'CHECK_THESE_SETTINGS_AT': 'Controlla queste impostazioni alla ',
        'DESKS_PAGE': 'pagina sportelli',
        'CALLED_LETTER': 'Lettera servita',

    });

    $translateProvider.preferredLanguage('it');
}]);