"use strict";

let moment = require("moment"),
    numeral = require("numeral");

exports.formatProperties = properties => {
    let elements = [];
    properties.forEach(property => {
            elements.push({
                title: property.get("Title__c"),
                subtitle: ` ${property.get("City__c")} · PINEL · ${numeral(property.get("Price__c")).format('0,0')}€`,
                "image_url": property.get("Picture__c"),
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Planifier un rdv",
                        "payload": "schedule_visit," + property.getId()
                    },
                    {
                        "type": "postback",
                        "title": "Voir le contact",
                        "payload": "contact_broker," + property.getId()
                    },
                    {
                        "type": "postback",
               		"title": "Etre contacté" ,
             		"payload": "contact_me"
                    }
                ]
            })
        }
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};

exports.formatPriceChanges = priceChanges => {
    let elements = [];
    priceChanges.forEach(priceChange => {
            let property = priceChange.get("Parent");
            elements.push({
                title: `${property.City__c} ${property.State__c}`,
                subtitle: `Old price: ${numeral(priceChange.get("OldValue")).format('$0,0')} · New price: ${numeral(priceChange.get("NewValue")).format('$0,0')} on ${moment(priceChange.get("CreatedDate")).format("MMM Do")}`,
                "image_url": property.Picture__c,
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Schedule visit",
                        "payload": "schedule_visit," + property.Id
                    },
                    {
                        "type": "postback",
                        "title": "View broker info",
                        "payload": "contact_broker," + property.Id
                    },
                    {
                        "type": "postback",
                        "title": "Contact me",
                        "payload": "contact_me,"
                    }
                ]
            })
        }
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};


exports.formatAppointment = property => {
	moment.locale('fr');
    var options = [
        moment().add(1, 'days').format('dddd Do') + ' à 10h',
        moment().add(2, 'days').format('dddd Do') + ' à 9h',
        moment().add(2, 'days').format('dddd Do') + ' à 15h',
        moment().add(3, 'days').format('dddd Do') + ' à 13h',
        moment().add(3, 'days').format('dddd Do') + ' à 18h',
    ];
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": `Choisissez un rendez-vous pour rencontrer votre conseiller pour le programme situé à ${property.get("City__c")}.`,
                "buttons": [
                    {
                        "type": "postback",
                        "title": options[0],
                        "payload": "confirm_visit,"+ options[0] + " . Nous vous apporterons des conseils pour votre projet et nous vous présenterons le programme " + property.get("Title__c") +" situé à " + property.get("City__c")
                    },
                    {
                        "type": "postback",
                        "title": options[1],
                        "payload": "confirm_visit," + options[1] + " . Nous vous apporterons des conseils pour votre projet et nous vous présenterons le programme " + property.get("Title__c") +" situé à " + property.get("City__c")
                    },
                    {
                        "type": "postback",
                        "title": options[2],
                        "payload": "confirm_visit," + options[2] + " . Nous vous apporterons des conseils pour votre projet et nous vous présenterons le programme " + property.get("Title__c") +" situé à " + property.get("City__c")
                    }]
            }
        }
    };
};

exports.formatBroker = broker => {
    let elements = [];
    elements.push({
        title: " Aurélie - Conseillère Pimonial",
        subtitle: "0612345678 · aurelie@primonial.fr",
        "image_url": "http://oi63.tinypic.com/14a9a8j.jpg",
        "buttons": [
            {
                "type": "postback",
                "title": "Etre contacté" ,
                "payload": "contact_me"
            }]
    });
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};