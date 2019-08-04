
const mapFromKey = 'clientObject';
const mapToKey = 'mongoObject';
const automapper = require('automapper-ts');
const functions = require('./functions');

automapper.createMap(mapFromKey, mapToKey)
  .forMember('name', function (opts) { opts.ignore(); })
  .forMember('personalData.name', (opts) => {
    !functions.isEmpty(opts.intermediatePropertyValue) ? opts.mapFrom('name') : opts.mapFrom('personalData.name');
  })
  .forMember('lastName', function (opts) { opts.ignore(); })
  .forMember('personalData.lastName', (opts) => {
    !functions.isEmpty(opts.intermediatePropertyValue) ? opts.mapFrom('lastName') : opts.mapFrom('personalData.lastName');
  })
  .forMember('photo', function (opts) { opts.ignore(); })
  .forMember('personalData.photo', (opts) => {
    !functions.isEmpty(opts.intermediatePropertyValue) ? opts.mapFrom('photo') : opts.mapFrom('personalData.photo');
  })
  .forMember('gender', function (opts) { opts.ignore(); })
  .forMember('personalData.gender', (opts) => {
    !functions.isEmpty(opts.intermediatePropertyValue) ? opts.mapFrom('gender') : opts.mapFrom('personalData.gender');
  })
  .forMember('birthday', function (opts) { opts.ignore(); })
  .forMember('personalData.birthday', (opts) => {
    !functions.isEmpty(opts.intermediatePropertyValue) ? opts.mapFrom('birthday') : opts.mapFrom('personalData.birthday');
  })
  .forMember('email', function (opts) { opts.ignore(); })
  .forMember('personalData.email', (opts) => {
    !functions.isEmpty(opts.intermediatePropertyValue) ? opts.mapFrom('email') : opts.mapFrom('personalData.email');
  })
  .forMember('phones', function (opts) { opts.ignore(); })
  .forMember('personalData.phones', (opts) => {
    !functions.isEmpty(opts.intermediatePropertyValue) ? opts.mapFrom('phones') : opts.mapFrom('personalData.phones');
  })
  .forMember('personalData.phones', (opts) => {
    let personalDataPhones = {};
    if (!functions.isEmpty(opts.intermediatePropertyValue.professional))
      Object.assign(personalDataPhones, { 'professional': opts.intermediatePropertyValue.professional.map(phone => Object.assign({}, { 'value': phone, 'isMobile': false })) });

    if (!functions.isEmpty(opts.intermediatePropertyValue.personal))
      Object.assign(personalDataPhones, { 'personal': opts.intermediatePropertyValue.personal.map(phone => Object.assign({}, { 'value': phone, 'isMobile': false })) })

    return personalDataPhones;
  });

const objectToMap = {
  "id": "123",
  "name": "Juan",
  "lastName": "García Jhonson",
  "gender": "Male",
  "birthday": "1993-04-30",
  "professionalCategory": "Agricultor",
  "managerId": "456",
  "positionId": "789",
  "unityId": "1223",
  "cardPositionId": "1235",
  "roles": ["ADMINISTRATOR", "EMPLOYEE"],
  "email": { "professional": ["juan@empresa.com"] },
  "phones": { "professional": ["987987987"] },
  "photo": "data:image/png;base64,.....",
  "workplace": {
    "id": "3", //COMPANY WORKPLACE ID
    "companyId": "12313123", //COMPANY ID
    "name": "TARAMAY CORPORACION AGRICOLA, S.L" //workplace name
  },
  "password": "Xa1asdas1",
  "other": { "key": "value", "key": "value" },
  "startDate": "2009-04-30",
  "dropDate": null
};

const objectMapped = automapper.map(mapFromKey, mapToKey, objectToMap);

console.log('objectMapped', objectMapped);

console.log('objectMapped stringify', JSON.stringify(objectMapped));
