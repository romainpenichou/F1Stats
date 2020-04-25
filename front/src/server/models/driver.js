export class DriverModel {
  constructor({
    id,
    ref,
    number,
    code,
    firstname,
    lastname,
    birthday,
    nationality,
    url,
    createdAt,
    updatedAt  
  }) { 
    this.id = id;
    this.ref = ref;
    this.number = number;
    this.code = code;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthday = birthday;
    this.nationality = nationality;
    this.url = url;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromData(data) {
    return data.map(x => new DriverModel(x));
  }
}